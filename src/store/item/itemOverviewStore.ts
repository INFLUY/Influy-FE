import { create } from 'zustand';
import { ItemOverviewDTO } from '@/types/common/ItemType.types';

type ItemOverviewStore = {
  itemOverview: ItemOverviewDTO | null;
  setItemOverview: (overview: ItemOverviewDTO) => void;
};

export const useItemOverviewStore = create<ItemOverviewStore>((set) => ({
  itemOverview: null,
  setItemOverview: (overview) => set({ itemOverview: overview }),
}));
