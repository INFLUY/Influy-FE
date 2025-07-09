// 홈 상단 내 상품 현황 컴포넌트
const MyProductStatus = () => {
  return (
    <section className="flex flex-col gap-4 p-5">
      <h1 className="subhead-b text-black">내 상품 현황</h1>
      <div>
        <StatusCard />
      </div>
    </section>
  );
};

export default MyProductStatus;

const StatusCard = () => {
  return (
    <article className="flex w-full shrink-0 flex-col items-start gap-5 rounded bg-white p-4 shadow-[0px_0px_8px_0px_rgba(43,43,43,0.10)]">
      {/* 상단 상품 정보 */}
      <div className="flex h-fit w-full items-center justify-between gap-2.5">
        {/* 좌측 상품 이미지 */}
        <img
          className="h-20 w-20 object-cover"
          src="/profile.png"
          alt="수정수정수정"
        />
        {/* 우측 상품 정보 */}
        <div className="flex h-full flex-1 flex-col justify-between gap-[1.125rem]">
          <p className="body2-m text-black">StatusCard</p>
        </div>
      </div>
    </article>
  );
};
