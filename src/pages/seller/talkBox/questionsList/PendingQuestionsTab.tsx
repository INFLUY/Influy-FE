import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SubCategoryChip,
  DefaultButton,
  SellerModal,
  SingleReplyBottomSheet,
  LoadingSpinner,
  InfiniteQuestionList,
} from '@/components';

import { QuestionDTO } from '@/types/seller/TalkBox.types';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';

// api
import { useGetAllQuestions } from '@/services/talkBox/query/useGetAllQuestions';
import { useGetQuestionTags } from '@/services/talkBox/query/useGetQuestionTags';
import { useGetQuestionsByTag } from '@/services/talkBox/query/useGetQuestionsByTag';
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';

export const PendingQuestionsTab = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [singleReplyChat, setSingleReplyChat] = useState<QuestionDTO | null>(
    null
  );
  const { itemId, categoryId } = useParams();

  const navigate = useNavigate();

  const { mode, selectedQuestions, setMode } = useSelectModeStore();

  const {
    questionTags,
    setQuestionTags,
    questionsByTag,
    selectedTag,
    setSelectedTag,
    setQuestionsByTag,
  } = useTalkBoxQuestionStore();

  useEffect(() => {
    setMode('default');
  }, []);

  // -- api
  // 상단 태그 목록 get
  const { data: questionTagData } = useGetQuestionTags({
    questionCategoryId: Number(categoryId),
    isAnswered: false,
  });

  useEffect(() => {
    if (questionTagData) {
      setQuestionTags(questionTagData);

      setQuestionsByTag(
        questionTagData.reduce(
          (acc, tag) => {
            acc[tag.name] = [];
            return acc;
          },
          {} as Record<string, QuestionDTO[]>
        )
      );

      setSelectedTag(questionTagData[0]);
    }
  }, [questionTagData]);

  // '전체' 카테고리 get
  const {
    data: allQuestionsData,
    fetchNextPage: fetchNextPageAll,
    hasNextPage: hasNextPageAll,
    isFetchingNextPage: isFetchingNextPageAll,
  } = useGetAllQuestions({
    questionCategoryId: Number(categoryId),
    isAnswered: false,
  });

  // '전체' 태그의 질문들을 questionsByTag에 저장 - 메모이제이션으로 최적화
  const allQuestions = useMemo(() => {
    if (!allQuestionsData) return [];
    return allQuestionsData.pages.flatMap((page) => page?.questions ?? []);
  }, [allQuestionsData]);

  useEffect(() => {
    if (allQuestions.length > 0 && selectedTag?.name === '전체') {
      const updatedMap = { ...questionsByTag, 전체: allQuestions };
      setQuestionsByTag(updatedMap);
    }
  }, [selectedTag?.name, allQuestions]);

  // 개별 카테고리 질문 get
  const {
    data: questionsByTagData,
    fetchNextPage: fetchNextPageByTag,
    hasNextPage: hasNextPageByTag,
    isFetchingNextPage: isFetchingNextPageByTag,
  } = useGetQuestionsByTag({
    questionTagId: selectedTag?.id ?? null,
    isAnswered: false,
  });

  // 개별 태그 질문들을 메모이제이션
  const tagQuestions = useMemo(() => {
    if (!questionsByTagData || !selectedTag || selectedTag.name === '전체')
      return [];
    return questionsByTagData.pages.flatMap((p) => p.questions ?? []);
  }, [questionsByTagData, selectedTag]);

  // 태그별 질문 데이터 업데이트 - 최적화된 버전
  useEffect(() => {
    if (tagQuestions.length > 0 && selectedTag && selectedTag.name !== '전체') {
      const updatedMap = {
        ...questionsByTag,
        [selectedTag.name]: tagQuestions,
      };
      setQuestionsByTag(updatedMap);
    }
  }, [tagQuestions]);

  // 1) When selectedTag changes, if it's not '전체' and we haven't loaded it yet, fetch
  useEffect(() => {
    if (
      selectedTag &&
      selectedTag.name !== '전체' &&
      selectedTag.id !== 0 &&
      questionsByTag[selectedTag.name]?.length === 0
    ) {
      fetchNextPageByTag();
    }
  }, [selectedTag?.id, selectedTag?.name]);

  // 현재 선택된 태그의 질문들
  const currentQuestions = useMemo(() => {
    return questionsByTag[selectedTag?.name] ?? [];
  }, [questionsByTag, selectedTag?.name]);

  const isAll = selectedTag?.name === '전체';
  const fetchNext = isAll ? fetchNextPageAll : fetchNextPageByTag;
  const hasNextPage = isAll ? hasNextPageAll : hasNextPageByTag;
  const isFetching = isAll ? isFetchingNextPageAll : isFetchingNextPageByTag;

  // 질문 삭제
  const { mutate: deleteQuestions } = useDeleteCategoryQuestions({
    itemId: Number(itemId),
    questionCategoryId: Number(categoryId),
    onSuccessCallback: () => {
      setIsDeleteModalOpen(false);
      setMode('default');
    },
  });

  const handleConfirmDelete = () => {
    const selectedId: number[] = selectedQuestions.map((q) => q.questionId);
    deleteQuestions(selectedId);
  };

  // 일괄 답변
  const handleBulkReply = () => {};

  return (
    <>
      {/* 카테고리 선택 */}
      <div
        className="sticky z-30 bg-white"
        style={{ top: 'var(--headerHeight)' }}
      >
        <div className="scrollbar-hide flex shrink-0 items-center gap-[.5625rem] overflow-x-scroll bg-white px-5 py-3">
          {questionTags &&
            questionTags.length > 0 &&
            questionTags.map((c) => (
              <SubCategoryChip
                key={c.id}
                text={c.name}
                count={c.totalQuestions}
                isSelected={c === selectedTag}
                hasNew={c.uncheckedExists}
                onToggle={() => setSelectedTag(c)}
              />
            ))}
        </div>
      </div>

      <section className="mt-4 flex w-full flex-col gap-5 pb-22">
        {/* 상단 제목 */}
        <div className="flex w-full items-center justify-between px-5">
          <div className="body1-sb flex gap-1">
            <span className="text-sub">#{selectedTag.name}</span>
            <span className="text-grey11">({selectedTag?.totalQuestions})</span>
          </div>
          <span className="body2-sb text-grey11">
            새 질문 (
            {questionsByTagData?.pages[questionsByTagData.pages.length - 1]
              .newQuestionCnt ||
              allQuestionsData?.pages[allQuestionsData.pages.length - 1]
                .newQuestionCnt}
            )
          </span>
        </div>

        <InfiniteQuestionList
          questions={currentQuestions}
          fetchNextPage={fetchNext}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetching}
          onSelectSingle={(q) => {
            setSingleReplyChat(q);
            setMode('single');
          }}
        />
      </section>

      {/* 하단 버튼 */}
      {mode === 'select' && (
        <section className="bottom-bar flex w-full shrink-0 items-center justify-center gap-[.4375rem] bg-white px-5 py-2">
          <DefaultButton
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            text="삭제하기"
            disabled={selectedQuestions.length === 0}
            activeTheme="white"
            disabledTheme="greyLine"
          />
          <DefaultButton
            type="submit"
            text={
              selectedQuestions.length > 0
                ? `(${selectedQuestions.length}개) 일괄 답변하기`
                : '일괄 답변하기'
            }
            disabled={selectedQuestions.length === 0}
            onClick={handleBulkReply}
          />
        </section>
      )}

      {/* 일괄 삭제 */}
      {isDeleteModalOpen && (
        <SellerModal
          text={`질문들(${selectedQuestions.length}개)을 삭제하시겠습니까? 한 번 삭제한 질문은 되돌릴 수 없습니다.`}
          leftButtonText="취소"
          rightButtonText="확인"
          leftButtonClick={() => setIsDeleteModalOpen(false)}
          rightButtonClick={handleConfirmDelete}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}

      {/* 질문 하나 선택시 */}
      {mode === 'single' && singleReplyChat && (
        <SingleReplyBottomSheet
          question={singleReplyChat}
          onClose={() => setMode('default')}
          itemId={itemId}
        />
      )}

      {isFetching && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
