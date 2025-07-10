import XIcon from '@/assets/icon/common/XIcon.svg?react';
import InfluyLogo from '/public/InfluyLogo.svg?react';
import KakaoIcon from '@/assets/icon/common/KakaoIcon.svg?react';
import Arrow from '@/assets/icon/common/ArrowRight12.svg?react';

const LoginPage = () => {
  return (
    <div className="relative flex flex-1">
      <section className="z-20 flex w-full translate-y-[4.375rem] flex-col items-center justify-center gap-[13.25rem] px-5 text-center">
        <XIcon
          className="absolute -top-6 left-5 h-6 w-6 text-white"
          role="button"
          aria-label="로그인 창 닫기"
        />
        <div className="flex flex-col gap-[.8125rem]">
          <InfluyLogo className="h-[2.75rem]" />
          <p className="text-grey04 text-[1.125rem] whitespace-pre">{`인플루언서의\n취향이 묻어나는 선택`}</p>
        </div>
        <article className="flex w-full flex-col items-center gap-[1.1875rem] text-center">
          <span className="body2-r text-grey01 flex gap-2">
            <p>인플루이가 처음이라면?</p>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-[.125rem] text-center"
            >
              <span>소개보기</span>
              <Arrow />
            </button>
          </span>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-[#FEE500] py-3.5"
          >
            <KakaoIcon />
            <span className="body2-b">카카오로 3초만에 시작하기</span>
          </button>
          <button type="button" className="body2-r text-grey06 cursor-pointer">
            문의하기
          </button>
        </article>
      </section>
      <div className="absolute inset-0 flex">
        <div className="absolute z-10 h-full w-full bg-[#000000] opacity-50" />
        <img src="/src/assets/image/LoginBgImg.svg" className="object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;
