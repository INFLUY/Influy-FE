import { MoreButton } from '@/components/user/home/MoreButton';

export const HomeSectionTitle = ({
  title,
  onClickMore,
}: {
  title: string;
  onClickMore?: () => void;
}) => {
  return (
    <div className="flex items-center justify-between px-5">
      <h1 className="subhead-b text-black">{title}</h1>
      {onClickMore && <MoreButton onClickMore={onClickMore} />}
    </div>
  );
};
