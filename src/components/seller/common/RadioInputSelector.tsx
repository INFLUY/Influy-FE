import { RadioInputList } from './RadioInput.types';
import cn from '@/utils/cn';

const RadioInput = ({
  disabled,
  name,
  item,
  selected,
  setSelected,
}: {
  disabled: boolean;
  name: string;
  item: RadioInputList;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isSelected = selected === item.type;

  return (
    <div
      className="flex w-full cursor-pointer items-start gap-[.625rem] py-4"
      onClick={() => setSelected(item.type)}
    >
      <input
        name={name}
        key={item.id}
        id={item.text}
        type="radio"
        className="hidden"
        checked={isSelected}
        onChange={() => setSelected(item.type)}
      />
      <div
        className={cn(
          'h-[1.25rem] w-[1.25rem] rounded-full border-1 p-1',
          isSelected
            ? 'border-[.3125rem] border-black bg-white'
            : 'border-grey04 bg-grey02'
        )}
      />
      <label
        htmlFor={item.text}
        className="flex cursor-pointer flex-col gap-1 break-words whitespace-break-spaces"
      >
        <h1
          className={cn('body1-m text-black', {
            'text-grey08': disabled,
          })}
        >
          {item.text}
        </h1>
        {item.description && (
          <p
            className={cn('text-grey07 body2-m', {
              'text-grey05': disabled,
            })}
          >
            {item.description}
          </p>
        )}
      </label>
    </div>
  );
};

const RadioInputSelector = ({
  disabled = false,
  name,
  list,
  selected,
  setSelected,
}: {
  disabled?: boolean;
  name: string;
  list: RadioInputList[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="caption-m divide-grey02 flex w-full shrink-0 flex-col items-start justify-center divide-y rounded-[.1875rem]">
      {list?.map((item) => (
        <RadioInput
          disabled={disabled}
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
