interface TipTooltipProps {
  text: string;
}
export const TipTooltip = ({ text }: TipTooltipProps) => {
  return (
    <div className="bg-grey02 caption-m flex w-full shrink-0 items-center justify-center gap-1 rounded-[.1875rem] px-2.5 py-2">
      <span className="text-black">Tip!</span>
      <span className="text-grey08"> {text}</span>
    </div>
  );
};
