import { BackButton, ItemResult, NotificationButton } from '@/components';
import XIcon from '@/assets/icon/common/XIcon2.svg?react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemCardType } from '@/types/common/ItemType.types';
import { PATH } from '@/routes/path';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const navigate = useNavigate();
  const query = useQuery().get('q') || '';
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim()) {
      navigate(`${PATH.SEARCH.BASE}?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClear = () => {
    setKeyword('');
    navigate('/search'); // 쿼리 제거
  };

  const dummyItemPreviewList: ItemCardType[] | [] = [
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/ff422a15-2192-4967-8801-52a79aa618cc-KakaoTalk_Photo_2025-08-06-21-59-06.jpeg',
      sellerUsername: '_s_bb',
      sellerNickname: '주연',
      sellerId: 1,
      itemId: 60,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/a1f746af-762e-481d-8463-4348e2407bc8-531fe928-3de5-49da-a121-3bece62b83a0-7c3b79ea36a91e871a744f7df49f8243.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 더블-업 듀얼 섀도우 팔레트',
      startDate: '2025-08-07T03:00:00',
      endDate: '2025-08-09T03:00:00',
      tagline: '핑크빛 뽀용한 애교살 메이커',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/ff422a15-2192-4967-8801-52a79aa618cc-KakaoTalk_Photo_2025-08-06-21-59-06.jpeg',
      sellerUsername: '_s_bb',
      sellerNickname: '주연',
      sellerId: 1,
      itemId: 53,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/3ae8b0ff-68c7-49b6-b4f8-3fead84276fa-9f2d905c380460ff6ddb93ba9b8dfb30.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 애드온 롱래쉬 마스카라',
      startDate: '2025-05-20T10:00:00',
      endDate: '2025-05-23T14:55:00',
      tagline: '',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/ff422a15-2192-4967-8801-52a79aa618cc-KakaoTalk_Photo_2025-08-06-21-59-06.jpeg',
      sellerUsername: '_s_bb',
      sellerNickname: '주연',
      sellerId: 1,
      itemId: 42,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/8f5380bb-939b-4f56-b3f3-49839f9fcb5e-1000035759.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 볼륨-업 듀얼 펜슬라이너',
      startDate: '2025-03-18T10:00:00',
      endDate: '2025-08-10T14:55:00',
      tagline: '',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/ff422a15-2192-4967-8801-52a79aa618cc-KakaoTalk_Photo_2025-08-06-21-59-06.jpeg',
      sellerUsername: '_s_bb',
      sellerNickname: '주연',
      sellerId: 1,
      itemId: 41,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/fb905885-2798-49f3-89f8-7f9e69b4cfed-1000035764.jpg',
      itemPeriod: 3,
      itemName: 'OHSOPH 더 블랑 웨딩 크림',
      startDate: '2025-04-20T03:00:00',
      endDate: '2025-08-10T03:00:00',
      tagline: '가볍게 바를 수 있는 톤업크림',
      currentStatus: 'SOLD_OUT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/ff422a15-2192-4967-8801-52a79aa618cc-KakaoTalk_Photo_2025-08-06-21-59-06.jpeg',
      sellerUsername: '_s_bb',
      sellerNickname: '주연',
      sellerId: 1,
      itemId: 34,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-1/5fd90efe-6a79-4e16-a704-628c0f79fa1d-531fe928-3de5-49da-a121-3bece62b83a0-7c3b79ea36a91e871a744f7df49f8243.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 더블-업 듀얼 섀도우 팔레트',
      startDate: '2025-08-01T02:00:00',
      endDate: '2025-08-08T14:55:00',
      tagline: '핑크빛 뽀용한 애교살 메이커',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/eb1ec4ff-1720-4c90-821d-c545e4e3e0c9-496918468_18504417283016134_1228416696801634990_n.jpg',
      sellerUsername: '1_6_9._9',
      sellerNickname: '준희',
      sellerId: 6,
      itemId: 26,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/60c8d7c2-4abb-4dec-becf-13396097e4ab-2210e7f9a3dce272776d9fe4f745f296.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 프리즘 파츠 글리터',
      startDate: '2025-08-07T03:00:00',
      endDate: '2025-08-09T03:00:00',
      tagline: '눈가에 반짝임 데일리 포인트 ',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/eb1ec4ff-1720-4c90-821d-c545e4e3e0c9-496918468_18504417283016134_1228416696801634990_n.jpg',
      sellerUsername: '1_6_9._9',
      sellerNickname: '준희',
      sellerId: 6,
      itemId: 25,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/531fe928-3de5-49da-a121-3bece62b83a0-7c3b79ea36a91e871a744f7df49f8243.jpg',
      itemPeriod: 1,
      itemName: 'OHSOPH 더블-업 듀얼 섀도우 팔레트',
      startDate: '2025-08-07T03:00:00',
      endDate: '2025-08-09T03:00:00',
      tagline: '핑크빛 뽀용한 애교살 메이커',
      currentStatus: 'DEFAULT',
      liked: false,
    },
    {
      sellerProfileImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/eb1ec4ff-1720-4c90-821d-c545e4e3e0c9-496918468_18504417283016134_1228416696801634990_n.jpg',
      sellerUsername: '1_6_9._9',
      sellerNickname: '준희',
      sellerId: 6,
      itemId: 12,
      itemMainImg:
        'https://influy-s3.s3.ap-northeast-2.amazonaws.com/image-src/user-7/ed8694f0-6dd9-409a-acfd-dc2c25902158-IMG_1614.jpeg',
      itemPeriod: 3,
      itemName: '[3차] OHSOPH 레이어 치크&밤',
      startDate: '2025-08-07T04:00:00',
      endDate: '2025-08-09T03:20:00',
      tagline: '자연스럽게 빛나는 광채 블러셔',
      currentStatus: 'DEFAULT',
      liked: false,
    },
  ];
  return (
    <section className="bg-grey01 flex h-full w-full flex-1 pt-11">
      <header className="subhead-sb border-grey02 fixed top-0 z-30 flex h-11 w-full max-w-[40rem] min-w-[20rem] items-center justify-center gap-5 border-b bg-white px-5 text-center text-black md:w-[28rem]">
        <BackButton />
        <div className="flex flex-1 gap-4">
          <article className="relative flex h-[1.9375rem] w-full items-center justify-between">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-grey02 body2-sb placeholder:text-grey07 placholder:body2-m relative flex w-full items-center justify-between rounded-[1.25rem] py-[.3125rem] pr-[1.875rem] pl-[.875rem] text-black"
            />
            <XIcon
              role="button"
              aria-label="지우기"
              className="bg-grey07 absolute right-[.875rem] h-4 w-4 shrink-0 rounded-full p-[.2775rem] text-white"
              onClick={handleClear}
            />
          </article>
          <NotificationButton />
        </div>
      </header>
      <article className="flex flex-1">
        {query && (
          <div className="flex flex-1 gap-3">
            {/* 검색 결과 렌더링 자리 */}
            <ItemResult
              isLoading={false}
              itemList={dummyItemPreviewList}
              fetchNextPage={() => {}}
              hasNextPage={false}
              isFetchingNextPage={false}
              total={10}
            />
          </div>
        )}
      </article>
    </section>
  );
};

export default SearchPage;
