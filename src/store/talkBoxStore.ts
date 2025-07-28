import { create } from 'zustand';
import {
  TALK_BOX_MODE,
  CategoryTagsDTO,
  QuestionDTO,
} from '@/types/seller/TalkBox.types';
import { persist } from 'zustand/middleware';

interface SelectModeState {
  mode: TALK_BOX_MODE;
  selectedQuestions: QuestionDTO[];

  setMode: (value: TALK_BOX_MODE) => void;
  setSelectedQuestions: (q: QuestionDTO[]) => void; // 질문 선택 모드에서 선택된 질문들
  toggleSelectAll: (allQuestions: QuestionDTO[]) => void; // 질문 선택 모드에서 전체 질문 선택
}

export const useSelectModeStore = create<SelectModeState>()(
  persist(
    (set, get) => ({
      mode: 'default',
      selectedQuestions: [],

      setMode: (value) => {
        if (value === 'default') {
          set({ selectedQuestions: [] });
        }
        set({ mode: value });
      },

      setSelectedQuestions: (questions) =>
        set({ selectedQuestions: questions }),

      toggleSelectAll: (allQuestions) => {
        const current = get().selectedQuestions;
        const isAllSelected = allQuestions.every((q) =>
          current.some((c) => c.questionId === q.questionId)
        );
        set({ selectedQuestions: isAllSelected ? [] : allQuestions });
      },
    }),
    {
      name: 'talkbox-selected-questions',
      partialize: (state) => ({
        selectedQuestions: state.selectedQuestions,
      }),
    }
  )
);

interface TalkBoxQuestionStore {
  questionTags: CategoryTagsDTO[];
  setQuestionTags: (tags: CategoryTagsDTO[]) => void;

  questionsByTag: Record<string, QuestionDTO[]>; // key: tagId 또는 tagName
  setQuestionsByTag: (questionsByTag: Record<string, QuestionDTO[]>) => void;

  selectedTag: CategoryTagsDTO;
  setSelectedTag: (category: CategoryTagsDTO) => void;

  getQuestionsByTagName: (tag: string) => QuestionDTO[];
}

export const useTalkBoxQuestionStore = create<TalkBoxQuestionStore>(
  (set, get) => ({
    questionTags: [
      {
        id: null,
        name: '전체',
        totalQuestions: 0,
        uncheckedExists: false,
      },
    ],
    setQuestionTags: (tags) => set({ questionTags: tags }),

    questionsByTag: {},
    setQuestionsByTag: (questionsByTag) => set({ questionsByTag }),

    selectedTag: {
      id: null,
      name: '전체',
      totalQuestions: 0,
      uncheckedExists: false,
    },
    setSelectedTag: (category) => set({ selectedTag: category }),

    getQuestionsByTagName: (tag: string) => {
      return get().questionsByTag[tag] ?? [];
    },
  })
);
