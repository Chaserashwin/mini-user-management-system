const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");

describe("Auth API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/test_db"
    );
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "Test1234",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test("should reject duplicate email", async () => {
    await User.create({
      fullName: "Existing User",
      email: "existing@example.com",
      password: "Test1234",
    });

    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "existing@example.com",
      password: "Test1234",
    });

    expect(res.status).toBe(400);
  });

  test("should login with valid credentials", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "Test1234",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Test1234",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should reject invalid credentials", async () => {
    await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "Test1234",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "WrongPassword",
    });

    expect(res.status).toBe(401);
  });

  test("should get current user with valid token", async () => {
    const signupRes = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@example.com",
      password: "Test1234",
    });

    const token = signupRes.body.token;

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe("test@example.com");
  });
});
