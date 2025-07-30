import { AccoutSettingsMenuButton, PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';
import { useModalStore } from '@/store/useModalStore';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetUserProfile } from '@/services/member/query/useGetUserProfile';

const AccountSettingsPage = () => {
  const navigate = useNavigate();

  const { showModal } = useModalStore();

  const { memberId } = useStrictId({ redirectOnFail: true });
  const { data: userProfile } = useGetUserProfile({ memberId: memberId! });

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
        알림 설정
      </PageHeader>
      <section className="flex flex-1 flex-col px-5 pt-[.5625rem]">
        <AccoutSettingsMenuButton
          title="아이디 변경"
          subText={'@' + userProfile?.username}
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.ID);
          }}
        />

        <AccoutSettingsMenuButton
          title="로그아웃"
          onClick={() => handleLogoutClick()}
        />

        <AccoutSettingsMenuButton
          title="회원 탈퇴"
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.DELETE);
          }}
        />
      </section>
    </div>
  );
};

export default AccountSettingsPage;
