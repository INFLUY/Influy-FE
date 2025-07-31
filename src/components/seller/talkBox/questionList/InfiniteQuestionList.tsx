import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { QuestionChatBubble, LoadingSpinner } from '@/components';
import { QuestionDTO } from '@/types/seller/TalkBox.types';

interface InfiniteQuestionListProps {
  questions: QuestionDTO[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onSelectSingle: (q: QuestionDTO) => void;
}

export const InfiniteQuestionList = ({
  questions,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onSelectSingle,
}: InfiniteQuestionListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      {questions.map((q) => (
        <QuestionChatBubble
          key={q.questionId}
          chat={q}
          onSelectSingle={() => onSelectSingle(q)}
        />
      ))}
      {isFetchingNextPage && <LoadingSpinner />}

      {hasNextPage && <div ref={observerRef} className="h-4 w-full" />}
    </>
  );
};
