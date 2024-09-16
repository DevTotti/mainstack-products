import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";

class UserControler {
    static async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { body } = req;
    }
}

export default UserControler;
