import { useState, useEffect } from 'react';
import {
  SubCategoryChip,
  SellerChatBubble,
  SingleReplyBottomSheet,
} from '@/components';

import { dummySubCategories } from '../talkboxMockData';
import { SubCategory, Chat } from '@/types/seller/TalkBox.types';
import { useSelectModeStore } from '@/store/talkBoxStore';

export const AnsweredQuestionsTab = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
  const [singleReplyChat, setSingleReplyChat] = useState<Chat | null>(null);

  const { mode, selectedIds, chatsByCategory, getChatsByCategory, setMode } =
    useSelectModeStore();

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
