const checkDate = require('../../utils/checkdate');

describe('checkDate Utility', () => {
  it('should return true for a past date', () => {
    const pastDate = new Date(Date.now() - 10000);
    expect(checkDate(pastDate)).toBe(true);
  });

  it('should return false for a future date', () => {
    const futureDate = new Date(Date.now() + 100000);
    expect(checkDate(futureDate)).toBe(false);
  });
});
