import { useState } from 'react';
import {
  QuestionChatBubble,
  PrevReplyBottomSheet,
  ChatBarTextArea,
  SellerReplyBubble,
  TalkBoxBottomSheetLayout,
} from '@/components';
import { QuestionDTO } from '@/types/seller/TalkBox.types';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import {
  useSelectModeStore,
  useTalkBoxQuestionStore,
} from '@/store/talkBoxStore';

import { formatDate } from '@/utils/formatDate';
//api
import { useGetTagAnswers } from '@/services/talkBox/query/useGetTagAnswers';
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';

const SingleQuestionBottomSheet = ({
  singleQuestion,
  onClose,
  itemId,
  categoryId,
  tagId,
}: {
  singleQuestion: QuestionDTO;
  onClose: () => void;
  itemId: number;
  categoryId: number;
  tagId: number;
}) => {
  const navigate = useNavigate();
  const isBottomSheetOpen = true;

  const { showModal, hideModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { setMode } = useSelectModeStore();

  const { data: prevAnswers } = useGetTagAnswers({
    itemId: itemId,
    questionCategoryId: categoryId,
    questionTagId: tagId,
  });

  const [answerText, setAnswerText] = useState<string>('');

  const handleAnswerSelect = (prevAnswer: string) => {
    setAnswerText(answerText + prevAnswer);
  };

  const handleReplySubmit = () => {};

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

  // 질문 삭제 버튼
  const handleDelete = () => {
    showModal({
      text: `해당 질문을 삭제하시겠습니까?\n한 번 삭제한 질문은 되돌릴 수 없습니다.`,
      description: '*상대방은 삭제 여부를 알 수 없습니다.',
      leftButtonClick: () => hideModal(),
      rightButtonClick: () => handleDeleteConfirm(),
    });
  };

  //질문 삭제 확정
  const handleDeleteConfirm = () => {
    const selectedId: number = singleQuestion.questionId;
    const tagsToInvalidate: number = singleQuestion.tagId;
    deleteQuestions({
      questionIdList: [selectedId],
      tagIds: [tagsToInvalidate],
    });
  };

  const handleFaqRegister = () => {
    // TODO: 에러 처리
    // if (!itemId) return;
    // const path = generatePath(
    //   `${PATH.SELLER.base}/${PATH.SELLER.items.base}/${PATH.SELLER.items.item.administration.base}/${PATH.SELLER.items.item.administration.faq.base}/${PATH.SELLER.items.item.administration.faq.registration.base}`,
    //   { itemId: String(itemId) }
    // );
    // navigate(path, {
    //   state: {
    //     talkBoxQ: question.content,
    //     talkBoxA: '답변답변',
    //     talkBoxCategoryId: 1,
    //   }, // TODO: 답변, 카테고리 수정
    // });
  };

  return (
    <>
      <TalkBoxBottomSheetLayout
        onClose={onClose}
        isBottomSheetOpen={isBottomSheetOpen}
        title={singleQuestion.username + '님의 질문'}
      >
        {/* 바텀 시트 콘텐츠 */}
        <div className="scrollbar-hide mt-4 flex h-fit w-full flex-col items-center gap-6 overflow-auto pb-40">
          <div className="bg-grey06 caption-m flex w-fit items-center justify-center gap-2.5 rounded-xl px-3 py-1 text-white">
            {formatDate({
              date: new Date(singleQuestion.createdAt),
              twoDigitYear: true,
            })}
          </div>
          <QuestionChatBubble chat={singleQuestion} onDelete={handleDelete} />
          <SellerReplyBubble
            question={singleQuestion.content}
            reply="개별답변 말씀하신 블랙 컬러와 실제로 비교해보면, 이 제품은 아주 딥한 네이비 색상이에요 :) 거의 블랙에 가까운 어두운 남색이라서, 실내 조명이나 자연광에 따라 블랙처럼 보이기도 하고 살짝 푸른빛이 도는 느낌도 있어요! 구매에 참고가 되셨길 바라요🙏🏻💙"
            date="2025년 6월 19일 오후 4:05"
            questioner="dpdms02"
            onClickFaq={handleFaqRegister}
          />
          <section className="bottom-bar flex w-full flex-col overflow-x-clip">
            {prevAnswers && (
              <PrevReplyBottomSheet
                prevAnswers={prevAnswers}
                handleAnswerSelect={handleAnswerSelect}
              />
            )}
            <ChatBarTextArea
              text={answerText}
              setText={setAnswerText}
              handleReplySubmit={handleReplySubmit}
            />
          </section>
        </div>
      </TalkBoxBottomSheetLayout>
    </>
  );
};
export default SingleQuestionBottomSheet;
