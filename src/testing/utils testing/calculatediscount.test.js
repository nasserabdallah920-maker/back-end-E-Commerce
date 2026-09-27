const calculateDiscount = require('../../utils/calculatediscount');

describe('calculateDiscount Utility', () => {
  it('should calculate discount correctly for percentage coupon without hitting max discount', () => {
    const coupon = { type: 'percentage', value: 20, maxDiscount: 100 };
    const price = 200;
    const finalPrice = calculateDiscount(price, coupon);
    expect(finalPrice).toBe(160);
  });

  it('should calculate discount correctly for percentage coupon and hit max discount', () => {
    const coupon = { type: 'percentage', value: 50, maxDiscount: 50 };
    const price = 200;
    const finalPrice = calculateDiscount(price, coupon);
    expect(finalPrice).toBe(150);
  });

  it('should calculate discount correctly for fixed coupon', () => {
    const coupon = { type: 'fixed', value: 30 };
    const price = 100;
    const finalPrice = calculateDiscount(price, coupon);
    expect(finalPrice).toBe(70);
  });

  it('should return original price for unknown coupon type', () => {
    const coupon = { type: 'unknown' };
    const price = 100;
    const finalPrice = calculateDiscount(price, coupon);
    expect(finalPrice).toBe(100);
  });
});
