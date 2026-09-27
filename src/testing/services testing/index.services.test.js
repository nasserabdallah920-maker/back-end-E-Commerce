const indexServices = require("../../services/index.services");

describe("Index Services", () => {
  it("should export services correctly", () => {
    expect(indexServices).toHaveProperty("userServices");
    expect(indexServices).toHaveProperty("productServices");
    expect(indexServices).toHaveProperty("authServices");
    expect(indexServices).toHaveProperty("orderServices");
  });
});
