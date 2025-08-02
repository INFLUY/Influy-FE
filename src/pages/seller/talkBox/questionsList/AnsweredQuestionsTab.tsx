import { useEffect } from 'react';
import { SubCategoryChip, InfiniteQuestionList } from '@/components';
import { useParams } from 'react-router-dom';

// type
import {
  QuestionDTO,
  SingleQuestionAnswerDTO,
} from '@/types/seller/TalkBox.types';

// store
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';
import { useBottomSheetContext } from '@/contexts/TalkBoxCategoryContext';

// api
import { useTalkBoxQuestions } from '@/services/talkBox/query/useTalkBoxQuestions';

export const AnsweredQuestionsTab = () => {
  const { categoryId } = useParams();

  // store 및 context
  const { setMode } = useSelectModeStore();
  const { answeredQuestionTags, selectedTag, setSelectedTag } =
    useTalkBoxQuestionStore();
  const { setSingleQuestion } = useBottomSheetContext();

  useEffect(() => {
    const currentTag =
      answeredQuestionTags.find((tag) => tag.name === selectedTag.name) ??
      answeredQuestionTags[0];
    setSelectedTag(currentTag);
  }, [answeredQuestionTags]);

  useEffect(() => {
    setMode('default');
  }, []);

  // -- api
  const { questions, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTalkBoxQuestions({
      questionCategoryId: Number(categoryId),
      isAnswered: true,
    });

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
          {answeredQuestionTags &&
            answeredQuestionTags.length > 0 &&
            answeredQuestionTags.map((c) => (
              <SubCategoryChip
                key={c.id}
                text={c.name}
                count={c.totalQuestions}
                isSelected={c.name === selectedTag.name}
                onClickChip={() => setSelectedTag(c)}
              />
            ))}
        </div>
      </div>

      <section className="mt-4 flex w-full flex-col gap-5 pb-22">
        {/* 상단 제목 */}
        <div className="body1-sb flex w-full items-center gap-1 px-5">
          <span className="text-sub">#{selectedTag.name}</span>
          <span className="text-grey11">({selectedTag?.totalQuestions})</span>
        </div>

        {selectedTag?.totalQuestions === 0 ? (
          <div className="text-grey09 body2-m w-full pt-12 text-center">
            아직 답변을 시작하지 않았어요
            {/* TODO: 문구 확인받기 */}
          </div>
        ) : (
          <InfiniteQuestionList
            questions={questions}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onSelectSingle={(q) => handleSelectSingleQuestion(q)}
          />
        )}
      </section>
    </>
  );
};
