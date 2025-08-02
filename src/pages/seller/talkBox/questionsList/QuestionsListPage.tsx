import {
  ReactNode,
  lazy,
  useState,
  useLayoutEffect,
  useRef,
  Suspense,
} from 'react';
import {
  TalkBoxQuestionItemCard,
  QuestionListHeader,
  ItemClosedBanner,
  DefaultButton,
  LoadingSpinner,
  SingleQuestionBottomSheet,
} from '@/components';

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '@/routes/path';

//store 및 context
import { BottomSheetContext } from '@/contexts/TalkBoxCategoryContext';
import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useSelectModeStore } from '@/store/talkBoxStore';
import { useTalkBoxCategoryStore } from '@/store/talkBoxStore';

//type
import { SingleQuestionAnswerDTO } from '@/types/seller/TalkBox.types';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetCategoryQuestionCounts } from '@/services/talkBox/query/useGetCategoryQuestionCounts';
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';

import { useStrictId } from '@/hooks/auth/useStrictId';

export const QuestionsListPage = ({ children }: { children: ReactNode }) => {
  const [singleQuestion, setSingleQuestion] =
    useState<SingleQuestionAnswerDTO | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { sellerId } = useStrictId();
  const { itemId, categoryId } = useParams();

  const { selectedCategoryName } = useTalkBoxCategoryStore();
  const { showModal, hideModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { mode, selectedQuestions, setMode } = useSelectModeStore();

  const { data } = useGetCategoryQuestionCounts(Number(categoryId));

  // 상단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: Number(sellerId),
    itemId: Number(itemId),
  });

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

  // 질문 삭제
  const { mutate: deleteQuestions } = useDeleteCategoryQuestions({
    itemId: Number(itemId),
    questionCategoryId: Number(categoryId),
    onSuccessCallback: () => {
      showSnackbar('질문이 삭제되었습니다.');
      hideModal();
      setMode('default');
    },
  });

  const handleDeleteConfirm = () => {
    const selectedId: number[] = selectedQuestions.map((q) => q.questionId);
    const tagsToInvalidate: number[] = Array.from(
      new Set(selectedQuestions.map((q) => q.tagId))
    );
    deleteQuestions({ questionIdList: selectedId, tagIds: tagsToInvalidate });
  };

  // 일괄 답변하기
  const handleBulkReply = () => {
    if (selectedQuestions.length === 1) {
      const singleQuestion: SingleQuestionAnswerDTO = {
        questionDto: { ...selectedQuestions[0] },
        answerListDto: { answerViewList: [] },
      };
      setSingleQuestion(singleQuestion);
      setMode('single');
      return;
    }
    navigate(`${PATH.SELLER.TALK_BOX.ITEM.CATEGORY.BULK_REPLY}`);
  };

  // TODO: 로컬스토리지에서 삭제 처리
  // useSelectModeStore.persist.clearStorage();
  return (
    <BottomSheetContext.Provider value={{ singleQuestion, setSingleQuestion }}>
      <section className="bg-grey01 scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <QuestionListHeader headerRef={headerRef} tabCounts={data} />
        </Suspense>

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

        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>

        {/* 하단 버튼 */}
        <section className="bottom-bar flex w-full flex-col">
          {itemOverview?.talkBoxOpenStatus === 'CLOSED' && itemId && (
            <ItemClosedBanner itemId={itemId} />
          )}
          {mode === 'select' && (
            <div className="flex w-full shrink-0 items-center justify-center gap-[.4375rem] bg-white px-5 py-2">
              <DefaultButton
                onClick={() => {
                  showModal({
                    text: `해당 질문을 삭제하시겠습니까?\n한 번 삭제한 질문은 되돌릴 수 없습니다.`,
                    description: '*상대방은 삭제 여부를 알 수 없습니다.',
                    leftButtonClick: () => hideModal(),
                    rightButtonClick: () => handleDeleteConfirm(),
                  });
                }}
                text="삭제하기"
                disabled={selectedQuestions.length === 0}
                activeTheme="white"
                disabledTheme="borderGrey"
              />
              {itemOverview?.talkBoxOpenStatus !== 'CLOSED' &&
                pathname.includes('pending') && (
                  <DefaultButton
                    type="submit"
                    text={
                      selectedQuestions.length > 0
                        ? `(${selectedQuestions.length}개) 일괄 답변하기`
                        : '일괄 답변하기'
                    }
                    disabled={selectedQuestions.length === 0}
                    onClick={handleBulkReply}
                  />
                )}
            </div>
          )}
        </section>
      </section>

      {/* 질문 하나 선택시 */}
      {mode === 'single' && singleQuestion && (
        //TODO: prev answers 정밀하게 suspense 처리
        <Suspense fallback={null}>
          <SingleQuestionBottomSheet
            itemId={Number(itemId)}
            questionCategoryId={Number(categoryId)}
          />
        </Suspense>
      )}
    </BottomSheetContext.Provider>
  );
};
