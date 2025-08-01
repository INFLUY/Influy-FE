import { AccoutSettingsMenuButton, PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';
import { useModalStore } from '@/store/useModalStore';

const SellerSettingsPage = () => {
  const navigate = useNavigate();
  const { showModal } = useModalStore();

  const handleLogoutClick = () => {
    showModal({
      text: `로그아웃하시겠습니까?`,
      leftButtonText: '취소',
      rightButtonText: '확인',
      rightButtonClick: () => {
        // TODO: 로그아웃 로직
        console.log('로그아웃 완료');
        navigate(PATH.HOME.BASE);
      },
    });
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
        설정
      </PageHeader>
      <section className="flex flex-1 flex-col pt-[.5625rem]">
        <AccoutSettingsMenuButton
          title="알림 설정"
          onClick={() => {
            navigate(PATH.SELLER.MY.SETTING.NOTIFICATION);
          }}
        />

        <AccoutSettingsMenuButton
          title="계정 설정"
          onClick={() => navigate(PATH.SELLER.MY.SETTING.ACCOUNT_SETTING.BASE)}
        />

        <AccoutSettingsMenuButton
          title="INFLUY 고객센터"
          onClick={() => navigate(PATH.SELLER.MY.SETTING.SUPPORT.BASE)}
        />

        <AccoutSettingsMenuButton
          title="로그아웃"
          onClick={() => handleLogoutClick()}
        />
      </section>
    </div>
  );
};

export default SellerSettingsPage;
