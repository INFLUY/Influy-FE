import { useState, useEffect } from 'react';
import {
  SubCategoryChip,
  QuestionChatBubble,
  SingleReplyBottomSheet,
  InfiniteQuestionList,
} from '@/components';
import { useNavigate, useParams } from 'react-router-dom';

import { dummySubCategories } from '../talkboxMockData';
import { QuestionDTO } from '@/types/seller/TalkBox.types';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';
import { PATH } from '@/routes/path';

// api
import { useGetAllQuestions } from '@/services/talkBox/query/useGetAllQuestions';
import { useGetQuestionTags } from '@/services/talkBox/query/useGetQuestionTags';
import { useGetQuestionsByTag } from '@/services/talkBox/query/useGetQuestionsByTag';
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';
import { useTalkBoxQuestions } from '@/services/talkBox/query/useTalkBoxQuestions';
export const AnsweredQuestionsTab = () => {
  const [singleReplyChat, setSingleReplyChat] = useState<QuestionDTO | null>(
    null
  );
  const { itemId, categoryId } = useParams();
  const navigate = useNavigate();

  const { mode, selectedQuestions, setMode } = useSelectModeStore();

  const {
    answeredQuestionTags,
    setAnsweredQuestionTags,
    answeredQuestionsByTag,
    selectedTag,
    setSelectedTag,
    setAnsweredQuestionsByTag,
  } = useTalkBoxQuestionStore();

  //임시
  useEffect(() => {
    setMode('answered');
  }, []);

  // -- api
  const { questions, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTalkBoxQuestions({
      questionCategoryId: Number(categoryId),
      isAnswered: true,
    });

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
                isSelected={c === selectedTag}
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
          <span className="body2-sb text-grey11">새 질문 asdf</span>
        </div>
        <InfiniteQuestionList
          questions={questions}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onSelectSingle={(q) => {
            setSingleReplyChat(q);
            setMode('single');
          }}
        />
      </section>

      {/* 질문 하나 선택시 */}
      {/* TODO: faq 등록했을 경우, faq 등록하기 로직 추가 필요 */}
      {/* {mode === 'single' && singleReplyChat && (
        <SingleReplyBottomSheet
          question={singleReplyChat}
          onClose={() => setMode('answered')}
        />
      )} */}
    </>
  );
};
