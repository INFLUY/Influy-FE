import { BottomNavBar, PageHeader } from '@/components';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { SingleProfileImageUploader } from '@/components/seller/my/SellerMyProfileEdit';
import { useState } from 'react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';

const MyPage = () => {
  const navigate = useNavigate();

  const userProfile = {
    id: 1,
    username: '@crazy_dog',
    nickname: '이민용',
    profileImg: '',
    createdAt: '2025-07-06T15:54:43.186Z',
  };

  const [profileImg, setProfileImg] = useState<string>(
    userProfile.profileImg ?? ''
  );

  return (
    <section className="bg-grey01 flex flex-1 justify-center pt-11 pb-16">
      <PageHeader
        leftIcons={[<h1 className="subhead-sb text-black">마이</h1>]}
        rightIcons={[
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
      />
      <article className="flex flex-col items-center gap-3">
        {/* 프로필 사진 */}
        <SingleProfileImageUploader
          value={profileImg}
          onChange={setProfileImg}
        />
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="subhead-sb" aria-label="닉네임">
              {userProfile?.nickname}
            </span>
            <EditIcon
              aria-label="닉네임 수정하러 가기 버튼"
              role="button"
              className="text-grey07 h-[.875rem] shrink-0 cursor-pointer"
              onClick={() => {
                navigate(''); // TODO: 닉네임 변경으로 이동
              }}
            />
          </div>
          <div aria-label="" className="body2-sb text-grey08">
            {userProfile?.username}
          </div>
        </div>
      </article>
      <BottomNavBar />
    </section>
  );
};

export default MyPage;
