import { create } from 'zustand';

interface SelectModeState {
  isSelectMode: boolean;
  setIsSelectMode: (value: boolean) => void;

  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
  toggleSelectAll: (allIds: number[]) => void;
}

export const useSelectModeStore = create<SelectModeState>((set, get) => ({
  isSelectMode: false,
  setIsSelectMode: (value) => {
    if (!value) set({ selectedIds: [] }); // 취소 시 선택 해제
    set({ isSelectMode: value });
  },

  selectedIds: [],
  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleSelectAll: (allIds) => {
    const current = get().selectedIds;
    const isAllSelected = allIds.every((id) => current.includes(id));

    set({ selectedIds: isAllSelected ? [] : allIds });
  },
}));
