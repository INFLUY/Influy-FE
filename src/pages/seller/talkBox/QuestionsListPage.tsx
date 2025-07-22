import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  TalkBoxQuestionItemCard,
  SubCategoryChip,
  SellerChatBubble,
  DefaultButton,
  SellerModal,
  SnackBar,
  SingleReplyBottomSheet,
  QuestionListHeader,
} from '@/components';

import { dummySubCategories, dummyChats, dummyChats2 } from './talkboxMockData';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { SubCategory, Chat } from '@/types/seller/TalkBox.types';
import { useSelectModeStore } from '@/store/talkBoxStore';

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

  const { mode, setMode, selectedIds, toggleSelectAll, setChatsByCategory } =
    useSelectModeStore();

  const allChatIds = dummyChats.map((chat) => chat.questionId);
  const isAllSelected = allChatIds.every((id) => selectedIds.includes(id));

  const headerRef = useRef<HTMLDivElement>(null);

  //임시
  useEffect(() => {
    setTabCounts({ pending: 2, answered: 3 });
    setChatsByCategory(dummySubCategories[0].text, dummyChats);
    setChatsByCategory(dummySubCategories[1].text, dummyChats2);
  }, []);

  useEffect(() => {
    if (sentCount) {
      setSnackBarState({
        isOpen: true,
        message: sentCount + '개의 답변이 정상적으로 전송되었습니다.',
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

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const PendingQuestionsTab = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [singleReplyChat, setSingleReplyChat] = useState<Chat | null>(null);
  const itemId = useParams().itemId;

  const navigate = useNavigate();

  const { mode, selectedIds, chatsByCategory, getChatsByCategory, setMode } =
    useSelectModeStore();
  console.log(chatsByCategory);

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    navigate(`${PATH.SELLER.base}/${PATH.SELLER.home.base}`); // 홈으로 이동
  };

  //임시
  useEffect(() => {
    setSelectedSubCategory(dummySubCategories[0]);
    setMode('default');
  }, []);

  return (
    <>
      {/* 카테고리 선택 */}
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
              chat={chat}
              isSelected={selectedIds.includes(chat.questionId)}
              selectedSubCategory={selectedSubCategory?.text}
              mode={mode}
              onSelectSingle={(selectedChat) => {
                setSingleReplyChat(selectedChat); // QuestionsListPage 상태 세팅
                setMode('single'); // BottomSheet 모드로 전환
              }}
            />
          ))}
        {/* 하단 버튼 */}
        {mode === 'select' && (
          <section className="bottom-bar flex w-full shrink-0 items-center justify-center gap-[.4375rem] bg-white px-5 py-2">
            <DefaultButton
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
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

      {/* 일괄 삭제 */}
      {isDeleteModalOpen && (
        <SellerModal
          text={`질문들(12개)을 삭제하시겠습니까? 한 번 삭제한 질문은 되돌릴 수 없습니다.`}
          leftButtonText="취소"
          rightButtonText="확인"
          leftButtonClick={() => setIsDeleteModalOpen(false)}
          rightButtonClick={handleConfirmDelete}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}

      {/* 질문 하나 선택시 */}
      {mode === 'single' && singleReplyChat && (
        <SingleReplyBottomSheet
          question={singleReplyChat}
          onClose={() => setMode('default')}
          itemId={itemId}
        />
      )}
    </>
  );
};

export const AnsweredQuestionsTab = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  const [singleReplyChat, setSingleReplyChat] = useState<Chat | null>(null);

  const { mode, selectedIds, chatsByCategory, getChatsByCategory, setMode } =
    useSelectModeStore();
  console.log(chatsByCategory);

  //임시
  useEffect(() => {
    setSelectedSubCategory(dummySubCategories[0]);
    setMode('answered');
  }, []);

  return (
    <>
      {/* 카테고리 선택 */}
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
              chat={chat}
              isSelected={selectedIds.includes(chat.questionId)}
              selectedSubCategory={selectedSubCategory?.text}
              mode={mode}
              onSelectSingle={(selectedChat) => {
                setSingleReplyChat(selectedChat); // QuestionsListPage 상태 세팅
                setMode('single'); // BottomSheet 모드로 전환
              }}
            />
          ))}
      </section>

      {/* 질문 하나 선택시 */}
      {/* TODO: faq 등록했을 경우, faq 등록하기 로직 추가 필요 */}
      {mode === 'single' && singleReplyChat && (
        <SingleReplyBottomSheet
          question={singleReplyChat}
          onClose={() => setMode('answered')}
        />
      )}
    </>
  );
};
