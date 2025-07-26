import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  SubCategoryChip,
  SellerChatBubble,
  DefaultButton,
  SellerModal,
  SingleReplyBottomSheet,
} from '@/components';

import { dummySubCategories } from '../talkboxMockData';
import { SubCategory, Chat } from '@/types/seller/TalkBox.types';
import { useSelectModeStore } from '@/store/talkBoxStore';
import { PATH } from '@/routes/path';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

// api
import { useGetCategoryQuestions } from '@/services/talkBox/query/useGetAllQuestions';

export const PendingQuestionsTab = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [singleReplyChat, setSingleReplyChat] = useState<Chat | null>(null);
  const { itemId, categoryId } = useParams();

  const navigate = useNavigate();

  const { mode, selectedIds, chatsByCategory, getChatsByCategory, setMode } =
    useSelectModeStore();

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    navigate(`${PATH.SELLER.base}/${PATH.SELLER.home.base}`); // 홈으로 이동
  };

  //임시
  useEffect(() => {
    setSelectedSubCategory(dummySubCategories[0]);
    setMode('default');
  }, []);

  //api
  // TODO: 인피니트 쿼리 적용 및 되는지 확인 필요
  const {
    data: allQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCategoryQuestions({
    questionCategoryId: Number(categoryId),
    isAnswered: false,
  });
  console.log('data', allQuestions);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

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
