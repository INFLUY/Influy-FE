import cn from '@/utils/cn';
import UserTypeToggleButton from '@/components/seller/home/UserTypeToggleButton';
import { SellerProfileType } from '@/types/seller/SellerProfile.types';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';

const UserTypeSwitchBanner = ({
  influencer,
  userType,
}: {
  influencer: SellerProfileType;
  userType: 'influencer' | 'user';
}) => {
  return (
    <article className="border-grey03 bg-grey02 flex h-[86px] w-full items-center justify-between gap-2.5 rounded-[3px] border px-3.5">
      <div className="flex w-full min-w-0 items-center gap-[.625rem]">
        <div className="relative h-[2.875rem] w-[2.875rem] shrink-0">
          <img
            src={influencer.profileImg ?? ProfileIcon}
            alt="프로필 사진"
            className="h-[2.875rem] w-[2.875rem] shrink-0 rounded-full bg-white object-cover"
          />
          <span
            className={cn(
              'border-main absolute top-0 left-0 z-[1] h-full w-full shrink-0 rounded-full border',
              userType === 'user' && 'border-black'
            )}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <p className="text-grey11 body1-sb line-clamp-1">
            {influencer.nickname}
          </p>
          <p className="text-grey08 body2-m break-words">
            @{influencer.username}
          </p>
        </div>
      </div>
      <UserTypeToggleButton userType={userType} />
    </article>
  );
};

export default UserTypeSwitchBanner;
