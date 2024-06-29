import { Listing } from "../models/listing.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createListing = asyncHandler(async (req, res) => {
   console.log(req.body);
   const {
      name,
      description,
      address,
      type,
      bathrooms,
      bedrooms,
      offer,
      userRef,
      furnished,
      parking,
      regularPrice,
      discountPrice,
   } = req.body;
   if (!req.files || !req.files.images) {
      throw new ApiError(400, "No images uploaded");
   }
   // console.log(req.files);
   const { images } = req.files;
   // console.log("images", images);
   const imageUrl = [];

   for (let image in images) {
      console.log("imageData", images[image]);
      console.log("path", images[image]?.path);
      const imageRes = await uploadOnCloudinary(images[image]?.path);
      console.log(imageRes);
      imageUrl.push(imageRes?.url);
   }
   console.log(imageUrl);
   const listing = await Listing.create({
      name,
      description,
      address,
      type,
      bathrooms,
      bedrooms,
      offer,
      userRef,
      furnished,
      parking,
      regularPrice,
      discountPrice,
      imageUrls: imageUrl,
   });
   if (!listing) {
      throw new ApiError("Failed to create listing");
   }
   res.status(201).json(new ApiResponse(true, "Listing created successfully"));
});

const showUserListing = asyncHandler(async (req, res) => {
   console.log(req.params.id);
   if (req.user?.id !== req.params?.id)
      throw new ApiError(400, "You can only view your created listings");
   console.log("here");
   try {
      const listings = await Listing.find({ userRef: req.params.id });
      console.log(listings);
      if (!listings) {
         throw new ApiError(404, "Listings not Found");
      }
      return res.status(200).json(new ApiResponse(true, "Listings", listings));
   } catch (e) {
      throw new ApiError(500, "Error while getting your listing");
   }
});

const deleteUserListing = asyncHandler(async (req, res) => {
   if (!req.params.id) throw new ApiError(402, "No id provided");

   const listing = await Listing.findByIdAndDelete(req.params.id);
   if (!listing) {
      throw new ApiError(404, "Listing not found");
   }
   res.status(200).json(new ApiResponse(true, "Listing deleted successfully"));
});

const getUserListing = asyncHandler(async (req, res) => {
   if (!req.params.id) throw new ApiError(402, "No id provided");
   console.log(req.params.id);
   const listing = await Listing.findById(req.params.id);
   if (!listing) {
      throw new ApiError(404, "Listing not found");
   }
   res.status(200).json(
      new ApiResponse(true, "Listing Fetched Successfully", listing)
   );
});

const updateListing = asyncHandler(async (req, res) => {
   if (!req.params.id) throw new ApiError(402, "No id provided");
   if (!req.body) throw new ApiError(400, "No data provided");
   if (!req.files && !req.files.images) throw new ApiError(400, "No image");

   const { images } = req.files;
   const imageRes = await uploadOnCloudinary(images?.path);
   const newDict = {
      ...req.body,
      imageUrls: imageRes?.url,
   };
   const listing = await Listing.findByIdAndUpdate(req.params.id, newDict, {
      new: true,
   });
   return res
      .status(200)
      .json(new ApiResponse(true, "Listing updated", listing));
});

const showIndividualListing = asyncHandler(async (req, res) => {
   console.log(req.params.id);
   if (!req.params.id) throw new ApiError(402, "No id provided");
   const listing = await Listing.findById(req.params.id);
   if (!listing) {
      throw new ApiError(404, "Listing not found");
   }
   res.status(200).json(
      new ApiResponse(true, "Listing Fetched Successfully", listing)
   );
});

co;
export {
   createListing,
   showUserListing,
   deleteUserListing,
   getUserListing,
   updateListing,
   showIndividualListing,
};
