export interface ProductType {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductQuery {
  _id?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  currency?: string;
  userId?: any;
  page?: number;
  size?: number;
  from?: Date;
  to?: Date;
}
