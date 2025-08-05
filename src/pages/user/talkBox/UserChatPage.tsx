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
import { useGetSellerOverview } from '@/services/seller/query/useGetSellerOverview';
import { useGetUserTalkBoxHistory } from '@/services/talkBox/query/useGetUserTalkBoxHistory';

import { Suspense, useState, useRef, useEffect, useLayoutEffect } from 'react';

//hooks store
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useSnackbarStore } from '@/store/snackbarStore';

const UserChatPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<UserCategoryDTO | null>(null);
  const [isFirstEntry, setIsFirstEntry] = useState<boolean>(true);
  const navigate = useNavigate();
  const { itemId, marketId } = useParams();

  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const bottomObserverRef = useRef<HTMLDivElement | null>(null);
  const topObserverRef = useRef<HTMLDivElement | null>(null);
  const chatWrapperRef = useRef<HTMLDivElement | null>(null);

  const { showSnackbar } = useSnackbarStore();

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
    useGetUserTalkBoxHistory(Number(itemId), 6);

  const chatList = data?.pages.flatMap((page) => page?.chatList) ?? [];
  useInfiniteScroll({
    targetRef: topObserverRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold: 1,
  });
  // 페이지 첫 진입 및 chatList 변경 시 자동으로 맨 아래로 스크롤
  useLayoutEffect(() => {
    if (chatWrapperRef.current && chatList.length > 0 && isFirstEntry) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      setIsFirstEntry(false);
    }
  }, [chatList]);

  // 질문 전송
  const { mutate: postAnswer, isPending } = usePostUserQuestion({
    itemId: Number(itemId),
    questionCategoryId: selectedCategory?.questionCategoryId || -1,
    onSuccessCallback: () => {
      setQuestionText('');
      setSelectedCategory(null);
      if (chatWrapperRef.current) {
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      }
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

  //셀러 정보
  const { data: sellerInfo } = useGetSellerOverview(Number(marketId));

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
        rightIcons={[
          <KebabIcon onClick={() => showSnackbar('준비중입니다')} />,
        ]}
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
      <section className="relative flex h-full w-full flex-1 flex-col bg-white pt-11">
        {itemOverview && (
          <TalkBoxBottomItemCard
            itemName={itemOverview.itemName}
            tagline={itemOverview.tagline}
            mainImg={itemOverview.mainImg}
            onItemCardClick={() => {
              navigate(`..`, { replace: true });
            }}
          />
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <section
            className="scrollbar-hide flex w-full flex-col overflow-x-hidden overflow-y-auto pb-[var(--bottomBarHeight)]"
            ref={chatWrapperRef}
          >
            {chatList.length > 0 && (
              <div ref={topObserverRef} className="h-[.0625rem] w-full" />
            )}
            <div className="flex w-full flex-col-reverse gap-[1.875rem] pt-5">
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
            <div ref={bottomObserverRef} className="h-[.0625rem] w-full" />
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
