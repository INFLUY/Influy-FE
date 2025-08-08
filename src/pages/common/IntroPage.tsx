import IntroImage from '@/assets/image/InfluyIntroPage.png';

export const IntroPage = () => {
  return (
    <div className="scrollbar-hide flex h-full w-full flex-col overflow-y-auto">
      <img
        src={IntroImage}
        className="h-auto w-full"
        alt="INFLUY 소개 - 인플루언서의 상품 판매를 간편화하는 퍼스널 셀렉트 스토어, INFLUY"
      />
    </div>
  );
};
