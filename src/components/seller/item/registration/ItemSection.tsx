import { TipTooltip } from '../../common/TipTooltip';
interface ItemSectionProps {
  label: string;
  children: React.ReactNode;
  tooltipText?: string;
  required?: boolean;
}

export const ItemSection = ({
  label,
  children,
  tooltipText,
  required = false,
}: ItemSectionProps) => (
  <article className="flex h-fit w-full flex-col items-start gap-[1rem] px-[1.25rem]">
    <div className="flex w-full flex-col gap-[.875rem]">
      <h2 className="body1-b w-full text-black">
        {label}
        {required && <span className="text-main"> *</span>}
      </h2>
      {children}
    </div>

    {tooltipText && <TipTooltip text={tooltipText} />}
  </article>
);
