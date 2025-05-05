import DibsButton from "./DibsButton";

type ProductType = {
  productId: number;
  title: string;
  name: string;
  content: string;
  thumbnail: string | null;
  deadline: string;
  saved: boolean;
};

const Product = ({ product }: { product: ProductType }) => {
  return (
    <li className="flex px-5 justify-center items-center gap-3 self-stretch">
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
      <div className="flex justify-between">
        <div className="flex flex-col justify-between align-middle flex-grow flex-shrink-0 basis-0">
          <span>
            <span className="text-grey07 caption-m line-clamp-1">
              {product?.name}
            </span>
            <h1 className="body2-m line-clamp-2">{product?.title}</h1>
            <p className="text-grey09 caption-m">{product?.content}</p>
          </span>
          <span>{product?.deadline}</span>
        </div>
        <DibsButton saved={product?.saved} handleClickSave={() => {}} />
      </div>
    </li>
  );
};

export default Product;
