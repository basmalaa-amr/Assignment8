const User = require("../../common/db/user.model");

const findById = (id) => User.findById(id);
const findByEmail = (email) => User.findOne({ email });
const updateById = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
const deleteById = (id) => User.findByIdAndDelete(id);

module.exports = {
  findById,
  findByEmail,
  updateById,
  deleteById
};
