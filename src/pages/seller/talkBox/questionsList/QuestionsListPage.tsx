import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  TalkBoxQuestionItemCard,
  SnackBar,
  QuestionListHeader,
  SingleQuestionBottomSheet,
} from '@/components';

import { useLocation, useParams } from 'react-router-dom';
import { BottomSheetContext } from '@/contexts/TalkBoxCategoryContext';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetCategoryQuestionCounts } from '@/services/talkBox/query/useGetCategoryQuestionCounts';
import { useSelectModeStore } from '@/store/talkBoxStore';
import { QuestionDTO } from '@/types/seller/TalkBox.types';

export const QuestionsListPage = ({ children }: { children: ReactNode }) => {
  const [snackBarState, setSnackBarState] = useState<{
    message: string;
    isOpen: boolean;
  }>({ message: '', isOpen: false });
  const [singleQuestion, setSingleQuestion] = useState<QuestionDTO | null>(
    null
  );

  const location = useLocation();
  const sentCount = location.state?.sentCount;

  const { itemId, categoryId } = useParams();

  const { data } = useGetCategoryQuestionCounts(Number(categoryId));

  // 상단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });
  const { mode, setMode } = useSelectModeStore();

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sentCount) {
      const message = sentCount + '개의 답변이 정상적으로 전송되었습니다.';
      setSnackBarState({
        isOpen: true,
        message: message,
      });
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

  // TODO: 로컬스토리지에서 삭제 처리
  // useSelectModeStore.persist.clearStorage();
  return (
    <BottomSheetContext.Provider value={{ singleQuestion, setSingleQuestion }}>
      <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <QuestionListHeader
          headerRef={headerRef}
          category={category}
          tabCounts={data}
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
            {snackBarState.message}
          </SnackBar>
        )}
      </section>

      {/* 질문 하나 선택시 */}
      {mode === 'single' && singleQuestion && (
        <SingleQuestionBottomSheet
          question={singleQuestion}
          onClose={() => {
            setMode('default');
            setSingleQuestion(null);
          }}
          itemId={Number(itemId)}
          categoryId={Number(categoryId)}
          tagId={singleQuestion.tagId}
        />
      )}
    </BottomSheetContext.Provider>
  );
};
