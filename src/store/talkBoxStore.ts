import { create } from 'zustand';
import { Chat } from '@/types/seller/TalkBox.types';

interface SelectModeState {
  isSelectMode: boolean;
  selectedIds: number[];
  chatsByCategory: Record<string, Chat[]>;

  setIsSelectMode: (value: boolean) => void;
  setSelectedIds: (ids: number[]) => void;
  toggleSelectAll: (allIds: number[]) => void;
  setChatsByCategory: (category: string, chats: Chat[]) => void; // 카테고리별 채팅 저장
  getChatsByCategory: (category: string) => Chat[]; // 캐싱된 데이터 가져오기
}

export const useSelectModeStore = create<SelectModeState>((set, get) => ({
  isSelectMode: false,
  selectedIds: [],
  chatsByCategory: {},

  setIsSelectMode: (value) => {
    if (!value) set({ selectedIds: [] }); // 취소 시 선택 해제
    set({ isSelectMode: value });
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
