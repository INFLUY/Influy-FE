import {
  PageHeader,
  TalkBoxQuestionItemCard,
  QuestionChatBubble,
  SellerChatBarTextArea,
  PrevReplyBottomSheet,
  SellerModal,
  LoadingSpinner,
} from '@/components';

import { useState, useEffect, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';

import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import HomeIcon from '@/assets/icon/common/HomeNavbar.svg?react';

//type
import { QuestionDTO } from '@/types/seller/TalkBox.types';

import { useStrictId } from '@/hooks/auth/useStrictId';

//store
import { useSelectModeStore } from '@/store/talkBoxStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useTalkBoxCategoryStore } from '@/store/talkBoxStore';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetTagAnswers } from '@/services/talkBox/query/useGetTagAnswers';
import { usePostBulkAnswer } from '@/services/talkBox/mutation/usePostBulkAnswer';

const BulkReplyPage = () => {
  const navigate = useNavigate();
  const [answerText, setAnswerText] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSnackbar } = useSnackbarStore();
  const { selectedCategoryName } = useTalkBoxCategoryStore();

  const { itemId, categoryId } = useParams();
  const { sellerId } = useStrictId();

  const getTagInfo = (
    selectedQuestions: QuestionDTO[]
  ): { mostFrequentTagId: number; totalTagsList: number[] } | null => {
    if (selectedQuestions.length === 0) return null;

    const countMap = new Map<number, number>();
    let mostFrequentTagId: number = 0;
    let maxCount = 0;

    for (const { tagId } of selectedQuestions) {
      const currentCount = (countMap.get(tagId) || 0) + 1;
      countMap.set(tagId, currentCount);

      if (currentCount > maxCount) {
        maxCount = currentCount;
        mostFrequentTagId = tagId;
      }
    }
    const totalTagsList = Array.from(countMap.keys());

    return { mostFrequentTagId, totalTagsList };
  };

  const { selectedQuestions, setMode } = useSelectModeStore();
  const tagInfo = getTagInfo(selectedQuestions);

  useEffect(() => {
    setMode('bulk-reply');
  }, []);

  const { data: prevAnswers, isPending: isPrevAnswersPending } =
    useGetTagAnswers({
      itemId: Number(itemId),
      questionCategoryId: Number(categoryId),
      questionTagId: Number(tagInfo?.mostFrequentTagId),
    });

  // 상단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: Number(sellerId),
    itemId: Number(itemId),
  });

  const handleAnswerSelect = (prevAnswer: string) => {
    setAnswerText(answerText + prevAnswer);
  };

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    useSelectModeStore.persist.clearStorage();
    navigate(`${PATH.SELLER.BASE}/${PATH.SELLER.HOME.BASE}`);
  };

  const { mutate: postBulkAnswer, isPending: isAnswerPending } =
    usePostBulkAnswer({
      itemId: Number(itemId),
      questionCategoryId: Number(categoryId),
      tagsToInvalidate: tagInfo?.totalTagsList,
      onSuccessCallback: (count) => {
        navigate(`../`, {
          replace: true,
        });
        showSnackbar(`${count}개의 답변이 정상적으로 전송되었습니다.`);
      },
    });

  const handleReplySubmit = () => {
    if (answerText.length === 0 || answerText.trim().length === 0) return;
    postBulkAnswer({
      questionIdList: selectedQuestions.map((q) => q.questionId),
      answerContent: answerText,
    });
  };

  return (
    <section className="scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-y-auto bg-white pt-11">
      <PageHeader
        leftIcons={[
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(`../`, { replace: true })}
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
        {itemOverview && (
          <TalkBoxQuestionItemCard
            itemName={itemOverview.itemName}
            tagline={itemOverview.tagline}
            mainImg={itemOverview.mainImg}
          />
        )}
        <p className="subhead-sb py-3">
          이 상품의 <span className="text-sub">{selectedCategoryName}</span>{' '}
          관련 질문 {selectedQuestions.length}개에 대한
          <br />
          일괄 답변을 작성해주세요.
        </p>
      </article>

      {/* 질문 리스트 */}
      <section className="mt-[1.4375rem] mb-20 flex w-full flex-col gap-5 pb-22">
        {selectedQuestions &&
          selectedQuestions.map((q) => (
            <QuestionChatBubble key={q.questionId} chat={q} />
          ))}
      </section>

      {/* 하단 이전 답변 및 채팅바 */}
      <section className="bottom-bar flex w-full flex-col overflow-x-clip">
        <Suspense fallback={<LoadingSpinner />}>
          {prevAnswers && prevAnswers.answerList.length > 0 && (
            <PrevReplyBottomSheet
              prevAnswers={prevAnswers}
              handleAnswerSelect={handleAnswerSelect}
            />
          )}
        </Suspense>

        <SellerChatBarTextArea
          text={answerText}
          setText={setAnswerText}
          handleReplySubmit={handleReplySubmit}
          isItemOpened={itemOverview?.talkBoxOpenStatus !== 'CLOSED'}
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
      {(isPrevAnswersPending || isAnswerPending) && <LoadingSpinner />}
    </section>
  );
};

export default BulkReplyPage;
