import { BottomNavBar, PageHeader } from '@/components';
import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { VanillaProfileImageUploader } from '@/components/common/VanillaProfileImageUploader';
import { useEffect, useState } from 'react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import ArrowIcon from '@/assets/icon/common/ArrowRight16.svg?react';
import { PATH } from '@/routes/path';
import { useGetUserProfile } from '@/services/member/query/useGetUserProfile';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { usePatchUserProfile } from '@/services/member/mutation/usePatchUserProfile';

const MyPage = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const { memberId } = useStrictId({ redirectOnFail: true });
  const { data: userProfile } = useGetUserProfile({ memberId: memberId! });
  const { mutate: patchProfile } = usePatchUserProfile();

  const handleProfileOnchange = (image: string) => {
    setProfileImg(image);
    patchProfile({ data: { profileUrl: image } });
  };

  useEffect(() => {
    if (userProfile) {
      setProfileImg(userProfile.profileImg);
    }
  }, [userProfile]);

  const menuItems = [
    { label: '알림 설정', path: `${PATH.MY.NOTIFICATION}` },
    { label: '계정 설정', path: `${PATH.MY.ACCOUNT_SETTING.BASE}` },
    { label: 'INFLUY 고객센터', path: `${PATH.MY.SUPPORT}` },
  ];

  return (
    <section className="bg-grey01 flex flex-1 justify-center px-5 pt-11 pb-16">
      <PageHeader
        leftIcons={[<h1 className="subhead-sb text-black">마이</h1>]}
        rightIcons={[
          <button type="button" className="relative">
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <div className="bg-main absolute top-0.5 right-[.2188rem] h-1.5 w-1.5 rounded-full" />
          </button>,
        ]}
      />
      <section className="flex flex-1 flex-col items-center gap-10 pt-6">
        <article className="flex flex-col items-center gap-3">
          {/* 프로필 사진 */}
          <VanillaProfileImageUploader
            value={profileImg}
            onChange={handleProfileOnchange}
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
                  navigate(PATH.MY.NICKNAME);
                }}
              />
            </div>
            <div aria-label="" className="body2-sb text-grey08">
              @{userProfile?.username}
            </div>
          </div>
        </article>
        <article className="flex w-full flex-col items-center gap-4">
          <button
            type="button"
            className="border-grey04 flex w-full cursor-pointer items-center justify-between rounded-[.1875rem] border px-[.625rem] py-4"
            onClick={() => navigate(PATH.MY.MY_QUESTION)}
          >
            <span className="body1-m text-grey10">내가 한 질문</span>
            <ArrowIcon className="text-grey07" />
          </button>
          <div className="flex w-full flex-col items-center">
            {menuItems.map(({ label, path }) => (
              <button
                key={label}
                type="button"
                className="text-grey10 flex w-full cursor-pointer py-4"
                onClick={() => navigate(path)}
              >
                {label}
              </button>
            ))}
          </div>
        </article>
      </section>

      <BottomNavBar />
    </section>
  );
};

export default MyPage;
