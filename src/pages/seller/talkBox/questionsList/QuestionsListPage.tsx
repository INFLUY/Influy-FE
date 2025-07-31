import { ReactNode, useState, useLayoutEffect, useRef } from 'react';
import {
  TalkBoxQuestionItemCard,
  QuestionListHeader,
  SingleQuestionBottomSheet,
  ItemClosedBanner,
} from '@/components';

import { useParams } from 'react-router-dom';
import { BottomSheetContext } from '@/contexts/TalkBoxCategoryContext';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetCategoryQuestionCounts } from '@/services/talkBox/query/useGetCategoryQuestionCounts';
import { useSelectModeStore } from '@/store/talkBoxStore';
import { SingleQuestionAnswerDTO } from '@/types/seller/TalkBox.types';
import { useTalkBoxCategoryStore } from '@/store/talkBoxStore';

export const QuestionsListPage = ({ children }: { children: ReactNode }) => {
  const [singleQuestion, setSingleQuestion] =
    useState<SingleQuestionAnswerDTO | null>(null);

  const { itemId, categoryId } = useParams();
  const { selectedCategoryName } = useTalkBoxCategoryStore();

  const { data } = useGetCategoryQuestionCounts(Number(categoryId));

  // 상단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });
  const { mode } = useSelectModeStore();

  const headerRef = useRef<HTMLDivElement>(null);

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
        <QuestionListHeader headerRef={headerRef} tabCounts={data} />
        <article className="flex w-full flex-col gap-2.5 px-5 pt-4">
          {itemOverview && (
            <TalkBoxQuestionItemCard
              itemName={itemOverview.itemName}
              tagline={itemOverview.tagline}
              mainImg={itemOverview.mainImg}
            />
          )}
          <p className="subhead-sb py-3">
            이 상품의 <span className="text-sub">{selectedCategoryName}</span>{' '}
            관련 질문 중
            <br />
            비슷한 질문들끼리 분류했어요.
          </p>
        </article>
        {children}
      </section>

      {itemOverview?.talkBoxOpenStatus === 'CLOSED' && itemId && (
        <div className="bottom-bar">
          <ItemClosedBanner itemId={itemId} />
        </div>
      )}

      {/* 질문 하나 선택시 */}
      {mode === 'single' && singleQuestion && (
        <SingleQuestionBottomSheet
          itemId={Number(itemId)}
          questionCategoryId={Number(categoryId)}
        />
      )}
    </BottomSheetContext.Provider>
  );
};
