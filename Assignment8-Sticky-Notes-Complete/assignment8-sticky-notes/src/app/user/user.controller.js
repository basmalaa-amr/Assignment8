const userService = require("./user.service");

const getId = (req) => req.query.id || req.params.id;

const updateUser = async (req, res, next) => {
  try {
    const result = await userService.updateUser(getId(req), req.body);

    if (result.error) {
      return res.status(result.error === "User not found" ? 404 : 409)
        .json({ message: result.error });
    }

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(getId(req));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(getId(req));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser
};
