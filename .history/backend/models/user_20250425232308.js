// back/models/user.js
const mongoose = require("mongoose");
const UserRoles = require("../enum/userRoles");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRoles.DOCTOR,
      enum: [UserRoles.DOCTOR, UserRoles.PATIENT],
    },
    schoolClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolClass",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
