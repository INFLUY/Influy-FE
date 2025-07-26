import { PageHeader, ToggleButton } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useState } from 'react';

const NotificationSettingsPage = () => {
  const navigate = useNavigate();
  const [likedProductNotification, setLikedProductNotification] =
    useState<boolean>(false);
  const [chatBotNotification, setChatBotNotification] =
    useState<boolean>(false);

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
        알림 설정
      </PageHeader>
      <section className="flex flex-1 flex-col gap-11 px-5 pt-7">
        <article className="flex justify-between">
          <span className="body1-m text-grey10">찜한 상품 시작 알림</span>
          <ToggleButton
            name="찜한 상품 시작 알림"
            isChecked={likedProductNotification}
            setIsChecked={setLikedProductNotification}
          />
        </article>
        <article className="flex justify-between">
          <span className="body1-m text-grey10">챗봇 문의 알림</span>
          <ToggleButton
            name="챗봇 문의 알림"
            isChecked={chatBotNotification}
            setIsChecked={setChatBotNotification}
          />
        </article>
      </section>
    </div>
  );
};

export default NotificationSettingsPage;
