const { Status, StatusCode } = require("../utils/status");

const handleError = (err, req, res, next) => {
  if (err.name === "ZodError") {
    return res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
      success: Status.FAIL,
      error: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: Status.FAIL,
    message: err.message,
  });
};

module.exports = { handleError };