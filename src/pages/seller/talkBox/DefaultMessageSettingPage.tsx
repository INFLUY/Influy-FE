import { useState } from 'react';
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
} from '@/components';
import { dummySellerInfo } from '../item/ItemDetailDummyData';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';

import { useNavigate } from 'react-router-dom';
const DefaultMessageSettingPage = () => {
  const [defaultMessage, setDefaultMessage] = useState<string>('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();

  //임시
  const sellerInfo = dummySellerInfo;

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
      </section>
      <TalkBoxBottomItemCard
        onCardClick={() => {}}
        title="[11차] 워크팬츠_navy"
        tagline="오버핏이 감각적인 워크팬츠, 제작템입니다. 글글글글글글글"
        imgUrl=""
      />
      {isBottomSheetOpen && (
        <TalkBoxBottomSheetLayout
          onClose={() => setIsBottomSheetOpen(false)}
          title="미리보기"
          isBottomSheetOpen={isBottomSheetOpen}
        >
          <div className="mt-[2.0625rem] flex w-full flex-col gap-[1.875rem]">
            <TalkBoxSellerProfile
              profileImg={sellerInfo.profileImg}
              username={sellerInfo.nickname}
              nickname={sellerInfo.instagram}
            />
            <FirstChatBubble
              profileImg={sellerInfo.profileImg}
              username={sellerInfo.nickname}
              defaultMessage={defaultMessage}
            />
          </div>
        </TalkBoxBottomSheetLayout>
      )}
    </>
  );
};
export default DefaultMessageSettingPage;
