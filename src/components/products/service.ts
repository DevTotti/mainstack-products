import { ProductType, ProductQuery } from "../../types/product";
import { Product } from "../../models/Product";
import { fetchPage } from "../../utils/fetch-page";
class ProductService {
  async createProduct(data: ProductType) {
    return await Product.create(data);
  }

  async updateProduct(id: string, user: number, data: ProductType) {
    return await Product.findOneAndUpdate({ _id: id, user }, data);
  }

  async getProducts(queryParams: any) {
    const { name, from, to, page = 1, size = 10 } = queryParams;

    const query: any = {};
    if (name) query.$name = { $search: name };
    if (from) query.createdAt["$gte"] = new Date(from);
    if (to) query.createdAt["$lt"] = new Date(to);
    if (from && !to) {
      query.createdAt = { $gte: new Date(from), $lt: new Date() };
    }

    return await fetchPage(Product, {
      filter: query,
      pagination: { count: Number(size), page: Number(page) },
    });
  }

  async getProduct(id: string) {
    return await Product.findById(id);
  }

  async getProductBycustom(filter: ProductQuery) {
    return await Product.findOne(filter);
  }

  async deleteOne(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
