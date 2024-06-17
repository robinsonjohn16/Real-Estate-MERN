import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
} from "../redux/user/userSlice";

function Profile() {
   const dispatch = useDispatch();
   const userState = useSelector((state) => state.user.currentUser);
   const fileRef = useRef(null);
   const [avatar, setAvatar] = useState(undefined);
   const [showListingError, setShowListingError] = useState(null);
   const [userListings, setUserListings] = useState([]);

   const formDataImage = new FormData();
   const [formData, setFormData] = useState({
      username: userState.username,
      email: userState.email,
      password: "",
   });

   const showListings = async (e) => {
      e.preventDefault();
      try {
         setShowListingError(false);
         await axios
            .get(
               `http://localhost:4000/api/v1/listing/listings/${userState._id}`,
               { withCredentials: true }
            )
            .then((data) => {
               console.log(data.data?.message);
               console.log(data.message);
               setUserListings(data.data.message);
            })
            .catch((e) => {
               setShowListingError(true);
            });
      } catch (e) {
         setShowListingError(true);
      }
   };
   const handleImageChange = async () => {
      // console.log(avatar);
      formDataImage.append("avatar", avatar);
      formDataImage.append("_id", userState._id);
      console.log(formDataImage);
      try {
         dispatch(updateUserStart());
         await axios
            .post(
               "http://localhost:4000/api/v1/users/uploadAvatar",
               formDataImage,
               {
                  withCredentials: true,
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               }
            )
            .then((data) => {
               console.log(data.data.data);
               dispatch(updateUserSuccess(data.data.data));
            })
            .catch((err) => {
               dispatch(updateUserFailure(err.message));
            });
      } catch (error) {
         console.log(error);
         dispatch(updateUserFailure(error.message));
      }
   };
   useEffect(() => {
      if (avatar) {
         handleImageChange();
      }
   }, [avatar]);

   const handleUserUpdate = async (e) => {
      // console.log("form");
      e.preventDefault();
      try {
         // dispatch(updateUserStart());
         console.log(userState._id);
         await axios
            .put(
               `http://localhost:4000/api/v1/users/updateUser/${userState._id}`,
               formData,
               {
                  withCredentials: true,
               }
            )
            .then((data) => {
               console.log(data.data.data);
               dispatch(updateUserSuccess(data.data.data));
            })
            .catch((err) => {
               dispatch(updateUserFailure(err.message));
            });
      } catch (error) {
         console.log(error);
         dispatch(updateUserFailure(error.message));
      }
   };
   const deleteListing = async (id) => {
      try {
         await axios
            .delete(`http://localhost:4000/api/v1/listing/delete/${id}`, {
               withCredentials: true,
            })
            .then((data) => {
               console.log(data.data);
               setUserListings((prev) =>
                  prev.filter((listing) => listing._id !== id)
               );
            })
            .catch((err) => {
               console.log(err);
            });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="bg-gray-50 dark:bg-gray-900 h-full py-10">
         <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-5 text-center py-2 dark:text-white">
               Update Details
            </h1>
         </div>
         <form className="max-w-sm mx-auto">
            <div className="mb-5 flex justify-center align-middle">
               <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  ref={fileRef}
                  hidden
                  accept="image/*"
               />
               <img
                  onClick={() => fileRef.current.click()}
                  class="h-12 w-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={userState.avatar}
                  alt="Bordered"
               />
            </div>
            <div className="mb-5">
               <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Your Username
               </label>
               <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                     setFormData({ ...formData, username: e.target.value })
                  }
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="eg. Samay raina"
                  required
               />
            </div>

            <div className="mb-5">
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Your email
               </label>
               <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                     setFormData({ ...formData, email: e.target.value })
                  }
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
               />
            </div>
            <div className="mb-5">
               <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
               >
                  Your password
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                     setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               />
            </div>
            <button
               type="submit"
               onClick={handleUserUpdate}
               className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Update
            </button>
            <Link to={"/login"}>
               <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Already have an account?
               </p>
            </Link>
            <button
               onClick={showListings}
               className="text-center mx-auto my-4 text-m font-medium text-gray-900 dark:text-gray-300"
            >
               Show listings
            </button>
            {showListingError ? (
               <p className="text-center my-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Error Showing the listing
               </p>
            ) : (
               ""
            )}
         </form>

         {userListings.length > 0 ? (
            <div class="mx-auto w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
               <div class="flex items-center justify-between mb-4">
                  <h5 class="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">
                     Listings
                  </h5>
               </div>

               <div class="flow-root">
                  <ul
                     role="list"
                     class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                     {userListings.map((listing) => (
                        <li class="py-3 sm:py-4">
                           <div class="flex items-center">
                              <div class="flex-shrink-0">
                                 <img
                                    class="w-10"
                                    src={listing.imageUrls[0]}
                                    alt="Neil image"
                                 />
                              </div>
                              <div class="flex-1 min-w-0 ms-4">
                                 <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {listing.name}
                                 </p>
                                 <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {listing.address}
                                 </p>
                              </div>
                              {/* <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                 {listing.discountPrice}
                              </div> */}
                              <div class=" mx-2inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                 <button
                                    onClick={() => editListing(listing._id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                 >
                                    Edit
                                 </button>
                              </div>
                              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                 <button
                                    onClick={() => deleteListing(listing._id)}
                                    className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                 >
                                    Delete
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         ) : (
            " "
         )}
         {/* {userListings.length > 0 &&
            userListings.map((listigs) => {
               div;
            })} */}
      </div>
   );
}

export default Profile;
