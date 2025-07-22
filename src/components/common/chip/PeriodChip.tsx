export const PeriodChip = ({ period }: { period: number }) => {
  return (
    <div
      className="bg-grey11 caption-small-m inline-flex items-center justify-center px-2 py-[.1875rem] text-white"
      aria-label={period + '차 진행'}
    >
      {period}차 진행
    </div>
  );
};
