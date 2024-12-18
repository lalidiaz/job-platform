const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name."], minLength: 3, maxLength: 50 },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "My city",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
