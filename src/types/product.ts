export interface ProductType {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductQuery {
  _id?: string;
  name?: string;
  price?: { $gte?: number; $lte?: number };
  category?: string;
  user?: any;
  page?: number;
  size?: number;
  from?: Date;
  to?: Date;
}
