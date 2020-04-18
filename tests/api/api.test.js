const fetch = require("node-fetch");
const baseUrl = "http://localhost:3000";

const _fetch = async (method, path, body) => {
  body = typeof body === "string" ? body : JSON.stringify(body);
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(baseUrl + path, { method, body, headers });

  if (res.status < 200 || res.status > 299) {
    throw new Error(`Api returned status ${res.status}`);
  }

  return res.json();
};

describe("API tests", () => {
  test("GET /api/products", async () => {
    const products = await _fetch("get", "/api/products");
    expect(products.length).not.toBe(0);
    const product0 = products[0];
    expect(product0.name).toMatch(/\w/);
    expect(typeof product0.price).toBe("number");
  });

  test("GET /api/product/:sku", async () => {
    const products = await _fetch("get", "/api/products");
    expect(products.length).not.toBe(0);
    const product0 = products[0];
    const product = await _fetch("get", "/api/product/" + product0.sku);
    expect(product.name).toBe(product0.name);
  });

  test("POST /api/product/:sku/notify-when-in-season", async () => {
    const products = await _fetch("get", "/api/products");
    expect(products.length).not.toBe(0);
    const product0 = products[0];
    // at this moment, all we can do is make sure the HTTP request is successful
    await _fetch("post", `/api/product/${product0.sku}/notify-when-in-season`, {
      email: "test@meadowlarktravel.com",
    });
  });

  test("DELETE /api/product/:id", async () => {
    const products = await _fetch("get", "/api/products");
    expect(products.length).not.toBe(0);
    const product0 = products[0];
    // at this moment, all we can do is make sure the HTTP request is successful
    await _fetch("delete", `/api/product/${product0.sku}`);
  });
});
