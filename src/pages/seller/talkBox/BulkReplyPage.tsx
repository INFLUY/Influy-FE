import {
  PageHeader,
  TalkBoxQuestionItemCard,
  SellerChatBubble,
  ChatBarTextArea,
  PrevReplyBottomSheet,
  SellerModal,
} from '@/components';
import { Chat } from '@/types/seller/TalkBox.types';

import { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  generatePath,
} from 'react-router-dom';
import { PATH } from '@/routes/path';

import { dummyChats } from './talkboxMockData';

import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';

const BulkReplyPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<Chat[]>([]);
  const [answerText, setAnswerText] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnswerSelect = (prevAnswer: string) => {
    setAnswerText(answerText + prevAnswer);
  };

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    navigate(`${PATH.SELLER.base}/${PATH.SELLER.home.base}`); // 홈으로 이동
  };

  const { categoryId, itemId } = useParams();
  console.log('카테', categoryId, itemId);

  const handleReplySubmit = () => {
    if (answerText.length === 0) return;
    const sentCount = selectedChat.length;
    const path = generatePath(
      `${PATH.SELLER.base}/${PATH.SELLER.talkBox.base}/${PATH.SELLER.talkBox.item.base}/${PATH.SELLER.talkBox.item.category.base}/${PATH.SELLER.talkBox.item.category.tabs.pending}`,
      {
        itemId: String(itemId),
        categoryId: String(categoryId),
      }
    );
    navigate(path, {
      state: { sentCount },
    });
  };

  //임시
  useEffect(() => {
    setSelectedChat(dummyChats);
  }, []);
  return (
    <section className="scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-y-auto bg-white">
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
            onClick={() => setIsModalOpen(true)}
          />,
        ]}
      >
        일괄답변
      </PageHeader>
      <article className="bg-grey01 flex w-full flex-col gap-2.5 px-5 pt-4">
        <TalkBoxQuestionItemCard
          title="헤이드 리본 레이어드 티"
          tagline="[소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템![소현X아로셀] 제작 살 안타템!"
          imgUrl="/img1.png"
        />
        <p className="subhead-sb py-3">
          이 상품의 <span className="text-sub">색상</span> 관련 질문{' '}
          {selectedChat.length}개에 대한
          <br />
          일괄 답변을 작성해주세요.
        </p>
      </article>
      <section className="mt-[1.4375rem] flex w-full flex-col gap-5 pb-22">
        {selectedChat &&
          selectedChat.map((chat) => (
            <SellerChatBubble
              key={chat.questionId}
              questionId={chat.questionId}
              content={chat.content}
              createdAt={chat.createdAt}
              profileImg={chat.profileImg}
              username={chat.username}
              askedCount={chat.askedCount}
              isChecked={chat.isChecked}
              selectedSubCategory="네이비"
              isSelected={true}
            />
          ))}
      </section>
      <section className="bottom-bar flex w-full flex-col overflow-x-clip">
        <PrevReplyBottomSheet handleAnswerSelect={handleAnswerSelect} />
        <ChatBarTextArea
          text={answerText}
          setText={setAnswerText}
          handleReplySubmit={handleReplySubmit}
        />
      </section>
      {isModalOpen && (
        <SellerModal
          text="일괄답변을 그만두시겠습니까?"
          leftButtonText="취소"
          rightButtonText="확인"
          leftButtonClick={() => setIsModalOpen(false)}
          rightButtonClick={handleConfirmExit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default BulkReplyPage;
