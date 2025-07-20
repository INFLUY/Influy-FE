import cn from '@/utils/cn';
import ModalPortal from '@/components/common/ModalPortal';
import { useRef, useState } from 'react';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import {
  SellerChatBubble,
  PrevReplyBottomSheet,
  ChatBarTextArea,
  SellerModal,
  SellerReplyBubble,
} from '@/components';
import { Chat } from '@/types/seller/TalkBox.types';

const SingleReplyBottomSheet = ({
  question,
  onClose,
}: {
  question: Chat;
  onClose: () => void;
}) => {
  const handleBarRef = useRef<HTMLDivElement | null>(null);
  const isBottomSheetOpen = true;

  const [answerText, setAnswerText] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAnswerSelect = (prevAnswer: string) => {
    setAnswerText(answerText + prevAnswer);
  };

  const handleReplySubmit = () => {};

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // 실제 삭제 로직 작성
    console.log('삭제 확정');
    setIsDeleteModalOpen(false);
    onClose();
  };

  return (
    <ModalPortal>
      <div className="modal">
        <div
          className="flex h-screen w-screen max-w-[40rem] min-w-[20rem] flex-1 flex-col justify-end overflow-x-clip md:w-[28rem]"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <div
            className={cn(
              'flex h-[85%] flex-col items-center rounded-t-[1.5rem] bg-white shadow-[0rem_.25rem_4.325rem_0rem_rgba(0,0,0,0.35)]',
              { 'animate-slide-up': isBottomSheetOpen }
            )}
            onClick={(e) => e.stopPropagation()}
            ref={handleBarRef}
          >
            {/* 바텀 시트 헤더 */}
            <div className="border-grey02 relative box-border flex w-full cursor-pointer items-center justify-center border-b px-5 py-[15px]">
              <XIcon
                className="absolute left-5 h-6 w-6 cursor-pointer"
                onClick={onClose}
              />
              <span className="subhead-sb text-grey10">dpdms02님의 질문</span>
            </div>
            {/* 바텀 시트 콘텐츠 */}
            <div className="scrollbar-hide mt-4 flex h-fit w-full flex-col items-center gap-6 overflow-auto pb-40">
              <div className="bg-grey06 caption-m flex w-fit items-center justify-center gap-2.5 rounded-xl px-3 py-1 text-white">
                20.02.65(화)
              </div>
              <SellerChatBubble
                chat={question}
                selectedSubCategory="네이비"
                mode="single"
                onSelectSingle={() => {}}
                onDelete={handleDelete}
              />
              <SellerReplyBubble
                question="색상 옷 구매하려고 하는데요, 세탁할 때 물빠짐이 많이 심한 편인가요"
                reply="개별답변 말씀하신 블랙 컬러와 실제로 비교해보면, 이 제품은 아주 딥한 네이비 색상이에요 :) 거의 블랙에 가까운 어두운 남색이라서, 실내 조명이나 자연광에 따라 블랙처럼 보이기도 하고 살짝 푸른빛이 도는 느낌도 있어요! 구매에 참고가 되셨길 바라요🙏🏻💙"
                date="2025년 6월 19일 오후 4:05"
                questioner="dpdms02"
              />
              <section className="bottom-bar flex w-full flex-col overflow-x-clip">
                <PrevReplyBottomSheet handleAnswerSelect={handleAnswerSelect} />
                <ChatBarTextArea
                  text={answerText}
                  setText={setAnswerText}
                  handleReplySubmit={handleReplySubmit}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* 삭제 모달 */}
      {/* TODO: 삭제 후 스낵바 띄우기 */}
      {isDeleteModalOpen && (
        <SellerModal
          text="해당 질문을 삭제하시겠습니까?
한 번 삭제한 질문은 되돌릴 수 없습니다."
          description="*상대방은 삭제 여부를 알 수 없습니다."
          leftButtonText="취소"
          rightButtonText="확인"
          leftButtonClick={() => setIsDeleteModalOpen(false)}
          rightButtonClick={confirmDelete}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
    </ModalPortal>
  );
};
export default SingleReplyBottomSheet;
