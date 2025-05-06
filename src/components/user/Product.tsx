import ScrapButton from "@/components/user/ScrapButton";

type ProductType = {
  productId: number;
  title: string;
  name: string;
  content: string;
  thumbnail: string | null;
  deadline: string;
  scrapped: boolean;
};

export const ProductList = ({ product }: { product: ProductType }) => {
  return (
    <li className="flex px-5 justify-center items-center gap-3 self-stretch cursor-pointer">
      {/* 썸네일 */}
      <div className="relative w-30 h-30 shrink-0 flex">
        <img
          src={product?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none flex justify-center items-center text-white">
          마감
        </div>
      </div>
      <div className="flex h-full items-start justify-between flex-grow flex-shrink-0 basis-0 gap-1">
        <div className="flex flex-col h-full justify-between align-middle flex-grow flex-shrink-0 basis-0">
          <span className="flex flex-col justify-between gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {product?.name}
            </span>
            <span className="flex flex-col items-start gap-[.125rem] self-stretch">
              <h1 className="body2-m line-clamp-2">{product?.title}</h1>
              <p className="text-grey09 caption-m">{product?.content}</p>
            </span>
          </span>
          <span className="flex">{product?.deadline}</span>
        </div>
        <ScrapButton scrapped={product?.scrapped} handleClickSave={() => {}} />
      </div>
    </li>
  );
};

export const ProductGrid = ({ product }: { product: ProductType }) => {
  return (
    <li className="flex flex-col self-start gap-[.625rem] w-[10.125rem] cursor-pointer">
      {/* 썸네일 */}
      <div className="relative w-full aspect-square shrink-0 flex p-2 justify-end">
        <img
          src={product?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover absolute inset-0"
        />
        <ScrapButton scrapped={product?.scrapped} handleClickSave={() => {}} />
        {/* <div className="absolute inset-0 bg-black/40 pointer-events-none flex justify-center items-center text-white">
          마감
        </div> */}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-col justify-between align-middle flex-grow flex-shrink-0 basis-0">
          <span className="gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {product?.name}
            </span>
            <h1 className="body2-m">{product?.title}</h1>
            <p className="text-grey09 caption-m">{product?.content}</p>
          </span>
          <span>{product?.deadline}</span>
        </div>
      </div>
    </li>
  );
};
