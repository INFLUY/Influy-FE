import { RadioInputList } from './RadioInput.types';
import RadioButtonUnChecked from '@/assets/icon/common/RadioButtonUnchecked.svg?react';
import RadioButtonChecked from '@/assets/icon/common/RadioButtonChecked.svg?react';
import { SetStateAction } from 'react';

const RadioInput = ({
  name,
  item,
  selected,
  setSelected,
}: {
  name: string;
  item: RadioInputList;
  selected: number;
  setSelected: React.Dispatch<SetStateAction<number>>;
}) => {
  const isSelected = selected === item.id;
  return (
    <div
      className="flex w-full cursor-pointer items-start gap-[.625rem] py-4"
      onClick={() => setSelected(item.id)}
    >
      <input
        name={name}
        key={item.id}
        id={item.text}
        type="radio"
        className="hidden"
        checked={isSelected}
        onChange={() => setSelected(item.id)}
      />
      {isSelected ? (
        <RadioButtonChecked className="shrink-0" />
      ) : (
        <RadioButtonUnChecked className="shrink-0" />
      )}
      <label
        htmlFor={item.text}
        className="flex cursor-pointer flex-col gap-1 break-words whitespace-break-spaces"
      >
        <h1 className="body1-m text-black">{item.text}</h1>
        {item.description && (
          <p className="text-grey07 body2-m">{item.description}</p>
        )}
      </label>
    </div>
  );
};

const RadioInputSelector = ({
  name,
  list,
  selected,
  setSelected,
}: {
  name: string;
  list: RadioInputList[];
  selected: number;
  setSelected: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="caption-m divide-grey02 flex w-full shrink-0 flex-col items-start justify-center divide-y rounded-[.1875rem]">
      {list?.map((item) => (
        <RadioInput
          key={item.id}
          name={name}
          item={item}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

export default RadioInputSelector;
