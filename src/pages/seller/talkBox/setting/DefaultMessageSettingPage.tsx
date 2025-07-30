import { useEffect, useState } from 'react';
import { PATH } from '@/routes/path';
import {
  PageHeader,
  TalkBoxBottomItemCard,
  TipTooltip,
  PreviewButton,
  LimitedWideTextArea,
  TalkBoxBottomSheetLayout,
  TalkBoxSellerProfile,
  FirstChatBubble,
  DefaultButton,
} from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';

import { useNavigate, useParams } from 'react-router-dom';

//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { useGetTalkBoxDefaultComment } from '@/services/sellerItem/query/useGetTalkBoxDefaultComment';
import { usePatchTalkBoxDefaultComment } from '@/services/sellerItem/mutation/usePatchTalkBoxDefaultComment';

const DefaultMessageSettingPage = () => {
  const [defaultMessage, setDefaultMessage] = useState<string>('');

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { itemId } = useParams();

  // -- api
  // 하단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });

  const { data: commentData } = useGetTalkBoxDefaultComment(Number(itemId));

  const { mutate: updateComment } = usePatchTalkBoxDefaultComment(
    Number(itemId)
  );

  useEffect(() => {
    if (commentData?.talkBoxComment) {
      setDefaultMessage(commentData.talkBoxComment);
    }
  }, [commentData?.talkBoxComment]);

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
      >
        기본멘트 설정
      </PageHeader>
      <section className="mt-6 flex w-full flex-col gap-[.875rem] px-5">
        {/* 상단 제목 */}
        <div className="flex w-full justify-between">
          <h1 className="body1-b text-black">채팅방 기본멘트</h1>
          <PreviewButton onClickPreview={() => setIsBottomSheetOpen(true)} />
        </div>

        {/* 입력 칸 */}
        <LimitedWideTextArea
          maxLength={150}
          placeHolderContent="기본 채팅 멘트를 입력해주세요."
          text={defaultMessage}
          setText={setDefaultMessage}
        />
        <TipTooltip
          text={`고객이 톡박스에 입장했을 때\n가장 먼저 전송되는 안내 문구입니다.`}
        />
        <DefaultButton
          onClick={() => updateComment(defaultMessage)}
          disabled={commentData.talkBoxComment === defaultMessage}
        />
      </section>
      {itemOverview && (
        <TalkBoxBottomItemCard
          onCardClick={() => {}}
          itemName={itemOverview.itemName}
          tagline={itemOverview.tagline}
          mainImg={itemOverview.mainImg}
        />
      )}
      {isBottomSheetOpen && (
        <TalkBoxBottomSheetLayout
          onClose={() => setIsBottomSheetOpen(false)}
          title="미리보기"
          isBottomSheetOpen={isBottomSheetOpen}
        >
          <div className="mt-[2.0625rem] flex w-full flex-col gap-[1.875rem]">
            <TalkBoxSellerProfile
              profileImg={commentData.sellerProfileImg}
              username={commentData.sellerUsername}
              nickname={commentData.sellerNickname}
            />
            <FirstChatBubble
              profileImg={commentData.sellerProfileImg}
              username={commentData.sellerUsername}
              defaultMessage={defaultMessage}
            />
          </div>
        </TalkBoxBottomSheetLayout>
      )}
    </>
  );
};
export default DefaultMessageSettingPage;
