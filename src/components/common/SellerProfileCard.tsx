import HeartIcon from '@/assets/icon/common/HeartIcon.svg?react';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import EmailIcon from '@/assets/icon/common/sns/EmailIcon.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { formatNumber } from '@/utils/formatNumber';

const SellerProfileCard = ({ seller = false }: { seller?: boolean }) => {
  const SellerInfo = {
    name: '소현',
    id: 'xoyeone_',
    likes: 3811000,
  };
  return (
    <div className="flex flex-col gap-3 px-5 pb-3">
      <div className="flex shrink-0 gap-2">
        <div className="relative -mt-5 flex h-fit w-fit shrink-0">
          <img
            src={undefined}
            className="bg-grey03 h-[5.625rem] w-[5.625rem] rounded-full"
          />
          <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-black" />
        </div>
        <div className="flex w-full justify-between pt-[.625rem]">
          <span className="flex flex-col">
            <h1 className="headline3">{SellerInfo.name}</h1>
            <p className="body2-m text-grey08">@{SellerInfo.id}</p>
          </span>
          <div className="flex h-fit w-fit flex-col items-center justify-center">
            <HeartIcon className="text-grey09 h-6 w-6" onClick={() => {}} />
            <span className="body2-m text-grey07">
              {formatNumber(SellerInfo.likes)}
            </span>
          </div>
        </div>
      </div>
      {seller && (
        <div className="flex w-full justify-between">
          <button
            type="button"
            className="border-grey03 text-grey08 caption-m flex shrink-0 cursor-pointer items-center gap-1 rounded-[.125rem] border px-2 py-[.1875rem] text-center"
            onClick={() => {}}
          >
            <EditIcon className="h-[.875rem] w-[.875rem]" />
            프로필 수정
          </button>
          <div className="text-grey08 flex shrink-0 items-center justify-end gap-[.625rem]">
            <a
              href="https://instagram.com/influy_official"
              aria-label="인스타그램 계정 바로가기"
              className="cursor-pointer"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.youtube.com"
              aria-label="유튜브 계정 바로가기"
              className="cursor-pointer"
            >
              <YoutubeIcon />
            </a>
            <a
              href="https://www.tiktok.com"
              aria-label="틱톡 계정 바로가기"
              className="cursor-pointer"
            >
              <TiktokIcon />
            </a>
            <a
              href="https://google.com"
              aria-label="이메일 보내기"
              className="cursor-pointer"
            >
              <EmailIcon />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfileCard;
