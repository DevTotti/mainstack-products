import { User } from "../../models/User"; // Import the User model for database operations
import { UserType } from "../../types/user"; // Import the UserType type definition
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing and comparison
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generating JWTs

class UserService {
  // Method to create a new user
  async createUser(data: UserType) {
    const user = new User(data); // Create a new User instance with the provided data
    await user.save(); // Save the user to the database
  }

  // Method to find a user by their username
  async findUser(username: string) {
    return await User.findOne({ username }); // Find and return the user with the given username
  }

  // Method to compare a provided password with the stored user password
  async comparePassword(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword); // Compare the provided password with the hashed password
  }

  // Method to sign a JWT for a user
  async signPassword(userId: any, username: string) {
    const jwtSecret = process.env.JWT_SECRET; // Get the JWT secret from environment variables
    const tokenExpiresIn = process.env.JWT_EXPIRES_IN; // Get the token expiration time from environment variables
    // Generate a JWT with the user ID and username, using the specified secret and expiration time
    const token = jwt.sign({ id: userId, username }, jwtSecret as string, {
      expiresIn: tokenExpiresIn as string,
      algorithm: "HS256",
    });
    return token; // Return the generated JWT
  }
}

export default UserService; // Export the UserService class for use in other parts of the application
