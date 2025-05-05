import Product from "@/components/user/Product";

const SellerProfile = () => {
  const PRODUCT_LIST = [
    {
      productId: 0,
      title:
        "[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지",
      name: "@dfkjdkfjdkfj",
      content: "🖤완판 재진행🖤 너무 예쁜 가디건",
      thumbnail: "/img1.png",
      deadline: "2025-04-30T18:30:00Z",
      saved: false,
    },
    {
      productId: 1,
      title: "소현X비비안웨스트우드 가디건 (색상 5가지)",
      name: "@dfkjdkfjdkfj",
      content:
        "🖤완판 재진행🖤 너무 예쁜 가디건🖤완판 재진행🖤너무 예쁜 가디건",
      thumbnail: null,
      deadline: "2025-04-30T18:30:00Z",
      saved: true,
    },
  ];

  return (
    <>
      <ul className="flex flex-col items-start self-stretch gap-4">
        {PRODUCT_LIST?.map((product) => (
          <Product key={product?.productId} product={product} />
        ))}
      </ul>
    </>
  );
};

export default SellerProfile;
