export interface LimitedTextInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  maxLength: number;
  placeHolderContent: string;
}
