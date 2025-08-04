import {
  PageHeader,
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
import { usePostUserQuestion } from '@/services/talkBox/mutation/usePostUserQuestion';
import { useGetUserCategoryList } from '@/services/talkBox/query/useGetUserCategoryList';
import { Suspense, useState, useRef, useEffect } from 'react';
import { useGetUserTalkBoxHistory } from '@/services/talkBox/query/useGetUserTalkBoxHistory';
import { useGetSellerOverview } from '@/services/seller/query/useGetSellerOverview';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const UserChatPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<UserCategoryDTO | null>(null);
  const navigate = useNavigate();
  const { itemId, marketId } = useParams();

  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);
  const topObserverRef = useRef<HTMLDivElement | null>(null);
  const [_, setBottomBarHeight] = useState<number>(0);

  useEffect(() => {
    const el = bottomBarRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.getBoundingClientRect().height;
      setBottomBarHeight(height);
      document.documentElement.style.setProperty(
        '--bottomBarHeight',
        `${height}px`
      );
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    updateHeight(); // 초기 설정

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  const { itemOverview } = useItemOverview({
    sellerId: Number(marketId),
    itemId: Number(itemId),
  });

  // api
  // 카테고리
  const { data: categoryList } = useGetUserCategoryList(Number(itemId));

  // 이전 질문
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetUserTalkBoxHistory(Number(itemId), 4);

  const chatList = data?.pages.flatMap((page) => page?.chatList) ?? [];
  useInfiniteScroll({
    targetRef: topObserverRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold: 1,
  });

  useEffect(() => {
    if (!bottomObserverRef.current) return;
    bottomObserverRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);
  // 질문 전송
  const { mutate: postAnswer, isPending } = usePostUserQuestion({
    itemId: Number(itemId),
    questionCategoryId: selectedCategory?.questionCategoryId || -1,
    onSuccessCallback: () => {
      setQuestionText('');
      setSelectedCategory(null);
    },
  });

  //셀러 정보
  const { data: sellerInfo } = useGetSellerOverview(Number(marketId));

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
          <Suspense fallback={null}>
            <span className="body2-sb text-grey10 leading-[130%]">
              {sellerInfo?.sellerNickname}
            </span>
            <span className="caption-small-m text-grey06 leading-[130%]">
              @{sellerInfo?.sellerUsername}
            </span>
          </Suspense>
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
        <Suspense fallback={<LoadingSpinner />}>
          <section className="flex flex-col pb-[var(--bottomBarHeight)]">
            <div ref={topObserverRef} className="bg-grey07 h-[1px] w-full" />
            <div className="flex flex-col-reverse gap-[1.875rem] pt-5">
              {chatList &&
                chatList.map((chat, index) => {
                  if (chat?.type === 'Default Message') {
                    return (
                      <div
                        className="flex w-full flex-col gap-[1.875rem]"
                        key={`default-${index}`}
                      >
                        <Suspense fallback={<LoadingSpinner />}>
                          <TalkBoxSellerProfile
                            profileImg={sellerInfo?.profileImg || null}
                            username={sellerInfo?.sellerUsername ?? ''}
                            nickname={sellerInfo?.sellerNickname ?? ''}
                          />
                        </Suspense>
                        <FirstChatBubble
                          profileImg={sellerInfo?.profileImg || null}
                          username={sellerInfo?.sellerUsername ?? ''}
                          defaultMessage={chat.content}
                        />
                      </div>
                    );
                  }

                  if (chat?.type === 'Q') {
                    return (
                      <UserChatBubbleUserView
                        key={`question-${chat.id}`}
                        content={chat.content}
                        categoryName={chat.categoryName}
                        date={chat.createdAt}
                      />
                    );
                  }

                  if (chat?.type === 'A') {
                    return (
                      <SellerReplyBubble
                        key={`answer-${chat.id}`}
                        questioner={sellerInfo?.sellerNickname ?? ''}
                        question={chat.questionContent}
                        reply={chat.content}
                        date={chat.createdAt}
                        answerType={chat.answerType}
                        isSellerMode={false}
                        profileImg={sellerInfo?.profileImg}
                      />
                    );
                  }

                  return null;
                })}
            </div>
            <div ref={bottomObserverRef} className="bg-grey07 h-[1px] w-full" />
          </section>
        </Suspense>

        <div className="bottom-bar flex w-full flex-col" ref={bottomBarRef}>
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
