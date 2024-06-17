import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Please add a name"],
         trim: true,
      },
      email: {
         type: String,
         trim: true,
         unique: true,
         lowercase: true,
         index: true,
         required: [true, "Please add an email"],
      },
      password: {
         type: String,
         required: [true, "Please add a password"],
      },
      avatar: {
         type: String,
         // required: [true, "Please add an avatar"],
         default:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png",
      },
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      return next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         username: this.username,
         email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
   );
};

export const User = mongoose.model("User", userSchema);
