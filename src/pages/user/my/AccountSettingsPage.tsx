import { AccoutSettingsMenuButton, PageHeader } from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';

const AccountSettingsPage = () => {
  const navigate = useNavigate();

  const userProfile = {
    id: 1,
    username: '@crazy_dog',
    nickname: '이민용',
    profileImg: '',
    createdAt: '2025-07-06T15:54:43.186Z',
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
          subText={userProfile?.username}
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.ID);
          }}
        />

        <AccoutSettingsMenuButton
          title="로그아웃"
          onClick={() => {
            // 로그아웃 로직
          }}
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
