const authService = require("./auth.service");

const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);

    if (result.error) {
      return res.status(409).json({ message: result.error });
    }

    res.status(201).json({
      message: "User added successfully",
      userId: result.user._id
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user._id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login
};
