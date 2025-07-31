import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SubCategoryChip,
  DefaultButton,
  InfiniteQuestionList,
} from '@/components';

//type
import {
  QuestionDTO,
  SingleQuestionAnswerDTO,
} from '@/types/seller/TalkBox.types';

// store
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';
import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useBottomSheetContext } from '@/contexts/TalkBoxCategoryContext';

import { PATH } from '@/routes/path';

// api
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';
import { useTalkBoxQuestions } from '@/services/talkBox/query/useTalkBoxQuestions';

export const PendingQuestionsTab = () => {
  const { itemId, categoryId } = useParams();
  const navigate = useNavigate();

  // store 및 context
  const { showModal, hideModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { mode, selectedQuestions, setMode } = useSelectModeStore();
  const { questionTags, selectedTag, setSelectedTag } =
    useTalkBoxQuestionStore();
  const { setSingleQuestion } = useBottomSheetContext();

  useEffect(() => {
    setMode('default');
  }, []);

  // -- api
  const {
    questions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    newQuestionCnt,
  } = useTalkBoxQuestions({
    questionCategoryId: Number(categoryId),
    isAnswered: false,
  });

  useEffect(() => {
    const currentTag =
      questionTags.find((tag) => tag.name === selectedTag.name) ??
      questionTags[0];
    setSelectedTag(currentTag);
  }, [questionTags]);

  // 질문 삭제
  const { mutate: deleteQuestions } = useDeleteCategoryQuestions({
    itemId: Number(itemId),
    questionCategoryId: Number(categoryId),
    onSuccessCallback: () => {
      showSnackbar('질문이 삭제되었습니다.');
      hideModal();
      setMode('default');
    },
  });

  const handleDeleteConfirm = () => {
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

  // 질문 버블의 오른쪽 화살표 클릭시
  const handleSelectSingleQuestion = (q: QuestionDTO) => {
    const singleQuestion: SingleQuestionAnswerDTO = {
      questionDto: { ...q },
      answerListDto: { answerViewList: [] },
    };
    setSingleQuestion(singleQuestion);
    setMode('single');
  };

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
            새 질문 ({newQuestionCnt})
          </span>
        </div>

        <InfiniteQuestionList
          questions={questions}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onSelectSingle={(q) => handleSelectSingleQuestion(q)}
        />
      </section>

      {/* 하단 버튼 */}
      {mode === 'select' && (
        <section className="bottom-bar flex w-full shrink-0 items-center justify-center gap-[.4375rem] bg-white px-5 py-2">
          <DefaultButton
            onClick={() => {
              showModal({
                text: `해당 질문을 삭제하시겠습니까?\n한 번 삭제한 질문은 되돌릴 수 없습니다.`,
                description: '*상대방은 삭제 여부를 알 수 없습니다.',
                leftButtonClick: () => hideModal(),
                rightButtonClick: () => handleDeleteConfirm(),
              });
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

      {/* {isFetching && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )} */}
    </>
  );
};
