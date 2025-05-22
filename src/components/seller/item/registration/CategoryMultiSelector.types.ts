export interface CategoryMultiSelectorProps {
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CategoryChipProps {
  text: string;
  isSelected: boolean;
  onToggle: () => void;
}
