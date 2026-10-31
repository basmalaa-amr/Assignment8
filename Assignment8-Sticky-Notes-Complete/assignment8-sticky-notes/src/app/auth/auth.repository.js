const User = require("../../common/db/user.model");

const findUserByEmail = (email) => User.findOne({ email });
const createUser = (data) => User.create(data);

module.exports = {
  findUserByEmail,
  createUser
};
