import {
  PageHeader,
  Tab,
  Tabs,
  LoadingSpinner,
  TalkBoxSellerProfile,
  FirstChatBubble,
  UserChatBarTextArea,
  SellerReplyBubble,
} from '@/components';
import { TalkBoxBottomItemCard } from '@/components/user/talkBox/TalkBoxItemCard';
import { CategorySelectWrapper } from '@/components/user/talkBox/CategorySelectWrapper';
import { UserChatBubbleUserView } from '@/components/user/talkBox/ChatBubble';
// type
import { TalkBoxCommentDTO } from '@/types/common/ItemType.types';
import { UserCategoryDTO } from '@/types/seller/TalkBox.types';

//path
import { useNavigate, useParams } from 'react-router-dom';
// icon
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
// import { useGetTalkBoxDefaultComment } from '@/services/sellerItem/query/useGetTalkBoxDefaultComment';
import { usePostUserQuestion } from '@/services/talkBox/mutation/usePostUserQuestion';
import { useGetUserCategoryList } from '@/services/talkBox/query/useGetUserCategoryList';
import { Suspense, useState } from 'react';

const UserChatPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<UserCategoryDTO | null>(null);
  const navigate = useNavigate();
  const { itemId, marketId } = useParams();

  const { itemOverview } = useItemOverview({
    sellerId: Number(marketId),
    itemId: Number(itemId),
  });
  const commentData: TalkBoxCommentDTO = {
    sellerId: 5,
    sellerProfileImg: null,
    sellerUsername: 'seojunghii',
    sellerNickname: '서정',
    createdAt: '2025-08-03T12:32:48.708228832',
    talkBoxComment: '안녕',
  };

  const { data: categoryList } = useGetUserCategoryList(Number(itemId));

  // 질문 전송
  const { mutate: postAnswer, isPending } = usePostUserQuestion({
    itemId: Number(itemId),
    questionCategoryId: selectedCategory?.questionCategoryId || -1,
    onSuccessCallback: () => {
      setQuestionText('');
      setSelectedCategory(null);
    },
  });

  const handleQuestionSubmit = () => {
    if (
      !questionText ||
      questionText.trim().length === 0 ||
      selectedCategory === null ||
      isPending
    )
      return;
    postAnswer(questionText);
  };
  return (
    <>
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
        rightIcons={[<KebabIcon />]}
        additionalStyles="bg-grey01 border-0"
      >
        <div className="absolute left-[3.75rem] flex flex-col items-start justify-between">
          <span className="body2-sb text-grey10 leading-[130%]">소현소현</span>
          <span className="caption-small-m text-grey06 leading-[130%]">
            @xt
          </span>
        </div>
      </PageHeader>
      <section className="scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-x-hidden overflow-y-auto bg-white pt-11">
        {itemOverview && (
          <TalkBoxBottomItemCard
            itemName={itemOverview.itemName}
            tagline={itemOverview.tagline}
            mainImg={itemOverview.mainImg}
            onItemCardClick={() => {}}
          />
        )}
        <div className="flex flex-col gap-[1.875rem]">
          {/* 첫 메세지 */}
          <div className="mt-5 flex w-full flex-col gap-[1.75rem]">
            <TalkBoxSellerProfile
              profileImg={commentData.sellerProfileImg}
              username={commentData.sellerUsername}
              nickname={commentData.sellerNickname}
            />
            <FirstChatBubble
              profileImg={commentData.sellerProfileImg}
              username={commentData.sellerUsername}
              defaultMessage={commentData.talkBoxComment}
            />
          </div>
          <UserChatBubbleUserView date="2025-08-03T12:32:48.708228832" />{' '}
          <SellerReplyBubble
            questioner={commentData.sellerUsername}
            question={commentData.talkBoxComment}
            reply={commentData.talkBoxComment}
            date={commentData.createdAt}
            answerType="INDIVIDUAL"
            isSellerMode={false}
            profileImg="/img1.png"
          />
        </div>
        <div className="bottom-bar flex w-full flex-col">
          <Suspense fallback={<LoadingSpinner />}>
            <CategorySelectWrapper
              viewList={categoryList.viewList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Suspense>
          <UserChatBarTextArea
            text={questionText}
            setText={setQuestionText}
            handleSubmit={handleQuestionSubmit}
            isCategorySelected={selectedCategory !== null}
            isPending={isPending}
          />
        </div>
      </section>
    </>
  );
};

export default UserChatPage;
