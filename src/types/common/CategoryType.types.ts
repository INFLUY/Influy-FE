export interface CategoryType {
  id: number;
  name: string;
  categoryOrder?: number;
}

export interface CategoryOrderType extends CategoryType {
  categoryOrder?: number;
}
