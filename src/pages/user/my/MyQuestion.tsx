import { PageHeader } from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg?react';
import { PATH } from '@/routes/path';
import { useGetUserTalkboxList } from '@/services/talkBox/mutation/useGetUserTalkboxList';
import { useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { UserMyQuestions } from '@/types/common/TalkBox.types';
import { formatRelativeDate } from '@/utils/formatDate';
import cn from '@/utils/cn';

const MyQuestion = () => {
  const navigate = useNavigate();

  const {
    data: talkboxList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserTalkboxList();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const myQuestions = talkboxList?.pages
    .flatMap((page) => page?.talkboxList ?? [])
    .filter(Boolean) as UserMyQuestions[];

  const handleQuestionClick = ({
    sellerId,
    itemId,
  }: {
    sellerId: number;
    itemId: number;
  }) => {
    const path = generatePath(
      `${PATH.MARKET.BASE}/${PATH.MARKET.DETAIL.BASE}/${PATH.MARKET.DETAIL.ITEM.BASE}/${PATH.MARKET.DETAIL.ITEM.ITEM_ID}/${PATH.MARKET.DETAIL.ITEM.TALK_BOX}`,
      { marketId: String(sellerId), itemId: String(itemId) }
    );
    navigate(path);
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader
        leftIcons={[
          <ArrowIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={() => navigate(-1)}
          />,
        ]}
      >
        내가 한 질문
      </PageHeader>
      <section className="bg-grey01 flex flex-1 flex-col py-[.8125rem]">
        {myQuestions && myQuestions.length > 0 ? (
          <>
            {myQuestions?.map((myQuestion) => (
              <div
                key={myQuestion.itemId}
                aria-label="톡박스로 이동"
                role="button"
                className="flex h-[6.25rem] items-center gap-[.625rem] px-3 py-4"
                onClick={() =>
                  handleQuestionClick({
                    sellerId: myQuestion.sellerId,
                    itemId: myQuestion.itemId,
                  })
                }
              >
                <ProfileIcon className="h-[3.75rem] w-[3.75rem] shrink-0" />
                <span className="flex w-full flex-col gap-[.1563rem]">
                  <span className="body2-m line-clamp-1 flex w-full flex-1 items-start justify-between text-black">
                    {myQuestion.sellerNickname}
                  </span>
                  <span className="text-grey08 body2-r line-clamp-2">
                    {myQuestion.lastChatContent}
                  </span>
                </span>

                <div
                  className={cn(
                    'flex h-full shrink-0 justify-between gap-[.625rem]',
                    {
                      'items-start': myQuestion.uncheckedCnt === 0,
                    }
                  )}
                >
                  <span className="caption-m text-grey07 shrink-0">
                    {formatRelativeDate(myQuestion.lastChatTime)}
                  </span>
                  <div className="flex h-full shrink-0 flex-col items-end justify-between">
                    <img
                      src={myQuestion.itemMainPic ?? undefined}
                      alt={myQuestion.itemTitle + ' 썸네일'}
                      className="bg-grey03 h-[2.125rem] w-[2.125rem] object-cover"
                    />
                    {myQuestion.uncheckedCnt > 0 && (
                      <div className="bg-main caption-m h-fit w-fit min-w-[1.375rem] rounded-[1.5625rem] px-[.4375rem] py-[.1875rem] text-center text-white">
                        {myQuestion.uncheckedCnt}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {hasNextPage && <div ref={observerRef} className="h-4 w-full" />}
          </>
        ) : (
          <div className="text-grey09 body2-m flex flex-1 items-center justify-center">
            아직 질문하지 않았어요
          </div>
        )}
      </section>
    </div>
  );
};

export default MyQuestion;
