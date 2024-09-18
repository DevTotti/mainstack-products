import request from "supertest";
import { app } from "../../src/app";  // Import the app from app.ts
import UserController from "../../src/components/user/controller";
import UserService from "../../src/components/user/service";
import { statusCode } from "../../src/lib/httpstatuscode";
import mongoose from "mongoose";

describe("User Controller", () => {
  let findUserMock: jest.SpyInstance;
  let createUserMock: jest.SpyInstance;
  let comparePasswordMock: jest.SpyInstance;
  let signPasswordMock: jest.SpyInstance;

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    // Clear previous mocks before each test
    jest.clearAllMocks();

    // Mock the methods of UserService
    findUserMock = jest.spyOn(UserService.prototype, 'findUser');
    createUserMock = jest.spyOn(UserService.prototype, 'createUser');
    comparePasswordMock = jest.spyOn(UserService.prototype, 'comparePassword');
    signPasswordMock = jest.spyOn(UserService.prototype, 'signPassword');
  });

  afterEach(() => {
    // Restore the original implementation after each test
    jest.restoreAllMocks();
  });

  describe("Register", () => {
    it("should register a new user successfully", async () => {
      // Mock user does not exist
      findUserMock.mockResolvedValue(null); // Simulate no user found
      // Mock user creation
      createUserMock.mockResolvedValue({
        username: "testuser",
        password: "hashedpassword",
      });

      const res = await request(app).post("/auth/register").send({
        username: "testuser",
        password: "testpassword",
      });

      expect(res.statusCode).toEqual(statusCode.CREATED);
      expect(res.body.message).toEqual("User created successfully");
    });

    it("should return error if user already exists", async () => {
      // Mock user already exists
      const mockUser = { username: "testuser", password: "hashedpassword" };
      findUserMock.mockResolvedValue(mockUser); // Simulate user found

      const res = await request(app).post("/auth/register").send({
        username: "testuser",
        password: "testpassword",
      });

      expect(res.statusCode).toEqual(statusCode.BAD_REQUEST);
      expect(res.body.message).toEqual("User already exists");
    });
  });

  describe("Login", () => {
    it("should log in successfully with correct credentials", async () => {
      const mockUser = { username: "testuser", password: "hashedpassword", id: "user-id" };

      // Mock finding the user
      findUserMock.mockResolvedValue(mockUser);

      // Mock password comparison to succeed
      comparePasswordMock.mockResolvedValue(true);

      // Mock JWT signing to return a fake token
      signPasswordMock.mockReturnValue("mocked-jwt-token");

      const res = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "testpassword",
      });

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("User logged in successfully");
      expect(res.body.data).toEqual("mocked-jwt-token");
    });

    it("should return error if username is incorrect", async () => {
      // Mock user not found
      findUserMock.mockResolvedValue(null);

      const res = await request(app).post("/auth/login").send({
        username: "wronguser",
        password: "testpassword",
      });

      expect(res.statusCode).toEqual(statusCode.BAD_REQUEST);
      expect(res.body.message).toEqual("Invalid username or password");
    });

    it("should return error if password is incorrect", async () => {
      const mockUser = { username: "testuser", password: "hashedpassword", id: "user-id" };

      // Mock finding the user
      findUserMock.mockResolvedValue(mockUser);

      // Mock password comparison to fail
      comparePasswordMock.mockResolvedValue(false);

      const res = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "wrongpassword",
      });

      expect(res.statusCode).toEqual(statusCode.BAD_REQUEST);
      expect(res.body.message).toEqual("Invalid username or password");
    });
  });
});
