import ScrapButton from '@/components/user/ScrapButton';
import { ExtendChip, SoldOutChip, TimeChip } from './Chip';

type ProductType = {
  productId: number;
  title: string;
  name: string;
  content: string;
  thumbnail: string | null;
  open: string;
  deadline: string;
  scrapped: boolean;
  soldOut?: boolean;
};

export const ProductList = ({ product }: { product: ProductType }) => {
  return (
    <li className="flex cursor-pointer items-center justify-center gap-3 self-stretch px-5">
      {/* 썸네일 */}
      <div className="relative flex h-30 w-30 shrink-0">
        <img
          src={product?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
      </div>
      <div className="flex h-full flex-shrink-0 flex-grow basis-0 items-start justify-between gap-1">
        <div className="flex h-full flex-shrink-0 flex-grow basis-0 flex-col justify-between align-middle">
          <span className="flex flex-col justify-between gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {product?.name}
            </span>
            <span className="flex flex-col items-start gap-[.125rem] self-stretch">
              <h1 className="body2-m line-clamp-2">{product?.title}</h1>
              <p className="text-grey09 caption-m">{product?.content}</p>
            </span>
          </span>
          {/* 칩 */}
          <span className="flex">
            {product?.soldOut ? (
              <SoldOutChip />
            ) : (
              <span className="flex gap-1">
                <TimeChip open={product?.open} deadline={product?.deadline} />
                <ExtendChip deadline={product?.deadline} />
              </span>
            )}
          </span>
        </div>
        <ScrapButton scrapped={product?.scrapped} handleClickSave={() => {}} />
      </div>
    </li>
  );
};

export const ProductGrid = ({ product }: { product: ProductType }) => {
  return (
    <li className="flex w-[10.125rem] cursor-pointer flex-col gap-[.625rem] self-start">
      {/* 썸네일 */}
      <div className="relative flex aspect-square w-full shrink-0 justify-end p-2">
        <img
          src={product?.thumbnail ?? undefined}
          alt="상품 썸네일"
          className="absolute inset-0 object-cover"
        />
        <ScrapButton
          scrapped={product?.scrapped}
          handleClickSave={() => {
            console.log('saved');
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
          마감
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-shrink-0 flex-grow basis-0 flex-col justify-between align-middle">
          <span className="gap-1">
            <span className="text-grey07 caption-m line-clamp-1">
              {product?.name}
            </span>
            <h1 className="body2-m">{product?.title}</h1>
            <p className="text-grey09 caption-m">{product?.content}</p>
          </span>
          {/* 칩 */}
          <span className="flex">
            {product?.soldOut ? (
              <SoldOutChip />
            ) : (
              <span className="flex gap-1">
                <TimeChip open={product?.open} deadline={product?.deadline} />
                <ExtendChip deadline={product?.deadline} />
              </span>
            )}
          </span>
        </div>
      </div>
    </li>
  );
};
