export const FirstChatBubble = ({
  profileImg,
  username,
  defaultMessage,
}: {
  profileImg: string | null;
  username: string;
  defaultMessage: string;
}) => {
  return (
    <article className="flex w-full gap-1.5 px-3">
      <div className="bg-grey03 flex h-8 w-8 items-center justify-center rounded-full">
        {profileImg && (
          <img
            className="aspect-square h-full rounded-full object-cover"
            src={profileImg}
            alt={username + '님의 프로필 사진'}
            role="img"
            aria-label={`${username}님의 프로필 사진`}
          />
        )}
      </div>
      <div className="border-grey02 bg-grey02 flex w-[16.375rem] shrink-0 flex-col items-start gap-2.5 rounded-lg border border-solid px-3.5 pt-3.5 pb-3">
        <p className="body2-sb text-[#292929]">{defaultMessage}</p>
        <div className="text-grey08 caption-m">
          {username}님이 직접 답변을 전송합니다.
        </div>
      </div>
    </article>
  );
};
