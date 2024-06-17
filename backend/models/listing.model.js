import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      required: true,
      trim: true,
   },
   address: {
      type: String,
      required: true,
   },
   regularPrice: {
      type: String,
      required: true,
   },
   discountPrice: {
      type: Number,
      required: true,
   },
   bathrooms: {
      type: Number,
      required: true,
   },
   bedrooms: {
      type: Number,
      required: true,
   },
   furnished: {
      type: Boolean,
      required: true,
   },
   parking: {
      type: Boolean,
      required: true,
   },
   type: {
      type: String,
      required: true,
   },
   offer: {
      type: Boolean,
      default: false,
      required: true,
   },
   imageUrls: {
      type: Array,
      required: true,
   },
   userRef: {
      type: String,
      required: true,
   },
});

export const Listing = mongoose.model("Listing", listingSchema);
