const request = require("supertest");
const server = require("../../index");

beforeAll(async () => {
  console.log("Jest starting!");
});

afterAll(() => {
  server.close();
  console.log("server closed!");
});

describe("/ route tests", () => {
  test("test GET /", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toContain("MT");
  });
});

describe("/api/productManufacturers tests", () => {
  test("test GET /api/productManufacturers", async () => {
    const response = await request(server).get("/api/productManufacturers?l=5");
    expect(response.status).toEqual(200);
    expect(response.text).toContain("id");
  });
});
