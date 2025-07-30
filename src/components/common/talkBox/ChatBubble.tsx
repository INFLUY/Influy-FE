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
      <div className="border-grey02 bg-grey02 divide-grey03 flex w-[16.375rem] shrink-0 flex-col items-start divide-y-[.0375rem] rounded-lg border border-solid pt-3.5 pb-3">
        <p className="body2-sb w-full px-3.5 pb-2 text-[#292929]">
          {defaultMessage}
        </p>
        <div className="text-grey08 caption-m w-full px-3.5 pt-2">
          {username}님이 직접 답변을 전송합니다.
        </div>
      </div>
    </article>
  );
};
