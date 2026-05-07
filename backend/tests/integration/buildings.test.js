import request from "supertest";
import app from "../../app.js";

describe("GET /buildings", () => {
  it("retourne la liste des bâtiments", async () => {
    const res = await request(app).get("/buildings");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
