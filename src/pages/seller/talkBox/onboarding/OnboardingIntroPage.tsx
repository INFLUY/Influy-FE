import { PageHeader, TalkBoxBottomItemCard, DefaultButton } from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

const OnboardingIntroPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <PageHeader
        leftIcons={[
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
            role="button"
            aria-label="뒤로 가기"
            tabIndex={0}
          />,
        ]}
        additionalStyles="border-0"
      >
        질문관리
      </PageHeader>
      <TalkBoxBottomItemCard
        onCardClick={() => {}}
        title="[11차] 워크팬츠_navy"
        tagline="오버핏이 감각적인 워크팬츠, 제작템입니다. 글글글글글글글"
        imgUrl=""
      />
      <section className="flex h-screen w-full items-end px-5 pb-[4.8125rem]">
        <DefaultButton
          text="지금 바로 시작하기"
          onClick={() => {
            navigate(PATH.SELLER.talkBox.onboarding.start, {
              replace: true,
            });
          }}
        />
      </section>
    </section>
  );
};
export default OnboardingIntroPage;
