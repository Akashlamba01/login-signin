const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");
const AVATAR_PATH = path.join("/upload/images/users/avatar");

const userSchema = new mongoose.Schema(
  {
    name: {
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
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

userSchema.statics.uploadAvatar = multer({ storage: storage }).single("avatar");
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);
module.exports = User;
