const bcrypt = require("bcryptjs");
const authRepository = require("./auth.repository");

const signup = async (data) => {
  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await authRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    age: data.age
  });

  return { user };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    return null;
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    return null;
  }

  return user;
};

module.exports = {
  signup,
  login
};
