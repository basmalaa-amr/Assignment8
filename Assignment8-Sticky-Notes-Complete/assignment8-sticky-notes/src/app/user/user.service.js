const userRepository = require("./user.repository");

const updateUser = async (id, data) => {
  const user = await userRepository.findById(id);

  if (!user) {
    return { error: "User not found" };
  }

  if (data.email && data.email.toLowerCase() !== user.email) {
    const emailExists = await userRepository.findByEmail(data.email);

    if (emailExists) {
      return { error: "Email already exists" };
    }
  }

  const { password, ...updateData } = data;

  return { user: await userRepository.updateById(id, updateData) };
};

const deleteUser = async (id) => {
  const user = await userRepository.deleteById(id);
  return user;
};

const getUser = async (id) => userRepository.findById(id);

module.exports = {
  updateUser,
  deleteUser,
  getUser
};
