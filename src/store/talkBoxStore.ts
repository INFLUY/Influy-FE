import { create } from 'zustand';
import {
  TALK_BOX_MODE,
  CategoryTagsDTO,
  QuestionDTO,
} from '@/types/seller/TalkBox.types';

interface SelectModeState {
  mode: TALK_BOX_MODE;
  selectedIds: number[];

  setMode: (value: TALK_BOX_MODE) => void;
  setSelectedIds: (ids: number[]) => void; // 질문 선택 모드에서 선택된 질문들
  toggleSelectAll: (allIds: number[]) => void; // 질문 선택 모드에서 전체 질문 선택
}

export const useSelectModeStore = create<SelectModeState>((set, get) => ({
  mode: 'default',
  selectedIds: [],

  setMode: (value) => {
    // 'default'로 전환될 때는 선택된 항목 초기화
    if (value === 'default') {
      set({ selectedIds: [] });
    }
    set({ mode: value });
  },

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleSelectAll: (allIds) => {
    const current = get().selectedIds;
    const isAllSelected = allIds.every((id) => current.includes(id));

    set({ selectedIds: isAllSelected ? [] : allIds });
  },
}));

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
