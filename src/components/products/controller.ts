import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";

class ProductControler {
    static async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { body, user } = req;
    }
}

export default ProductControler;
