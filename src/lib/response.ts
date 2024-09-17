import { Response } from "express"; // Import the Response type from Express

// Define a class to handle standardized responses for HTTP requests
class ExpressResponse {
  // Static method to send a successful response
  static success(
    res: Response, // Express Response object
    code: number, // HTTP status code to send
    message: string, // Message to include in the response
    data: any = null, // Optional data to include in the response (default is null)
  ): any {
    return res.status(code).json({
      success: true, // Indicates that the request was successful
      message, // Message to provide context or feedback
      data, // Data to include in the response (e.g., user details, results)
    });
  }

  // Static method to send an error response
  static error(
    res: Response, // Express Response object
    code: number, // HTTP status code to send
    message: string, // Message to include in the response
    data: any = null, // Optional error data to include in the response (default is null)
  ): any {
    return res.status(code).json({
      success: false, // Indicates that the request failed
      message, // Message to provide context or explanation for the error
      errorData: data, // Optional data about the error (e.g., validation errors, details)
    });
  }
}

export default ExpressResponse; // Export the ExpressResponse class for use in other parts of the application
