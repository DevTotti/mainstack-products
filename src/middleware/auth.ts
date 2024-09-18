import { Request, Response, NextFunction } from "express"; // Import types for Express middleware
import jwt from "jsonwebtoken"; // Import jsonwebtoken for handling JWTs

// Middleware function to authenticate requests using JWT
export const authenticate = (
  req: Request, // Express Request object
  res: Response, // Express Response object
  next: NextFunction, // Next function to pass control to the next middleware
) => {
  // Extract the token from the "Authorization" header, removing the "Bearer " prefix
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, respond with a 401 Unauthorized status
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If the token verification fails, respond with a 401 Unauthorized status
    return res.status(401).json({ message: "Invalid token" });
  }
};
