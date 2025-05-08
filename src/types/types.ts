export type ProductType = {
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
