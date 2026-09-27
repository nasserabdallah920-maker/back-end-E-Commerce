const { StatusCode, Status } = require("../../utils/status");
const { adminDashboardServices } = require("../../services/index.services");

const getDashboardStatistics = async (req, res, next) => {
  const result = await adminDashboardServices.getStatistics();
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: result });
};

module.exports = { getDashboardStatistics };
