import { ReactNode, Suspense, useEffect, useState } from 'react';
import { PATH } from '@/routes/path';
import {
  PageHeader,
  Tab,
  Tabs,
  TalkBoxBottomItemCard,
  LoadingSpinner,
  ToolTip,
} from '@/components';

import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import SettingsIcon from '@/assets/icon/common/SettingsIcon.svg?react';

import { useStrictId } from '@/hooks/auth/useStrictId';

import {
  useNavigate,
  useLocation,
  generatePath,
  useParams,
} from 'react-router-dom';

import { TalkBoxCategoryContext } from '@/contexts/TalkBoxCategoryContext';
import cn from '@/utils/cn';
//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetCategoryList } from '@/services/talkBox/query/useGetCategoryList';

export const TalkBoxCategoryPage = ({ children }: { children: ReactNode }) => {
  const { itemId } = useParams();
  const { sellerId } = useStrictId();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // 하단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: Number(sellerId),
    itemId: Number(itemId),
  });

  // 카테고리 및 갯수
  const { data } = useGetCategoryList(Number(itemId));

  const TABS = [
    {
      id: 0,
      name: `답변대기(${data.waitingCnt})`,
      path: PATH.SELLER.TALK_BOX.ITEM.TABS.PENDING,
    },
    {
      id: 1,
      name: `완료한 질답(${data.completedCnt})`,
      path: PATH.SELLER.TALK_BOX.ITEM.TABS.ANSWERED,
    },
  ];

  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  // 온보딩 페이지에서 진입 (처음 진입시) 여부 판단
  const isOnboarding = state?.isOnboarding;

  const handleSettingClick = () => {
    const path = generatePath(`${PATH.SELLER.TALK_BOX.ITEM.SETTING.BASE}`);
    navigate(path);
  };

  useEffect(() => {
    setShowTooltip(true);
    const timer = window.setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [isOnboarding]);

  return (
    <TalkBoxCategoryContext.Provider
      value={{ itemId: Number(itemId), categoryData: data }}
    >
      <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pt-11">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="sticky top-0 z-50">
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
              rightIcons={[
                <HomeIcon
                  className="h-6 w-6 cursor-pointer text-black"
                  role="button"
                  aria-label="홈으로 가기"
                  tabIndex={0}
                  onClick={() => {
                    navigate(`${PATH.SELLER.BASE}/${PATH.SELLER.HOME.BASE}`);
                  }}
                />,
                <div className="relative">
                  <SettingsIcon
                    className="h-6 w-6 cursor-pointer text-black"
                    role="button"
                    aria-label="톡박스 설정 가기"
                    tabIndex={0}
                    onClick={handleSettingClick}
                  />

                  {isOnboarding && (
                    <ToolTip
                      text="톡박스 활성화 여부와 기본 채팅 멘트는 이곳에서 설정
                        가능해요."
                      additionalStyles={cn(
                        'pointer-events-none w-[14.625rem] text-left absolute top-8 -right-2 transition-opacity duration-500',
                        showTooltip ? 'opacity-100' : 'opacity-0'
                      )}
                      position="right"
                      direction="bottom"
                    />
                  )}
                </div>,
              ]}
              additionalStyles="border-0"
            >
              질문 관리
            </PageHeader>
            <Tabs>
              {TABS.map((tab) => (
                <Tab
                  key={tab.id}
                  isTabActive={pathname.includes(tab.path)}
                  handleClickTab={() => navigate(tab.path, { replace: true })}
                >
                  {tab.name}
                </Tab>
              ))}
            </Tabs>
          </div>

          {children}
        </Suspense>

        {itemOverview && itemId && (
          <TalkBoxBottomItemCard
            itemId={itemId}
            itemName={itemOverview.itemName}
            tagline={itemOverview.tagline}
            mainImg={itemOverview.mainImg}
            isClosedItem={itemOverview.talkBoxOpenStatus === 'CLOSED'}
          />
        )}
      </section>
    </TalkBoxCategoryContext.Provider>
  );
};
