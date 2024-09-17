import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import ProductService from "./service";
import { ProductQuery } from "../../types/product";

// Instantiate ProductService to use in the controller methods
const ProductServices = new ProductService();

class ProductControler {
  /**
   * Create a new product.
   * @param req - The request object, containing the product details and user info.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the created product or an error.
   */
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { body, user } = req;
      body.userId = user?.id; // Assign the user ID to the product body
      const product = await ProductServices.createProduct(body);

      // Respond with success status and the created product
      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Product created successfully",
        product,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Fetch all products for the authenticated user.
   * @param req - The request object, containing user info and query parameters.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the list of products or an error.
   */
  static async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { user, query } = req;
      const queryParams: ProductQuery = {
        ...query,
        userId: user?.id, // Add user ID to query parameters
      };
      const products = await ProductServices.getProducts(queryParams);

      // Respond with success status and the list of products
      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Products fetched successfully",
        products,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Fetch all public products (no authentication required).
   * @param req - The request object, containing query parameters.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the list of public products or an error.
   */
  static async getPublic(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { query } = req;
      const products = await ProductServices.getProducts(query);

      // Respond with success status and the list of public products
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Products fetched successfully",
        products,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Fetch a single public product by ID (no authentication required).
   * @param req - The request object, containing the product ID as a route parameter.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the product or an error.
   */
  static async getOnePublic(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductServices.getProduct(id);

      // Respond with success status and the product
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Product fetched successfully",
        product,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Fetch a single product for the authenticated user by ID.
   * @param req - The request object, containing the product ID as a route parameter and user info.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the product or an error.
   */
  static async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        params: { id },
        user,
      } = req;
      const product = await ProductServices.getProductBycustom({
        _id: id,
        userId: user?.id,
      });
      if (!product)
        // Respond with an error if the product is not found
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Product not found",
        );
      // Respond with success status and the product
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Product fetched successfully",
        product,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Update a single product for the authenticated user by ID.
   * @param req - The request object, containing the product ID as a route parameter, updated product details, and user info.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response with the updated product or an error.
   */
  static async updateOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        body,
        user,
        params: { id },
      } = req;
      const productExist = await ProductServices.getProductBycustom({
        _id: id,
        userId: user?.id,
      });
      if (!productExist)
        // Respond with an error if the product is not found
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Product not found",
          null,
        );

      const product = await ProductServices.updateProduct(id, user._id, body);

      // Respond with success status and the updated product
      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Product created successfully",
        product,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }

  /**
   * Delete a single product for the authenticated user by ID.
   * @param req - The request object, containing the product ID as a route parameter and user info.
   * @param res - The response object, used to send the response.
   * @param next - The next function to call in case of an error.
   * @returns A response indicating success or an error.
   */
  static async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        user,
        params: { id },
      } = req;
      const productExist = await ProductServices.getProductBycustom({
        _id: id,
        userId: user?.id,
      });
      if (!productExist)
        // Respond with an error if the product is not found
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Product not found",
          null,
        );

      await ProductServices.deleteOne(id);

      // Respond with success status indicating the product has been deleted
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Product deleted successfully",
        null,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      return next(error);
    }
  }
}

export default ProductControler;
