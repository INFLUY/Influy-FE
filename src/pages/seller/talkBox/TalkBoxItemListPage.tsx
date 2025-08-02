// 내 상품 질문 관리 페이지
import {
  PageHeader,
  BottomNavBar,
  TalkBoxItemCard,
  LoadingSpinner,
  OnboardingLottieSwiper,
  DefaultButton,
  ToolTip,
} from '@/components';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { SELLER_ITEM_REGISTRATION_PATH } from '@/utils/generatePath';

//api
import { useGetTalkBoxOpened } from '@/services/sellerItem/query/useGetTalkBoxOpened';

const TalkBoxItemListPage = () => {
  const navigate = useNavigate();
  const { data: openedItems } = useGetTalkBoxOpened();
  const isItem: boolean = false;
  return (
    <section
      className="bg-grey01 scrollbar-hide relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pt-11"
      aria-labelledby="talk-box-item-title"
    >
      <Suspense fallback={<LoadingSpinner />}>
        {isItem ? (
          <>
            <PageHeader>
              <p
                className="subhead-sb w-full text-left"
                id="talk-box-item-title"
              >
                내 상품 질문 관리
              </p>
            </PageHeader>
            <div className="mt-4 flex flex-col gap-[.875rem] px-5">
              <h2 className="body2-m text-grey09 w-full">
                톡박스가 활성화된 상품({openedItems.cnt})
              </h2>

              <div className="flex w-full flex-col gap-6">
                {openedItems.talkBoxOpenedDtoList.map((item) => (
                  <TalkBoxItemCard key={item.itemId} item={item} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col">
            <OnboardingLottieSwiper />
            <section className="flex w-full flex-col items-center gap-2 px-5 pb-18">
              <ToolTip text={'상품을 먼저 등록해보세요!'} />
              <DefaultButton
                text="상품 등록하기"
                onClick={() => {
                  navigate(SELLER_ITEM_REGISTRATION_PATH);
                }}
              />
            </section>
          </div>
        )}
      </Suspense>
      <BottomNavBar userType="SELLER" />
    </section>
  );
};

export default TalkBoxItemListPage;
