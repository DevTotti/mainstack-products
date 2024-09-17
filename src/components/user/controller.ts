import { NextFunction, Request, Response } from "express";
import ExpressResponse from "../../lib/response";
import { statusCode } from "../../lib/httpstatuscode";
import UserService from "./service";

const UserServices = new UserService();

class UserControler {
  // Handles user registration
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { body } = req;

      // Check if a user with the given username already exists
      const user = await UserServices.findUser(body.username);
      if (user)
        return ExpressResponse.error(
          res,
          statusCode.BAD_REQUEST,
          "User already exists",
        );

      // Create a new user
      await UserServices.createUser(body);
      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "User created successfully",
        null,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }

  // Handles user login
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { body: { username, password } } = req;

      // Find the user by username
      const user = await UserServices.findUser(username);
      if (!user)
        return res
          .status(400)
          .json({ message: "Invalid username or password" });

      // Compare provided password with stored password
      const isMatch = await UserServices.comparePassword(password, user.password);
      if (!isMatch)
        return ExpressResponse.error(
          res,
          statusCode.BAD_REQUEST,
          "Invalid username or password",
        );

      // Generate a JWT token for the user
      const token = await UserServices.signPassword(user._id, user.username);
      return ExpressResponse.success(
        res,
        statusCode.CREATED,
        "User logged in successfully",
        token,
      );
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
}

export default UserControler;
