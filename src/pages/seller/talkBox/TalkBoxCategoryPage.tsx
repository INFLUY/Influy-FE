import { ReactNode, useState, useEffect } from 'react';
import { PATH } from '@/routes/path';
import {
  PageHeader,
  Tab,
  Tabs,
  TalkBoxCategoryItem,
  TalkBoxBottomItemCard,
} from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';

import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import SettingsIcon from '@/assets/icon/common/SettingsIcon.svg?react';

import {
  useNavigate,
  useLocation,
  generatePath,
  useParams,
} from 'react-router-dom';

import { dummyQuestionCategories } from './talkboxMockData';
import { QuestionCategory } from '@/types/seller/TalkBox.types';

export const TalkBoxCategoryPage = ({ children }: { children: ReactNode }) => {
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    answered: 0,
  });

  //임시
  useEffect(() => {
    setTabCounts({ pending: 2, answered: 3 });
  }, []);

  const TABS = [
    {
      id: 0,
      name: `답변대기(${tabCounts.pending})`,
      path: PATH.SELLER.talkBox.item.tabs.pending,
    },
    {
      id: 1,
      name: `완료한 질답(${tabCounts.answered})`,
      path: PATH.SELLER.talkBox.item.tabs.answered,
    },
  ];

  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { itemId } = useParams();

  const isOnboarding = state?.isOnboarding;
  console.log(isOnboarding);

  const handleSettingClick = () => {
    const path = generatePath(`${PATH.SELLER.talkBox.item.setting.base}`);
    navigate(path);
  };

  return (
    <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <div className="sticky top-0 z-50">
        {/* TODO 페이지 헤더 분리하기 */}
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
                navigate(`${PATH.SELLER.base}/${PATH.SELLER.home.base}`);
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
                <div className="absolute top-9 -right-2 w-[14.625rem]">
                  {/* 꼬리 (삼각형) */}
                  <div className="border-b-sub absolute -top-2 right-3 h-0 w-0 border-x-[.5rem] border-b-[.5rem] border-x-transparent" />

                  {/* 본체 말풍선 */}
                  <div className="bg-sub body2-sb flex items-center justify-center self-stretch rounded-[.1875rem] px-3 py-2 text-left text-white">
                    톡박스 활성화 여부와 기본 채팅 멘트는 이곳에서 설정
                    가능해요.
                  </div>
                </div>
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

      <TalkBoxBottomItemCard
        onCardClick={() => {}}
        title="[11차] 워크팬츠_navy"
        tagline="오버핏이 감각적인 워크팬츠, 제작템입니다. 글글글글글글글"
        imgUrl=""
      />
    </section>
  );
};

export const PendingCategoryTab = () => {
  const [categoryList, setCategoryList] = useState<QuestionCategory[]>([]);

  const navigate = useNavigate();
  const { itemId } = useParams();
  const handleCategoryClick = (categoryId: number) => {
    const path = generatePath(
      `${PATH.SELLER.base}/${PATH.SELLER.talkBox.base}/${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.category.base}/${PATH.SELLER.talkBox.item.category.tabs.pending}`,
      {
        itemId: String(itemId),
        categoryId: String(categoryId),
      }
    );
    navigate(path);
  };

  //임시
  useEffect(() => {
    setCategoryList(dummyQuestionCategories);
  }, []);

  return (
    <section className="mt-[1.625rem] flex w-full flex-col items-start gap-8">
      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((category) => (
          <TalkBoxCategoryItem
            key={category.id}
            category={category}
            handleCategoryClick={handleCategoryClick}
            mode="pending"
          />
        ))}
    </section>
  );
};

export const AnsweredCategoryTab = () => {
  const [categoryList, setCategoryList] = useState<QuestionCategory[]>([]);

  const navigate = useNavigate();
  const { itemId } = useParams();
  const handleCategoryClick = (categoryId: number) => {
    const path = generatePath(
      `${PATH.SELLER.base}/${PATH.SELLER.talkBox.base}/${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.category.base}/${PATH.SELLER.talkBox.item.category.tabs.answered}`,
      {
        itemId: String(itemId),
        categoryId: String(categoryId),
      }
    );
    navigate(path);
  };

  //임시
  useEffect(() => {
    console.log('실행');
    setCategoryList(dummyQuestionCategories);
  }, []);

  return (
    <section className="mt-[1.625rem] flex w-full flex-col items-start gap-8">
      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((category) => (
          <TalkBoxCategoryItem
            key={category.id}
            category={category}
            handleCategoryClick={handleCategoryClick}
            mode="answered"
          />
        ))}
    </section>
  );
};
