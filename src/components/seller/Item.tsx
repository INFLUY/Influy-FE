import { MyItem } from '@/types/types';

export const Item = ({ item }: { item: MyItem }) => {
  return (
    <li className="flex cursor-pointer flex-col items-center justify-center gap-3 px-5 py-3">
      {/* 썸네일 */}
      <div className="flex h-[11rem] w-full shrink-0 rounded-[.1875rem]">
        <img
          src={item?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover"
        />
      </div>
      {/* 상품 정보 */}
      <div className="flex flex-col items-start self-stretch">
        <span className="body-1-m flex">
          <h1 className="text-grey07 flex shrink-0">제목: </h1>
          <p className="text-black">{item?.title}</p>
        </span>
        <p>소개: {item?.content}</p>
        <p>
          기간: {item?.open} ~ {item?.deadline}
        </p>
        <p>범위: {item?.range.length > 0 ? item.range.join(', ') : '비공개'}</p>
        <p>상태: {item?.status}</p>
        <span className="flex">
          <p>응답대기: {item?.pending}개</p>|<p>응답완료: {item?.answered}개</p>
        </span>
      </div>
    </li>
  );
};
