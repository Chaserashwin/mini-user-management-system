import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Authentication Tests", () => {
  test("Signup should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "Test User",
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("Login should authenticate user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Login fails with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
  });

  test("Protected route blocked without token", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(401);
  });

  test("User cannot access admin route", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "password123",
    });

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.statusCode).toBe(403);
  });
});
