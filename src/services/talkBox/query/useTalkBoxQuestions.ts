// src/services/talkBox/query/useTalkBoxQuestions.ts
import { useEffect, useMemo } from 'react';
import { useGetQuestionTags } from './useGetQuestionTags';
import { useGetAllQuestions } from './useGetAllQuestions';
import { useGetQuestionsByTag } from './useGetQuestionsByTag';
import { useTalkBoxQuestionStore } from '@/store/talkBoxStore';

const ALL_KEY = '전체';

// TODO: 태그랑 전체 질문 불러오는거 계속 호출됨
export function useTalkBoxQuestions(opts: {
  questionCategoryId: number;
  isAnswered: boolean;
}) {
  const { questionCategoryId, isAnswered } = opts;

  // ① Zustand 스토어 멤버
  const {
    setQuestionTags,
    questionsByTag,
    setQuestionsByTag,
    setAnsweredQuestionTags,
    answeredQuestionsByTag,
    setAnsweredQuestionsByTag,
    selectedTag,
    setSelectedTag,
  } = useTalkBoxQuestionStore();

  // ② 태그 목록 fetch
  const { data: rawTags } = useGetQuestionTags({
    questionCategoryId,
    isAnswered,
  });

  useEffect(() => {
    if (!rawTags) return;

    if (!isAnswered) {
      setQuestionTags(rawTags);
      // 빈 배열로 초기화
      setQuestionsByTag(
        rawTags.reduce((acc, t) => ({ ...acc, [t.name]: [] }), {})
      );
    } else {
      setAnsweredQuestionTags(rawTags);
      setAnsweredQuestionsByTag(
        rawTags.reduce((acc, t) => ({ ...acc, [t.name]: [] }), {})
      );
    }
  }, [rawTags, isAnswered]);

  // ③ “전체” 질문 infinite-query
  const allQ = useGetAllQuestions({ questionCategoryId, isAnswered });
  const allQuestions = useMemo(
    () => allQ.data?.pages.flatMap((p) => p.questions ?? []) ?? [],
    [allQ.data]
  );

  useEffect(() => {
    if (selectedTag?.name !== ALL_KEY) return;

    if (!isAnswered) {
      const prev = questionsByTag;
      setQuestionsByTag({ ...prev, [ALL_KEY]: allQuestions });
    } else {
      const prev = answeredQuestionsByTag;
      setAnsweredQuestionsByTag({ ...prev, [ALL_KEY]: allQuestions });
    }
  }, [allQuestions, selectedTag, isAnswered]);

  // ④ 개별 태그 질문 infinite-query
  const byTagQ = useGetQuestionsByTag({
    questionTagId: selectedTag?.id ?? null,
    isAnswered,
  });

  const tagQuestions = useMemo(
    () => byTagQ.data?.pages.flatMap((p) => p.questions ?? []) ?? [],
    [byTagQ.data]
  );

  //첫 로딩
  useEffect(() => {
    if (
      selectedTag &&
      selectedTag.name !== ALL_KEY &&
      selectedTag.id !== 0 &&
      (isAnswered
        ? answeredQuestionsByTag[selectedTag.name]?.length === 0
        : questionsByTag[selectedTag.name]?.length === 0)
    ) {
      fetchNextPage();
    }
  }, [selectedTag?.id, selectedTag?.name]);

  useEffect(() => {
    if (!selectedTag || selectedTag.name === ALL_KEY) return;

    if (!isAnswered) {
      const prev = questionsByTag;
      setQuestionsByTag({ ...prev, [selectedTag.name]: tagQuestions });
    } else {
      const prev = answeredQuestionsByTag;
      setAnsweredQuestionsByTag({ ...prev, [selectedTag.name]: tagQuestions });
    }
  }, [tagQuestions, selectedTag, isAnswered]);

  // ⑤ 리턴
  const questionsMap = isAnswered ? answeredQuestionsByTag : questionsByTag;
  const currentQuestions = questionsMap[selectedTag?.name ?? ALL_KEY] ?? [];

  const fetchNextPage =
    selectedTag?.name === ALL_KEY ? allQ.fetchNextPage : byTagQ.fetchNextPage;
  const hasNextPage =
    selectedTag?.name === ALL_KEY ? allQ.hasNextPage : byTagQ.hasNextPage;
  const isFetchingNextPage =
    selectedTag?.name === ALL_KEY
      ? allQ.isFetchingNextPage
      : byTagQ.isFetchingNextPage;

  return {
    questions: currentQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
