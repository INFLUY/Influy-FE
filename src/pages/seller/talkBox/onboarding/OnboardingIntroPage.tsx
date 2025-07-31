import { PageHeader, TalkBoxBottomItemCard, DefaultButton } from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useEffect } from 'react';

import { LottieViewer } from '@/components/seller/talkBox/onboarding/LottieViewer';

const OnboardingIntroPage = () => {
  const navigate = useNavigate();

  const { itemId } = useParams();

  // 하단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });

  useEffect(() => {
    if (itemOverview && itemOverview?.talkBoxOpenStatus !== 'INITIAL') {
      //  TODO: 수정 필요
      navigate(PATH.SELLER.TALKBOX.BASE, { replace: true });
    }
  }, [itemOverview]);

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
      <LottieViewer />
      {itemOverview && (
        <TalkBoxBottomItemCard
          onCardClick={() => {}}
          itemName={itemOverview.itemName}
          tagline={itemOverview.tagline}
          mainImg={itemOverview.mainImg}
        />
      )}
      <section className="flex h-screen w-full items-end px-5 pb-[4.8125rem]">
        <DefaultButton
          text="지금 바로 시작하기"
          onClick={() => {
            navigate(PATH.SELLER.TALKBOX.ONBOARDING.START);
          }}
        />
      </section>
    </section>
  );
};
export default OnboardingIntroPage;
