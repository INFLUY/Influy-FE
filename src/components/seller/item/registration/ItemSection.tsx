import { TipTooltip } from '../../common/TipTooltip';
interface ItemSectionProps {
  label: string;
  children: React.ReactNode;
  tooltipText?: string;
}

export const ItemSection = ({
  label,
  children,
  tooltipText,
}: ItemSectionProps) => (
  <article className="flex h-fit w-full flex-col items-start gap-[1rem] px-[1.25rem]">
    <div className="flex w-full flex-col gap-[.875rem]">
      <h2 className="body1-b w-full py-0 text-black">{label}</h2>
      {children}
    </div>

    {tooltipText && <TipTooltip text={tooltipText} />}
  </article>
);
