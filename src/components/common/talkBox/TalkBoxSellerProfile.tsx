import { formatDate } from '@/utils/formatDate';
export const TalkBoxSellerProfile = ({
  profileImg,
  username,
  nickname,
}: {
  profileImg: string;
  username: string;
  nickname: string;
}) => {
  const today = formatDate({ date: new Date(), twoDigitYear: true });
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col items-center gap-2.5">
        {/* 사진 */}
        <div className="bg-grey02 h-15 w-15 rounded-full">
          {profileImg && (
            <img
              src={profileImg}
              alt={nickname + ' 프로필 사진'}
              className="bg-grey02 h-15 w-15 rounded-full object-cover"
            />
          )}
        </div>
        {/* 이름 및 아이디 */}
        <div className="flex flex-col items-center">
          <p className="body1-b text-black">{nickname}</p>
          <p className="body2-m text-grey08">{username}</p>
        </div>
      </div>
      {/* 날짜 */}
      <div className="caption-m flex w-fit items-center justify-center gap-2.5 rounded-xl bg-[#9AAEBE] px-3 py-1 text-white">
        {today}
      </div>
    </div>
  );
};
