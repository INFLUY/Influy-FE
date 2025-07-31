import { useState } from 'react';
import { PATH } from '@/routes/path';
import { PageHeader, TalkBoxBottomItemCard, ToggleButton } from '@/components';
import ArrowLeftIcon from '@/assets/icon/common/ArrowLeftIcon.svg?react';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

import { useNavigate, useParams } from 'react-router-dom';
//api
import { useItemOverview } from '@/services/sellerItem/query/useGetItemOverview';
import { usePostTalkBoxOpenStatus } from '@/services/sellerItem/mutation/usePostTalkBoxOpenStatus';
const TalkBoxSettingPage = () => {
  const navigate = useNavigate();

  const handleToggleClick = () => {
    updateStatus();
  };

  const { itemId } = useParams();

  // 하단 상품 정보
  const { itemOverview } = useItemOverview({
    sellerId: 2, // TODO: 수정 필요
    itemId: Number(itemId),
  });

  // 톡박스 활성화 상태 업데이트
  const { mutate: updateStatus } = usePostTalkBoxOpenStatus({
    itemId: Number(itemId),
    openStatus:
      itemOverview?.talkBoxOpenStatus === 'OPENED' ? 'CLOSED' : 'OPENED',
  });

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
        톡박스 설정
      </PageHeader>
      <section className="mt-6 flex w-full flex-col gap-[2.75rem] px-5">
        <article
          className="flex items-center justify-between gap-4"
          onClick={() => {
            navigate(PATH.SELLER.TALKBOX.ITEM.SETTING.DEFAULT_MESSAGE);
          }}
        >
          <div className="flex flex-col gap-1">
            <h2 className="body1-m text-grey10">기본멘트 설정</h2>
            <span className="body2-m text-grey07">
              일반 사용자에게 보이는 기본 채팅 멘트를 설정합니다.
            </span>
          </div>
          <ArrowRightIcon className="text-grey07" role="button" />
        </article>

        <article
          className="flex items-center justify-between gap-4"
          onClick={() => {}}
        >
          <div className="flex flex-col gap-1">
            <h2 className="body1-m text-grey10">톡박스 활성화</h2>
            <span className="body2-m text-grey07">
              비활성화로 전환 시, 사용자들이 질문을 남길 수 없고 답변 또한 전송
              불가합니다.
            </span>
          </div>
          <ToggleButton
            name="톡박스 활성화"
            isChecked={itemOverview?.talkBoxOpenStatus === 'OPENED'}
            setIsChecked={handleToggleClick}
          />
        </article>
      </section>
      {/* TODO: opened 처리 */}
      {itemOverview && (
        <TalkBoxBottomItemCard
          onCardClick={() => {}}
          itemName={itemOverview.itemName}
          tagline={itemOverview.tagline}
          mainImg={itemOverview.mainImg}
        />
      )}
    </>
  );
};

export default TalkBoxSettingPage;
