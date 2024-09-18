import { ProductType, ProductQuery } from "../../types/product";
import { Product } from "../../models/Product";
import { fetchPage } from "../../utils/fetch-page";

class ProductService {
  // Creates a new product and returns it without the userId and __v fields
  async createProduct(data: ProductType) {
    return await Product.create(data);
  }

  // Updates an existing product based on the provided id and user, and returns the updated product
  async updateProduct(id: string, user: number, data: ProductType) {
    return await Product.findOneAndUpdate({ _id: id, user }, data, {
      new: true,
    });
  }

  // Retrieves a list of products based on the query parameters and pagination settings
  async getProducts(queryParams: ProductQuery) {
    const {
      name,
      category,
      currency,
      from,
      to,
      userId,
      minPrice,
      maxPrice,
      page = 1,
      size = 10,
    } = queryParams;

    const query: any = {};

    // Build the query object based on provided filters
    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (currency) query.currency = currency;
    if (minPrice || maxPrice) {
      query["price"] = {};
      if (minPrice) query["price"].$gte = Number(minPrice);
      if (maxPrice) query["price"].$lte = Number(maxPrice);
    }
    if (name) query.name = { $regex: name, $options: "i" };
    if (from || to) {
      query.createdAt = {};
    }
    if (from) query.createdAt["$gte"] = new Date(from);
    if (to) query.createdAt["$lt"] = new Date(to);
    if (from && !to) {
      query.createdAt = { $gte: new Date(from), $lte: new Date() };
    }

    // Log the query for debugging purposes
    console.log("ProductQuery: ", query);

    // Fetch and return a paginated list of products based on the query
    return await fetchPage(Product, {
      filter: query,
      pagination: { count: Number(size), page: Number(page) },
      exclude: ["userId", "__v"],
    });
  }

  // Retrieves a single product by its ID without the userId and __v fields
  async getProduct(id: string) {
    return await Product.findById(id).select("-userId -__v");
  }

  // Retrieves a single product based on custom filter criteria without the userId and __v fields
  async getProductBycustom(filter: ProductQuery) {
    return await Product.findOne(filter).select("-userId -__v");
  }

  // Deletes a product by its ID
  async deleteOne(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
