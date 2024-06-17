import { asyncHandler } from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
   httpOnly: true,
   secure: true,
};
const generateAccessTokenFunction = async (userId) => {
   try {
      const user = await User.findById(userId);
      const accessToken = await user.genrateAccessToken();
      console.log(accessToken);
      return accessToken;
   } catch (err) {
      throw new ApiError(500, "Error while generating access token");
   }
};

const registerUser = asyncHandler(async (req, res) => {
   console.log(req.body);
   const { username, email, password } = req.body;
   if (!email || !password || !username) {
      throw new ApiError(400, "All fields are required");
   }

   if (password.length < 6) {
      throw new ApiError(400, "Password must be at least 6 characters");
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      throw new ApiError(401, "User already exists");
   }

   const user = await User.create({
      username,
      email,
      password,
   });
   if (!user) {
      throw new ApiError(500, "Error while registering user");
   }
   user.password = undefined;
   console.log(user);

   return res
      .status(200)
      .json(new ApiResponse(200, user, "User regstered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      throw new ApiError(400, "All fields are required");
   }
   const user = await User.findOne({ email });
   if (!user) {
      throw new ApiError(404, "User not found");
   }
   const correctPasword = await user.isPasswordCorrect(password);
   if (!correctPasword) {
      throw new ApiError(401, "Incorrect password");
   }

   user.password = undefined;
   const accessToken = await generateAccessTokenFunction(user._id);
   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, user, "User logged in successfully"));
});

const googleLogin = asyncHandler(async (req, res) => {
   const { username, email, imageUrl } = req.body;
   if (!username || !email || !imageUrl) {
      throw new ApiError(400, "All fields are required");
   }
   const user = await User.findOne({ email });
   if (user) {
      const accessToken = await generateAccessTokenFunction(user._id);
      user.password = undefined;
      console.log(accessToken);
      return res
         .status(200)
         .cookie("accessToken", accessToken, options)
         .json(new ApiResponse(200, user, "User logged in successfully"));
   }
   const generatedPassword = Math.random().toString(36).slice(-8);
   const userCreated = await User.create({
      username,
      email,
      password: generatedPassword,
      avatar: imageUrl,
   });
   if (!userCreated) {
      throw new ApiError(500, "Error while registering user");
   }
   userCreated.password = undefined;
   const accessToken = await generateAccessTokenFunction(userCreated._id);
   console.log(accessToken);
   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, userCreated, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
   if (!req.user?.id) {
      throw new ApiError(403, "You can only logout your own profile");
   }
   return res
      .status(200)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const uploadAvatar = asyncHandler(async (req, res) => {
   try {
      console.log(req.file);
      const avatarLocalPath = await req.file.path;
      if (!avatarLocalPath) {
         throw new ApiError(500, "Error while uploading avatar");
      }
      console.log(avatarLocalPath);
      const { _id } = req.body;
      console.log(_id);
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      console.log(avatar);
      if (!avatar) {
         // console.log("YESS");
         throw new ApiError(500, "Avatar File uploading error");
      }

      console.log(_id);
      const user = await User.findByIdAndUpdate(
         _id,
         {
            $set: {
               avatar: avatar.url,
            },
         },
         { new: true }
      ).select("-password");
      console.log(user);
      return res
         .status(200)
         .json(new ApiResponse(200, user, "Avatar uploaded successfully"));
   } catch (error) {
      return new ApiError(500, "Error while uploading avatar");
   }
});

const updateUser = asyncHandler(async (req, res) => {
   console.log(req.params.id);
   console.log(req.user.id);
   if (req.user.id !== req.params.id) {
      return new ApiError(403, "You can only update your own profile");
   }
   try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      }).select("-password");
      res.status(200).json(
         new ApiResponse(200, user, "User updated successfully")
      );
   } catch (error) {
      new ApiError(500, "Error while updating user");
   }
});

const deleteUser = asyncHandler(async (req, res) => {
   if (req.user?.id) {
      const user = await User.findByIdAndDelete(req.user.id);
      return res
         .status(200)
         .cookieClear("accessToken", options)
         .json(new ApiResponse(200, user, "User deleted successfully"));
   } else {
      const user = await User.findById(req.user.id);
      return res
         .status(200)
         .json(new ApiResponse(200, user, "User Not Deleted"));
   }
});
export {
   registerUser,
   loginUser,
   googleLogin,
   uploadAvatar,
   updateUser,
   deleteUser,
   logoutUser,
};
