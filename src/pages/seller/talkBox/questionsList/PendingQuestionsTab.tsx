import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SubCategoryChip,
  DefaultButton,
  SellerModal,
  LoadingSpinner,
  InfiniteQuestionList,
} from '@/components';

import { QuestionDTO } from '@/types/seller/TalkBox.types';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';
import { PATH } from '@/routes/path';

// api
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';

import { useTalkBoxQuestions } from '@/services/talkBox/query/useTalkBoxQuestions';

import { useBottomSheetContext } from '@/contexts/TalkBoxCategoryContext';

export const PendingQuestionsTab = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { itemId, categoryId } = useParams();

  const navigate = useNavigate();

  const { mode, selectedQuestions, setMode } = useSelectModeStore();

  const { questionTags, selectedTag, setSelectedTag } =
    useTalkBoxQuestionStore();

  useEffect(() => {
    setMode('default');
  }, []);

  // -- api
  const { questions, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTalkBoxQuestions({
      questionCategoryId: Number(categoryId),
      isAnswered: false,
    });

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
    const tagsToInvalidate: number[] = Array.from(
      new Set(selectedQuestions.map((q) => q.tagId))
    );
    deleteQuestions({ questionIdList: selectedId, tagIds: tagsToInvalidate });
  };

  // 일괄 답변하기
  const handleBulkReply = () => {
    const tagId = getMostFrequentTagId(selectedQuestions);
    navigate(`../${PATH.SELLER.talkBox.item.category.bulkReply}`, {
      state: { tagId: tagId },
      replace: true,
    });
  };

  const getMostFrequentTagId = (
    selectedQuestions: QuestionDTO[]
  ): number | null => {
    if (selectedQuestions.length === 0) return null;

    const countMap = new Map<number, number>();
    let mostFrequentTagId: number | null = null;
    let maxCount = 0;

    for (const { tagId } of selectedQuestions) {
      const currentCount = (countMap.get(tagId) || 0) + 1;
      countMap.set(tagId, currentCount);

      if (currentCount > maxCount) {
        maxCount = currentCount;
        mostFrequentTagId = tagId;
      }
    }

    return mostFrequentTagId;
  };

  const { setSingleQuestion } = useBottomSheetContext();

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
                isSelected={c.name === selectedTag.name}
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
            {/* {questionsByTagData?.pages[questionsByTagData.pages.length - 1]
              .newQuestionCnt ||
              allQuestionsData?.pages[allQuestionsData.pages.length - 1]
                .newQuestionCnt} */}
            )
          </span>
        </div>

        <InfiniteQuestionList
          questions={questions}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onSelectSingle={(q) => {
            setSingleQuestion(q);
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

      {/* {isFetching && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )} */}
    </>
  );
};
