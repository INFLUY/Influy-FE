import { SellerPickType, SellerThumbnailType } from '@/types/user/Home.types';
import InfluencerCard from './InfluencerCard';
import InfluencerCardSkeleton from './InfluencerCardSkeleton';
import { MoreButton } from '@/components';
import { generatePath, useNavigate } from 'react-router-dom';
import { ITEM_DETAIL, MARKET_DETAIL } from '@/utils/generatePath';
import { SelectedInfluencerType } from '@/pages/user/home/HomePage';

const TrendingSellerSection = ({
  selectedInfluencer,
  setSelectedInfluencer,
  trendingSeller,
  isTrendingSellerLoading,
  sellerPick,
  isSellerPickLoading,
}: {
  selectedInfluencer: SelectedInfluencerType;
  setSelectedInfluencer: React.Dispatch<
    React.SetStateAction<SelectedInfluencerType>
  >;
  trendingSeller: SellerThumbnailType[] | [] | undefined;
  isTrendingSellerLoading: boolean;
  sellerPick: SellerPickType | undefined;
  isSellerPickLoading: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex w-full flex-col gap-4 pt-7 pb-3">
        <h1 className="subhead-b px-5 text-black">요즘 핫한 인플루언서</h1>
        <ul className="scrollbar-hide flex gap-6 overflow-x-auto px-5">
          {isTrendingSellerLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <InfluencerCardSkeleton key={index} />
            ))}
          {!isTrendingSellerLoading &&
            trendingSeller?.map((influencer) => (
              <InfluencerCard
                key={influencer.sellerId}
                influencer={influencer}
                selectedInfluencer={selectedInfluencer.id}
                setSelectedInfluencer={setSelectedInfluencer}
              />
            ))}
        </ul>
      </section>
      {/* 셀러가 픽한 상품 */}
      <section className="bg-grey02 mb-5 flex w-full flex-col gap-[.875rem] pt-4 pb-5">
        {/* 제목 */}
        <div className="flex items-center justify-between px-5">
          {selectedInfluencer.id === null ? (
            <div className="bg-grey04 aspect-square h-6.5 w-40 animate-pulse rounded-[.125rem]" />
          ) : (
            <h1 className="subhead-b text-black">
              {selectedInfluencer.nickname}
              님이 <span className="text-main">Pick</span>한 상품
            </h1>
          )}
          {selectedInfluencer.id !== null && (
            <MoreButton
              onClickMore={() =>
                navigate(
                  generatePath(MARKET_DETAIL, {
                    marketId: selectedInfluencer.id,
                  })
                )
              }
            />
          )}
        </div>

        {/* 사진 or 스켈레톤 */}
        {isSellerPickLoading ? (
          <div className="flex w-full gap-0.5 px-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-grey04 aspect-square w-1/3 animate-pulse rounded-[.125rem]"
              />
            ))}
          </div>
        ) : sellerPick?.mainImgList && sellerPick.mainImgList.length > 0 ? (
          <div className="flex w-full gap-0.5 px-5">
            {sellerPick.mainImgList.map((item, index) => (
              <div
                className="aspect-square w-1/3 cursor-pointer"
                key={index}
                onClick={() =>
                  navigate(
                    generatePath(ITEM_DETAIL, {
                      marketId: sellerPick.sellerId,
                      itemId: item.itemId,
                    })
                  )
                }
              >
                <img
                  src={item.mainImg}
                  className="aspect-square rounded-[.125rem] bg-white object-cover"
                  alt={`${selectedInfluencer.nickname}님이 픽한 상품`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative flex w-full items-center justify-center px-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-square w-1/3 gap-0.5"
                aria-hidden
              />
            ))}
            <p className="body1-sb absolute inset-0 z-[1] flex items-center justify-center">
              아직 등록된 상품이 없어요
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default TrendingSellerSection;
