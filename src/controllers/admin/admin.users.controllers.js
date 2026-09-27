const { StatusCode, Status } = require("../../utils/status");
const {adminUsersServices}=require('../../services/index.services')
const getUser = async (req, res, next) => {
  const params = req.params;
  const result = await adminUsersServices.getUserById(params);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: result });
};


const getAllUsers = async (req, res, next) => {
  const query=req.query 

  const users = await adminUsersServices.getAll(query);

  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: users });
};


const searchForUser = async (req, res, next) => {
  const query=req.query 

  const users = await adminUsersServices.userSearch(query);

  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: users });
};


const deleteUser = async (req, res, next) => {
  const params = req.params;
  await adminUsersServices.removeUser(params);
  res.status(StatusCode.NO_CONTENT).send()
};

const blockUser = async (req, res, next) => {
  const {id} = req.params;
  const updatedUser = await adminUsersServices.blockUser(id);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: updatedUser });
};

module.exports = { getUser, deleteUser, getAllUsers, searchForUser, blockUser };
