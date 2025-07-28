import { MyLikedInfluencerBox } from '@/components';
import { LikedInfluencerListType } from '@/types/user/Like.types';

const LikeInfluencerTab = () => {
  const influencers: LikedInfluencerListType[] | [] = [
    {
      sellerId: 1,
      nickName: '서연',
      userName: 'influy',
      profileImgLink: '/profile.png',
      likeCount: 10,
    },
    {
      sellerId: 2,
      nickName: '샤방샤방',
      userName: 'iamseller',
      profileImgLink: '',
      likeCount: 1,
    },
    {
      sellerId: 3,
      nickName: '인플루이',
      userName: 'influy_official',
      profileImgLink: '/profile2.png',
      likeCount: 1000,
    },
    {
      sellerId: 4,
      nickName: '세오스',
      userName: 'ceos',
      profileImgLink: '',
      likeCount: 100,
    },
  ];
  return (
    <section className="scrollbar-hide bg-grey01 relative flex w-full flex-1 flex-col overflow-x-hidden overflow-y-auto">
      {influencers?.length > 0 ? (
        <ul className="flex w-full flex-1 flex-col gap-3">
          {influencers?.map((influencer) => (
            <MyLikedInfluencerBox
              key={influencer.sellerId}
              influencer={influencer}
            />
          ))}
        </ul>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-grey09 body2-m">찜한 인플루언서가 아직 없어요</p>
        </div>
      )}
    </section>
  );
};

export default LikeInfluencerTab;
