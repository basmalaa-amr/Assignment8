const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 60;
      },
      message: "Age must be between 18 and 60"
    }
  }
});

module.exports = mongoose.model("User", userSchema);
