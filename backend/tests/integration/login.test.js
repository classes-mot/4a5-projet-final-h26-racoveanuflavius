import request from "supertest";
import app from "../../app.js";

describe("POST /auth/login", () => {
  it("retourne un token si les identifiants sont valides", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        username: "Flav",
        password: "1234"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("retourne 401 si identifiants invalides", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        username: "allllllll",
        password: "badpass"
      });

    expect(res.statusCode).toBe(401);
  });
});
