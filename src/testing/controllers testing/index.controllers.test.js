const indexControllers = require("../../controllers/index.controllers");

describe("Index Controllers", () => {
  it("should export controllers correctly", () => {
    expect(indexControllers).toHaveProperty("authControllers");
    expect(indexControllers).toHaveProperty("userControllers");
    expect(indexControllers).toHaveProperty("productControllers");
    expect(indexControllers).toHaveProperty("cartControllers");
    expect(indexControllers).toHaveProperty("orderControllers");
  });
});
