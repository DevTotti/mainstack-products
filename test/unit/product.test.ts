import { app } from "../../src/app";
import request from "supertest";
import ProductService from "../../src/components/products/service";
import { statusCode } from "../../src/lib/httpstatuscode";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

// Mock user data
const mockUser = {
  username: "testuser",
  id: "66eac623eb2fae6fb73d6c53",
  token: jwt.sign(
    { id: "66eac623eb2fae6fb73d6c53" },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  ),
};

// Use this token in your requests
const token = mockUser.token;

describe("Product Controller", () => {
  let createProductMock: jest.SpyInstance;
  let getProductsMock: jest.SpyInstance;
  let getProductMock: jest.SpyInstance;
  let updateProductMock: jest.SpyInstance;
  let deleteProductMock: jest.SpyInstance;
  let createdProductMock: any;

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the methods of ProductService
    createProductMock = jest.spyOn(ProductService.prototype, "createProduct");
    getProductsMock = jest.spyOn(ProductService.prototype, "getProducts");
    getProductMock = jest.spyOn(ProductService.prototype, "getProduct");
    updateProductMock = jest.spyOn(ProductService.prototype, "updateProduct");
    deleteProductMock = jest.spyOn(ProductService.prototype, "deleteOne");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Create Product", () => {
    it("should create a new product", async () => {
      const res = await request(app)
        .post("/product")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Product",
          description: "This is a test product",
          price: 100,
          currency: "USD",
          category: "good",
        });
      expect(res.statusCode).toEqual(statusCode.CREATED);
      expect(res.body.message).toEqual("Product created successfully");
      createdProductMock = res.body.data;
    });
  });

  describe("Get Products", () => {
    it("should fetch all products public", async () => {
      // Mock fetching products
      getProductsMock.mockResolvedValue([createdProductMock]);

      const res = await request(app).get("/product/public");

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("Products fetched successfully");
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should fetch all products private", async () => {
      // Mock fetching products
      getProductsMock.mockResolvedValue([createdProductMock]);

      const res = await request(app)
        .get("/product")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("Products fetched successfully");
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("Get Product", () => {
    it("should fetch a single product by ID public", async () => {
      // Mock fetching a single product
      getProductMock.mockResolvedValue(createdProductMock);

      const res = await request(app).get(
        `/product/public/${createdProductMock._id}`
      );

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("Product fetched successfully");
    });

    it("should fetch a single product by ID private", async () => {
      getProductMock.mockResolvedValue(createdProductMock);

      const res = await request(app)
        .get(`/product/${createdProductMock._id}`)
        .set("Authorization", `Bearer ${token}`); // Ensure token is valid and not expired

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("Product fetched successfully");
    });
  });

  describe("Update Product", () => {
    it("should update an existing product", async () => {
      // Mock product update
      updateProductMock.mockResolvedValue({
        name: "Updated Product",
      });

      const res = await request(app)
        .put(`/product/${createdProductMock._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Product",
          price: 150,
        });

      expect(res.statusCode).toEqual(statusCode.CREATED);
      expect(res.body.message).toEqual("Product updated successfully");
    });
  });

  describe("Delete Product", () => {
    it("should delete a product", async () => {
      // Mock product deletion
      deleteProductMock.mockResolvedValue({
        acknowledged: true,
        deletedCount: 1,
      });

      const res = await request(app)
        .delete(`/product/${createdProductMock._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(statusCode.OK);
      expect(res.body.message).toEqual("Product deleted successfully");
    });
  });
});
