import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  PageHeader,
  Tab,
  Tabs,
  TalkBoxQuestionItemCard,
  SubCategoryChip,
  SellerChatBubble,
  DefaultButton,
} from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import { dummySubCategories, dummyChats, dummyChats2 } from './talkboxMockData';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { SubCategory } from '@/types/seller/TalkBox.types';
import { useSelectModeStore } from '@/store/talkBoxStore';

export const QuestionsListPage = ({ children }: { children: ReactNode }) => {
  // 탭 답변대기, 완료한 질답 갯수
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    answered: 0,
  });
  const {
    isSelectMode,
    setIsSelectMode,
    selectedIds,
    toggleSelectAll,
    setChatsByCategory,
  } = useSelectModeStore();

  //임시
  const allChatIds = dummyChats.map((chat) => chat.questionId);
  const isAllSelected = allChatIds.every((id) => selectedIds.includes(id));

  const headerRef = useRef<HTMLDivElement>(null);

  //임시
  useEffect(() => {
    setTabCounts({ pending: 2, answered: 3 });
    setChatsByCategory(dummySubCategories[0].text, dummyChats);
    setChatsByCategory(dummySubCategories[1].text, dummyChats2);
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { itemId } = useParams();

  const category = '색상';

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

  // 최초 진입시 상단의 헤더+탭 바 사이즈 계산
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // 최초·리사이즈 시 header 실제 높이를 CSS 변수에 기록
    const setHeight = () =>
      document.documentElement.style.setProperty(
        '--headerHeight',
        `${el.getBoundingClientRect().height}px`
      );

    // 첫 실행
    setHeight();

    // 헤더 높이가 바뀌면 감지 (ex. 폰트 크기 변경)
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <div ref={headerRef} className="sticky top-0 z-50">
        <PageHeader
          leftIcons={[
            isSelectMode ? (
              <button
                onClick={() => toggleSelectAll(allChatIds)}
                type="button"
                className="bg-grey03 body2-m text-grey10 flex cursor-pointer items-center justify-center gap-0.5 rounded-xs px-2 py-[.1875rem]"
              >
                {isAllSelected ? '전체 선택 해제' : '전체선택'}
              </button>
            ) : (
              <ArrowLeftIcon
                className="h-6 w-6 cursor-pointer text-black"
                onClick={() => navigate(-1)}
                role="button"
                aria-label="뒤로 가기"
                tabIndex={0}
              />
            ),
          ]}
          rightIcons={[
            isSelectMode ? (
              <button
                className="body1-m text-grey10 cursor-pointer"
                type="button"
                onClick={() => setIsSelectMode(false)}
              >
                취소
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsSelectMode(true)}
                  type="button"
                  className="bg-grey11 body2-m text-grey01 flex cursor-pointer items-center justify-center gap-0.5 rounded-xs px-2 py-[.1875rem]"
                >
                  질문선택
                </button>

                <HomeIcon
                  className="h-6 w-6 cursor-pointer text-black"
                  role="button"
                  aria-label="홈으로 가기"
                  tabIndex={0}
                  onClick={() => {
                    navigate(`${PATH.SELLER.base}/${PATH.SELLER.home.base}`);
                  }}
                />
              </>
            ),
          ]}
          additionalStyles="border-0"
        >
          {category}
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
      <article className="flex w-full flex-col gap-2.5 px-5 pt-4">
        <TalkBoxQuestionItemCard
          title="헤이드 리본 레이어드 티"
          tagline="[소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템!"
          imgUrl="/img1.png"
        />
        <p className="subhead-sb py-3">
          이 상품의 <span className="text-sub">{category}</span> 관련 질문 중
          <br />
          비슷한 질문들끼리 분류했어요.
        </p>
      </article>

      {children}
    </section>
  );
};

export const PendingQuestionsTab = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  const {
    isSelectMode,
    selectedIds,
    setSelectedIds,
    chatsByCategory,
    getChatsByCategory,
  } = useSelectModeStore();
  console.log(chatsByCategory);

  //임시
  useEffect(() => {
    setSelectedSubCategory(dummySubCategories[0]);
  }, []);

  return (
    <>
      <div
        className="sticky z-30 bg-white"
        style={{ top: 'var(--headerHeight)' }}
      >
        <div className="scrollbar-hide flex shrink-0 items-center gap-[.5625rem] overflow-x-scroll bg-white px-5 py-3">
          {dummySubCategories &&
            dummySubCategories.length > 0 &&
            dummySubCategories.map((subCategory) => (
              <SubCategoryChip
                key={subCategory.text}
                text={subCategory.text}
                count={subCategory.totalCount}
                isSelected={selectedSubCategory?.id === subCategory.id}
                hasNew={!!subCategory.newCount && subCategory.newCount > 0}
                onToggle={() => setSelectedSubCategory(subCategory)}
              />
            ))}
        </div>
      </div>
      <section className="mt-4 flex w-full flex-col gap-5 pb-22">
        {/* 상단 제목 */}
        <div className="flex w-full items-center justify-between px-5">
          <div className="body1-sb flex gap-1">
            <span className="text-sub">#{selectedSubCategory?.text}</span>
            <span className="text-grey11">
              ({selectedSubCategory?.totalCount})
            </span>
          </div>
          <span className="body2-sb text-grey11">
            새 질문 ({selectedSubCategory?.newCount})
          </span>
        </div>
        {/* 말풍선 */}
        {selectedSubCategory &&
          getChatsByCategory(selectedSubCategory?.text).map((chat) => (
            <SellerChatBubble
              key={chat.questionId}
              questionId={chat.questionId}
              content={chat.content}
              createdAt={chat.createdAt}
              profileImg={chat.profileImg}
              username={chat.username}
              askedCount={chat.askedCount}
              isChecked={chat.isChecked}
              isSelected={selectedIds.includes(chat.questionId)}
              selectedSubCategory={selectedSubCategory?.text}
            />
          ))}
        {/* 하단 버튼 */}
        {isSelectMode && (
          <section className="bottom-bar flex w-full shrink-0 items-center justify-center gap-[.4375rem] bg-white px-5 py-2">
            <DefaultButton
              onClick={() => {}}
              text="삭제하기"
              disabled={selectedIds.length === 0}
              activeTheme="white"
              disabledTheme="greyLine"
            />
            <DefaultButton
              type="submit"
              text={
                selectedIds.length > 0
                  ? `(${selectedIds.length}개) 일괄 답변하기`
                  : '일괄 답변하기'
              }
              disabled={selectedIds.length === 0}
            />
          </section>
        )}
      </section>
    </>
  );
};

export const AnsweredQuestionsTab = () => {
  return (
    <div>
      <h1>Answered Questions</h1>
      {/* Additional content and components can be added here */}
    </div>
  );
};
