import { PageHeader, Tab, Tabs } from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';
import React, { useMemo } from 'react';
import { PATH } from '@/routes/path';
import { useNavigate, useLocation } from 'react-router-dom';

export const QuestionListHeader = ({
  headerRef,
  category,
  tabCounts,
}: {
  headerRef: React.RefObject<HTMLDivElement | null>;

  category: string;
  tabCounts: {
    waitingCnt: number;
    completedCnt: number;
  };
}) => {
  const { mode, setMode, toggleSelectAll, selectedQuestions } =
    useSelectModeStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { questionsByTag, selectedTag } = useTalkBoxQuestionStore();

  const { allChat, isAllSelected } = useMemo(() => {
    if (mode !== 'select') return { allChat: [], isAllSelected: false };

    const all = questionsByTag?.[selectedTag?.name];
    const allIds = all.map((q) => q.questionId);
    const isSelected =
      all.length > 0 &&
      allIds.every((id) => selectedQuestions.some((q) => q.questionId === id));

    return { allChat: all, isAllSelected: isSelected };
  }, [mode, questionsByTag, selectedTag?.name, selectedQuestions]);

  const handleSelectMode = () => {
    if (pathname.includes('answered')) {
      navigate(PATH.SELLER.talkBox.item.tabs.pending, {
        replace: true,
      });
    }
    setMode('select');
  };

  const TABS = [
    {
      id: 0,
      name: `답변대기(${tabCounts.waitingCnt})`,
      path: PATH.SELLER.talkBox.item.tabs.pending,
    },
    {
      id: 1,
      name: `완료한 질답(${tabCounts.completedCnt})`,
      path: PATH.SELLER.talkBox.item.tabs.answered,
    },
  ];

  return (
    <div ref={headerRef} className="sticky top-0 z-50">
      <PageHeader
        leftIcons={[
          mode === 'select' ? (
            <button
              onClick={() => toggleSelectAll(allChat)}
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
          mode === 'select' ? (
            <button
              className="body1-m text-grey10 cursor-pointer"
              type="button"
              onClick={() => setMode('default')}
            >
              취소
            </button>
          ) : (
            <>
              <button
                onClick={handleSelectMode}
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
                  navigate(`${PATH.SELLER}/${PATH.SELLER.home.base}`);
                }}
              />
            </>
          ),
        ]}
        additionalStyles="border-0 sticky"
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
  );
};
