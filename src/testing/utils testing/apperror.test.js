const AppError = require('../../utils/apperror');

describe('AppError Utility', () => {
  it('should create an error with the correct message and status code', () => {
    const message = 'Something went wrong';
    const statusCode = 404;
    const error = new AppError(message, statusCode);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.status).toBe('fail');
  });

  it('should set status to error for 500 status codes', () => {
    const error = new AppError('Internal Error', 500);
    expect(error.status).toBe('error');
  });

  it('should capture stack trace', () => {
    const error = new AppError('Error', 400);
    expect(error.stack).toBeDefined();
  });
});
