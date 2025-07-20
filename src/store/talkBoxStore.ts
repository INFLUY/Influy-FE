import { create } from 'zustand';
import { Chat, TALK_BOX_MODE } from '@/types/seller/TalkBox.types';

interface SelectModeState {
  mode: TALK_BOX_MODE;
  selectedIds: number[];
  chatsByCategory: Record<string, Chat[]>;

  setMode: (value: TALK_BOX_MODE) => void;
  setSelectedIds: (ids: number[]) => void;
  toggleSelectAll: (allIds: number[]) => void;
  setChatsByCategory: (category: string, chats: Chat[]) => void; // 카테고리별 채팅 저장
  getChatsByCategory: (category: string) => Chat[]; // 캐싱된 데이터 가져오기
}

export const useSelectModeStore = create<SelectModeState>((set, get) => ({
  mode: 'default',
  selectedIds: [],
  chatsByCategory: {},

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

  setChatsByCategory: (category, chats) =>
    set((state) => ({
      chatsByCategory: {
        ...state.chatsByCategory,
        [category]: chats,
      },
    })),
  getChatsByCategory: (category) => get().chatsByCategory[category] || [],
}));
