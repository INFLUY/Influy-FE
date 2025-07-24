import cn from '@/utils/cn';
import UserTypeToggleButton from './UserTypeToggleButton';

export interface SimpleInfluencerType {
  id: number;
  nickname: string;
  username: string;
  profileImage: string;
}

const UserTypeSwithBanner = ({
  influencer,
  userType,
}: {
  influencer: SimpleInfluencerType;
  userType: 'influencer' | 'user';
}) => {
  return (
    <article className="border-grey03 bg-grey02 flex h-[86px] w-full justify-between gap-2.5 rounded-[3px] border px-3.5 py-5">
      <div className="flex gap-[.625rem]">
        <div className="relative h-fit w-fit">
          <img
            src={influencer.profileImage}
            alt="프로필 사진"
            className="aspect-square h-[2.875rem] rounded-full object-cover"
          />
          <span
            className={cn(
              'border-main absolute top-0 left-0 z-[1] h-full w-full rounded-full border',
              userType === 'user' && 'border-black'
            )}
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-grey11 body1-sb line-clamp-1">
            {influencer.nickname}
          </p>
          <p className="text-grey08 body2-m line-clamp-1">
            {influencer.username}
          </p>
        </div>
      </div>
      <UserTypeToggleButton userType={userType} />
    </article>
  );
};

export default UserTypeSwithBanner;
