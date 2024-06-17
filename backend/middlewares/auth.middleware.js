import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
   try {
      const token = req.cookies.accessToken;
      console.log(token);
      if (!token) {
         throw new ApiError(401, "Unathorized Request");
      }
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken._id).select("-password");
      if (!user) {
         throw new ApiError(401, "Invalid Access Token");
      }
      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
   }
});
