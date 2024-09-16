import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import ProductService from "./service";
import { ProductQuery } from "../../types/product";
const ProductServices = new ProductService();

class ProductControler {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { body, user } = req;
      body.user = user?._id;
      const product = await ProductServices.createProduct(body);

      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Product created successfully",
        product
      );
    } catch (error) {
      return next(error);
    }
  }

  static async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { user, query } = req;
      const queryParams: ProductQuery = {
        ...query,
        user: user?._id,
      };
      const products = await ProductServices.getProducts(queryParams);

      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Products fetched successfully",
        products
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getPublic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { query } = req;
      const products = await ProductServices.getProducts(query);

      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Products fetched successfully",
        products
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductServices.getProduct(id);

      return ExpressResponse.success(
        res,
        statusCode.OK,
        "Product fetched successfully",
        product
      );
    } catch (error) {
      return next(error);
    }
  }

  static async updateOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const {
        body,
        user,
        params: { id },
      } = req;
      const productExist = await ProductServices.getProductBycustom({
        _id: id,
        user,
      });
      if (!productExist)
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Product not found",
          null
        );

      const product = await ProductServices.updateProduct(id, user._id, body);

      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "Product created successfully",
        product
      );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const {
        user,
        params: { id },
      } = req;
      const productExist = await ProductServices.getProductBycustom({
        _id: id,
        user,
      });
      if (!productExist)
        return ExpressResponse.error(
          res,
          statusCode.NOT_FOUND,
          "Product not found",
          null
        );

      await ProductServices.deleteOne(id);
      return ExpressResponse.success(
        res,
        statusCode.OK,
        "prodcut deleted successfully",
        null
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductControler;
