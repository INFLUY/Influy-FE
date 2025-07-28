import {
  AccoutSettingsMenuButton,
  PageHeader,
  ToggleButton,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { PATH } from '@/routes/path';
import { useState } from 'react';

const SellerAccountSettingsPage = () => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const userProfile = {
    id: 1,
    username: '@crazy_dog',
    nickname: '이민용',
    profileImg: '',
    createdAt: '2025-07-06T15:54:43.186Z',
  };

  const handlePublicProfileClick = () => {
    setIsPublic((prev) => !prev);
    // TODO: 스낵바 & 백 연동
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
      <section className="flex flex-1 flex-col pt-[.5625rem]">
        <AccoutSettingsMenuButton
          title="아이디 변경"
          subText={userProfile?.username}
          onClick={() => {
            navigate(PATH.MY.ACCOUNT_SETTING.ID);
          }}
        />

        <article className="flex h-[5.1875rem] items-center justify-between px-5">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1">
              <p className="body1-m text-grey10">프로필 비공개 전환</p>
              <span className="text-grey07 body2-m">
                {isPublic
                  ? '비공개 전환 시, 셀러 본인만 접근 가능합니다.'
                  : '현재 계정이 비공개 상태입니다.'}
              </span>
            </div>
            <ToggleButton
              name="프로필 비공개 전환"
              isChecked={isPublic}
              setIsChecked={handlePublicProfileClick}
            />
          </div>
        </article>

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

export default SellerAccountSettingsPage;
