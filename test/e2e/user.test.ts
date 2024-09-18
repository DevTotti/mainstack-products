// test/e2e/userAuth.test.ts
import request from "supertest";
import { app } from "../../src/app";
import mongoose from "mongoose";
import { User } from "../../src/models/User";
import { UserType } from "../../src/types/user";

describe("User Authentication E2E Tests", () => {
  // Cleanup after tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Clear the database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          username: "testuser",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(201); // Assuming CREATED status code
      expect(res.body.message).toEqual("User created successfully");

      // Verify user in the database
      const user: any = await User.findOne({ username: "testuser" });
      expect(user).toBeTruthy();
      expect(user.username).toEqual("testuser");
    });

    it("should return error if user already exists", async () => {
      // Seed the database with a user
      await User.create({
        username: "existinguser",
        password: "hashedpassword", // Assuming you handle hashing in your controller/service
      });

      const res = await request(app)
        .post("/auth/register")
        .send({
          username: "existinguser",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(400); // Assuming BAD_REQUEST status code
      expect(res.body.message).toEqual("User already exists");
    });
  });

  describe("POST /auth/login", () => {
    it("should log in successfully with correct credentials", async () => {
      // Seed the database with a user
      await User.create({
        username: "testuser",
        password: "testpassword", // Ensure this is hashed as per your service logic
      });

      const res = await request(app)
        .post("/auth/login")
        .send({
          username: "testuser",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(200); // Assuming OK status code
      expect(res.body.message).toEqual("User logged in successfully");
      expect(res.body).toHaveProperty("data"); // Adjust according to your response structure
    });

    it("should return error if username is incorrect", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          username: "wronguser",
          password: "testpassword",
        });

      expect(res.statusCode).toEqual(400); // Assuming BAD_REQUEST status code
      expect(res.body.message).toEqual("Invalid username or password");
    });

    it("should return error if password is incorrect", async () => {
      // Seed the database with a user
      await User.create({
        username: "testuser",
        password: "hashedpassword", // Ensure this is hashed as per your service logic
      });

      const res = await request(app)
        .post("/auth/login")
        .send({
          username: "testuser",
          password: "wrongpassword",
        });

      expect(res.statusCode).toEqual(400); // Assuming BAD_REQUEST status code
      expect(res.body.message).toEqual("Invalid username or password");
    });
  });
});
