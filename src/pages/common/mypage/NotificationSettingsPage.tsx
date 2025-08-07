import { BackButton, PageHeader, ToggleButton } from '@/components';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PATH } from '@/routes/path';

const LOCAL_STORAGE_KEYS = {
  liked: 'notification_liked',
  chatbot: 'notification_chatbot',
  review: 'notification_review',
};

const getStoredValue = (key: string, defaultValue: boolean) => {
  const stored = localStorage.getItem(key);
  return stored !== null ? stored === 'true' : defaultValue;
};

const NotificationSettingsPage = () => {
  const { pathname } = useLocation();
  const isSeller = pathname.includes(PATH.SELLER.BASE);

  const [likedProductNotification, setLikedProductNotification] =
    useState<boolean>(() => getStoredValue(LOCAL_STORAGE_KEYS.liked, false));
  const [chatBotNotification, setChatBotNotification] = useState<boolean>(() =>
    getStoredValue(LOCAL_STORAGE_KEYS.chatbot, false)
  );
  const [reviewNotification, setReviewNotification] = useState<boolean>(() =>
    getStoredValue(LOCAL_STORAGE_KEYS.review, false)
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.liked,
      String(likedProductNotification)
    );
  }, [likedProductNotification]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.chatbot,
      String(chatBotNotification)
    );
  }, [chatBotNotification]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.review, String(reviewNotification));
  }, [reviewNotification]);

  return (
    <div className="flex h-full w-full flex-1 flex-col pt-11">
      <PageHeader leftIcons={[<BackButton />]}>알림 설정</PageHeader>
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
        {isSeller && (
          <article className="flex justify-between">
            <span className="body1-m text-grey10">셀러 후기 등록 시 알림</span>
            <ToggleButton
              name="셀러 후기 등록 시 알림"
              isChecked={reviewNotification}
              setIsChecked={setReviewNotification}
            />
          </article>
        )}
      </section>
    </div>
  );
};

export default NotificationSettingsPage;
