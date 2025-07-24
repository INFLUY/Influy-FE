import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { DefaultButton, PageHeader } from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';

export const WelcomePage = () => {
  const navigate = useNavigate();

  // 다음 버튼 클릭 핸들러
  const handleClickNext = () => {
    navigate(PATH.HOME.BASE, { replace: true });
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader
        rightIcons={[
          <XIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate('')}
          />,
        ]}
      >
        회원가입
      </PageHeader>
      <section className="flex w-full flex-1 flex-col gap-11 px-5 py-[3.25rem]">
        <h1 className="headline2 whitespace-pre text-black">
          {`인플루이에 오신 것을\n환영합니다!`}
        </h1>
      </section>
      <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="button"
          text="지금 바로 둘러보기"
          onClick={handleClickNext}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
