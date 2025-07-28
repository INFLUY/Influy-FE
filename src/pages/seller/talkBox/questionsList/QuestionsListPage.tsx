import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  TalkBoxQuestionItemCard,
  SnackBar,
  QuestionListHeader,
} from '@/components';

import {
  dummySubCategories,
  dummyChats,
  dummyChats2,
} from '../talkboxMockData';
import { useLocation, useParams } from 'react-router-dom';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';

export const QuestionsListPage = ({ children }: { children: ReactNode }) => {
  // 탭 답변대기, 완료한 질답 갯수
  const [tabCounts, setTabCounts] = useState({
    pending: 0,
    answered: 0,
  });

  const [snackBarState, setSnackBarState] = useState<{
    message: string;
    isOpen: boolean;
  }>({ message: '', isOpen: false });

  const location = useLocation();
  const sentCount = location.state?.sentCount;

  const { selectedIds } = useSelectModeStore();

  const { questionsByTag, selectedTag } = useTalkBoxQuestionStore();

  const { itemId } = useParams();

  // 상단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });

  const allChatIds = questionsByTag?.[selectedTag?.name]?.map(
    (q) => q?.questionId
  );
  const isAllSelected =
    questionsByTag?.[selectedTag?.name]?.length > 0 &&
    allChatIds?.every((id) => selectedIds.includes(id));

  const headerRef = useRef<HTMLDivElement>(null);

  //임시
  useEffect(() => {
    setTabCounts({ pending: 2, answered: 3 });
  }, []);

  useEffect(() => {
    if (sentCount) {
      setSnackBarState({
        isOpen: true,
        message: sentCount + '개의 답변이 정상적으로 전송되었습니다.',
      });
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [sentCount]);

  const category = '색상';

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
      <QuestionListHeader
        headerRef={headerRef}
        allChatIds={allChatIds}
        isAllSelected={isAllSelected}
        category={category}
        tabCounts={tabCounts}
      />
      <article className="flex w-full flex-col gap-2.5 px-5 pt-4">
        {itemOverview && (
          <TalkBoxQuestionItemCard
            itemName={itemOverview.itemName}
            tagline={itemOverview.tagline}
            mainImg={itemOverview.mainImg}
          />
        )}
        <p className="subhead-sb py-3">
          이 상품의 <span className="text-sub">{category}</span> 관련 질문 중
          <br />
          비슷한 질문들끼리 분류했어요.
        </p>
      </article>
      {children}
      {snackBarState.isOpen && (
        <SnackBar
          handleSnackBarClose={() =>
            setSnackBarState({ message: '', isOpen: false })
          }
        >
          {sentCount}개의 답변이 정상적으로 전송되었습니다.
        </SnackBar>
      )}
    </section>
  );
};
