import { create } from 'zustand';
import {
  TALK_BOX_MODE,
  CategoryTagsDTO,
  QuestionDTO,
} from '@/types/common/TalkBox.types';
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

      setSelectedQuestions: (q) => set({ selectedQuestions: q }),

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

  questionsByTag: Record<string, QuestionDTO[]>;
  setQuestionsByTag: (questionsByTag: Record<string, QuestionDTO[]>) => void;

  selectedTag: CategoryTagsDTO;
  setSelectedTag: (category: CategoryTagsDTO) => void;

  answeredQuestionTags: CategoryTagsDTO[];
  setAnsweredQuestionTags: (tags: CategoryTagsDTO[]) => void;

  answeredQuestionsByTag: Record<string, QuestionDTO[]>;
  setAnsweredQuestionsByTag: (
    answeredQuestionsByTag: Record<string, QuestionDTO[]>
  ) => void;
}

export const useTalkBoxQuestionStore = create<TalkBoxQuestionStore>((set) => ({
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

  answeredQuestionTags: [
    {
      id: null,
      name: '전체',
      totalQuestions: 0,
      uncheckedExists: false,
    },
  ],
  setAnsweredQuestionTags: (tags) => set({ answeredQuestionTags: tags }),

  answeredQuestionsByTag: {},
  setAnsweredQuestionsByTag: (answeredQuestionsByTag) =>
    set({ answeredQuestionsByTag }),
}));

interface TalkBoxCategoryState {
  selectedCategoryName: string;
  setSelectedCategoryName: (name: string) => void;
}

export const useTalkBoxCategoryStore = create<TalkBoxCategoryState>((set) => ({
  selectedCategoryName: '',
  setSelectedCategoryName: (name) => set({ selectedCategoryName: name }),
}));
