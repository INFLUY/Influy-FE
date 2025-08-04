import HeartIcon from '@/assets/icon/common/HeartIcon.svg?react';
import InstagramIcon from '@/assets/icon/common/sns/InstagramIcon.svg?react';
import YoutubeIcon from '@/assets/icon/common/sns/YoutubeIcon.svg?react';
import TiktokIcon from '@/assets/icon/common/sns/TiktokIcon.svg?react';
import EmailIcon from '@/assets/icon/common/sns/EmailIcon.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import { formatNumber } from '@/utils/formatNumber';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import cn from '@/utils/cn';
import { ReactNode } from 'react';
import { useGetSellerLike } from '@/services/likes/query/useGetSellerLikes';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { SellerProfileType } from '@/types/seller/SellerProfile.types';

const SellerProfileCard = ({
  sellerInfo,
  isSeller = false,
}: {
  sellerInfo: SellerProfileType;
  isSeller?: boolean;
}) => {
  const navigate = useNavigate();

  const { marketId } = useParams();
  const { sellerId } = useStrictId({ skip: !!marketId });

  const { data: marketLikes } = useGetSellerLike({
    sellerId: marketId ? Number(marketId) : sellerId!,
  });

  const sns: {
    id: number;
    ariaLabel: string;
    url: string | null;
    icon: ReactNode;
  }[] = [
    {
      id: 0,
      ariaLabel: ' 인스타그램 계정 바로가기',
      url: 'https://www.instagram.com/' + sellerInfo.instagram,
      icon: <InstagramIcon />,
    },
    {
      id: 1,
      ariaLabel: ' 유튜브 계정 바로가기',
      url: sellerInfo.youtube,
      icon: <YoutubeIcon />,
    },
    {
      id: 2,
      ariaLabel: ' 틱톡 계정 바로가기',
      url: sellerInfo.tiktok,
      icon: <TiktokIcon />,
    },
    {
      id: 3,
      ariaLabel: '에게 이메일 보내기',
      url: sellerInfo.email ? 'mailto:' + sellerInfo.email : null,
      icon: <EmailIcon />,
    },
  ].filter((s) => !!s.url);

  return (
    <div className={cn('flex flex-col gap-3 px-5 pb-2', isSeller && 'pb-3')}>
      <div className="flex shrink-0 gap-2">
        <div className="relative -mt-5 flex h-fit w-fit shrink-0">
          <img
            src={sellerInfo.profileImg ?? ProfileIcon}
            className="h-[5.625rem] w-[5.625rem] rounded-full bg-white object-cover"
          />
        </div>
        <div className="flex w-full justify-between pt-[.625rem]">
          <span className="flex flex-col">
            <h1 className="headline3">{sellerInfo.nickname}</h1>
            <p className="body2-m text-grey08">@{sellerInfo.username}</p>
          </span>
          <div className="flex h-fit w-fit flex-col items-center justify-center">
            <HeartIcon className="text-grey09 h-6 w-6" onClick={() => {}} />
            <span className="body2-m text-grey07">
              {marketLikes?.likeCnt !== undefined &&
                formatNumber(marketLikes?.likeCnt)}
            </span>
          </div>
        </div>
      </div>
      {isSeller && (
        <div className="flex w-full justify-between">
          <button
            type="button"
            className="border-grey03 text-grey08 caption-m flex shrink-0 cursor-pointer items-center gap-1 rounded-[.125rem] border px-2 py-[.1875rem] text-center"
            onClick={() =>
              navigate(
                `${PATH.SELLER.MY.PROFILE.BASE}/${PATH.SELLER.MY.PROFILE.EDIT}`
              )
            }
          >
            <EditIcon className="h-[.875rem] w-[.875rem]" />
            프로필 수정
          </button>
          <div className="text-grey08 flex shrink-0 items-center justify-end gap-[.625rem]">
            {sns?.map((s, index) => (
              <a
                key={index}
                href={s.url!}
                aria-label={'소현' + s.ariaLabel}
                className="cursor-pointer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfileCard;
