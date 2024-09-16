import { Response } from "express";

class ExpressResponse {
  static success(res: Response, code: number, message: string, data: any = null): any {
    return res.status(code).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, code: number, message: string, data: any = null): any {
    return res.status(code).json({
      success: false,
      message,
      errorData: data,
    });
  }
}

export default ExpressResponse;
