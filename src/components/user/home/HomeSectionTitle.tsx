import { MoreButton } from '@/components/user/home/MoreButton';

export const HomeSectionTitle = ({
  title,
  itemLength,
  onClickMore,
}: {
  title: string;
  itemLength?: number;
  onClickMore?: () => void;
}) => {
  return (
    <div className="flex items-center justify-between px-5">
      <h1 className="subhead-b text-black">{title}</h1>
      {itemLength !== undefined && itemLength > 0 && onClickMore && (
        <MoreButton onClickMore={onClickMore} />
      )}
    </div>
  );
};
