import { useState, useEffect, Suspense } from 'react';
import {
  QuestionChatBubble,
  PrevReplyBottomSheet,
  ChatBarTextArea,
  SellerReplyBubble,
  TalkBoxBottomSheetLayout,
  ItemClosedBanner,
  LoadingSpinner,
} from '@/components';

import { generatePath, useNavigate } from 'react-router-dom';
import { SELLER_ITEM_FAQ_REGISTER_PATH } from '@/utils/generatePath';

import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useSelectModeStore } from '@/store/talkBoxStore';
import { useBottomSheetContext } from '@/contexts/TalkBoxCategoryContext';
import { useItemOverviewStore } from '@/store/item/itemOverviewStore';

import { formatDate } from '@/utils/formatDate';
//api
import { useGetTagAnswers } from '@/services/talkBox/query/useGetTagAnswers';
import { useDeleteCategoryQuestions } from '@/services/talkBox/mutation/useDeleteCategoryQuestions';
import { usePostIndividualAnswer } from '@/services/talkBox/mutation/usePostIndividualAnswer';
import { useGetSingleQuestionAnswer } from '@/services/talkBox/query/useGetSingleQuestionAnswer';
const SingleQuestionBottomSheet = ({
  itemId,
  questionCategoryId,
}: {
  itemId: number;
  questionCategoryId: number;
}) => {
  const navigate = useNavigate();
  const [answerText, setAnswerText] = useState<string>('');

  const { showModal, hideModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { mode, setMode } = useSelectModeStore();
  const { setSingleQuestion, singleQuestion } = useBottomSheetContext();
  const { itemOverview } = useItemOverviewStore();

  const { data: fetchedDetail } = useGetSingleQuestionAnswer({
    itemId,
    questionCategoryId,
    questionTagId: singleQuestion?.questionDto.tagId ?? -1,
    questionId: singleQuestion?.questionDto.questionId ?? -1,
  });

  useEffect(() => {
    if (fetchedDetail) {
      setSingleQuestion(fetchedDetail);
    }
  }, [fetchedDetail]);

  const { data: prevAnswers } = useGetTagAnswers({
    itemId: itemId,
    questionCategoryId: questionCategoryId,
    questionTagId: singleQuestion?.questionDto.tagId ?? -1,
  });

  const handleAnswerSelect = (prevAnswer: string) => {
    setAnswerText(answerText + prevAnswer);
  };

  const handleReplySubmit = () => {
    if (!answerText) return;
    postAnswer(answerText);
  };

  const { mutate: postAnswer } = usePostIndividualAnswer({
    itemId,
    questionCategoryId,
    questionTagId: singleQuestion?.questionDto.tagId ?? -1,
    questionId: singleQuestion?.questionDto.questionId ?? -1,
    onSuccessCallback: () => {
      setAnswerText('');
    },
  });

  // 질문 삭제
  const { mutate: deleteQuestions } = useDeleteCategoryQuestions({
    itemId,
    questionCategoryId,
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
    if (
      !singleQuestion?.questionDto.questionId ||
      !singleQuestion?.questionDto.questionId
    )
      return;
    const selectedId: number = singleQuestion?.questionDto.questionId;
    const tagsToInvalidate: number = singleQuestion?.questionDto.tagId;
    deleteQuestions({
      questionIdList: [selectedId],
      tagIds: [tagsToInvalidate],
    });
  };

  const handleFaqRegister = (answer: string) => {
    if (!itemId) return;
    const path = generatePath(SELLER_ITEM_FAQ_REGISTER_PATH, {
      itemId: String(itemId),
    });
    navigate(path, {
      state: {
        talkBoxQ: singleQuestion?.questionDto.content,
        talkBoxA: answer,
      },
    });
  };

  const handleBottomSheetClose = () => {
    setMode('default');
    setSingleQuestion(null);
  };

  if (!singleQuestion) return;

  return (
    <>
      <TalkBoxBottomSheetLayout
        onClose={handleBottomSheetClose}
        isBottomSheetOpen={mode === 'single'}
        title={singleQuestion.questionDto.username + '님의 질문'}
      >
        {/* 바텀 시트 콘텐츠 */}
        <div className="scrollbar-hide mt-4 flex h-fit w-full flex-col items-center gap-6 overflow-auto pb-40">
          <div className="bg-grey06 caption-m flex w-fit items-center justify-center gap-2.5 rounded-xl px-3 py-1 text-white">
            {singleQuestion.questionDto.createdAt &&
              formatDate({
                date: new Date(singleQuestion.questionDto.createdAt),
                twoDigitYear: true,
              })}
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <QuestionChatBubble
              chat={singleQuestion.questionDto}
              onDelete={handleDelete}
            />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            {singleQuestion.answerListDto.answerViewList.length > 0 &&
              singleQuestion.answerListDto.answerViewList.map((answer) => (
                <SellerReplyBubble
                  question={singleQuestion.questionDto.content}
                  reply={answer.answerContent}
                  date={answer.answerTime}
                  questioner={singleQuestion.questionDto.username}
                  onClickFaq={() => handleFaqRegister(answer.answerContent)}
                  key={answer.answerId}
                  answerType={answer.answerType}
                />
              ))}
          </Suspense>

          <section className="bottom-bar flex w-full flex-col overflow-x-clip">
            {prevAnswers && itemOverview?.talkBoxOpenStatus !== 'CLOSED' && (
              <PrevReplyBottomSheet
                prevAnswers={prevAnswers}
                handleAnswerSelect={handleAnswerSelect}
              />
            )}
            {itemOverview?.talkBoxOpenStatus === 'CLOSED' && itemId && (
              <ItemClosedBanner itemId={String(itemId)} />
            )}
            <ChatBarTextArea
              text={answerText}
              setText={setAnswerText}
              handleReplySubmit={handleReplySubmit}
              isItemOpened={itemOverview?.talkBoxOpenStatus !== 'CLOSED'}
            />
          </section>
        </div>
      </TalkBoxBottomSheetLayout>
    </>
  );
};
export default SingleQuestionBottomSheet;
