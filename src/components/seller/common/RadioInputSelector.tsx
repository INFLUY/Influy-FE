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
      className="flex w-full cursor-pointer gap-[.625rem] py-4"
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
      {isSelected ? <RadioButtonChecked /> : <RadioButtonUnChecked />}
      <label
        htmlFor={item.text}
        className="body1-m cursor-pointer text-center text-black"
      >
        {item.text}
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
