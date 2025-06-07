import ArrowRightIcon from '@/assets/icon/common/ArrowRight.svg?react';

export const ItmeDetailProfile = () => {
  return (
    <div className="bg-grey01 flex h-fit w-full items-center justify-between px-5 py-3">
      <div className="flex h-full w-full items-center gap-3">
        <img
          src="/img1.png"
          alt="seller profile"
          className="h-[3.75rem] w-[3.75rem] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="body1-b text-black">소현</span>
          <span className="body2-m text-grey08">@xoyeone_</span>
        </div>
      </div>
      <ArrowRightIcon className="h-4 w-4" />
    </div>
  );
};
