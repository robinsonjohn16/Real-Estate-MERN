import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateListing() {
   const userState = useSelector((state) => state.user.currentUser);
   const [listingImage, setListingImage] = React.useState([]);
   const [loading, setLoading] = React.useState(false);
   const [formData, setFormData] = React.useState({
      name: "",
      description: "",
      address: "",
      type: "",
      bathrooms: "",
      bedrooms: "",
      offer: false,
      furnished: false,
      parking: false,
      regularPrice: "",
      userRef: userState._id,
      discountPrice: "",
   });

   useEffect(() => {
      console.log("listingImage", listingImage);
      console.log(formData);
   }, [formData, listingImage]);

   const renderFileList = () => (
      <ol>
         {[...listingImage].map((f, i) => (
            <li className="text-gray-900 dark:text-white" key={i}>
               {f.name} - {f.type}
            </li>
         ))}
      </ol>
   );

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      try {
         setLoading(true);
         const Imagedata = new FormData();
         for (const key in formData) {
            Imagedata.append(key, formData[key]);
         }
         for (const file of listingImage) {
            Imagedata.append("images", file);
         }

         await axios
            .post("http://localhost:4000/api/v1/listing/create", Imagedata, {
               withCredentials: true,
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            })
            .then((res) => {
               console.log(res.data);
            })
            .catch((error) => {
               console.log("Something went wrong", error);
            })
            .finally(() => {
               setLoading(false);
            });
      } catch (err) {
         console.log(err);
         setLoading(false);
      }
   };

   return (
      <div>
         <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
               <h2 class="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-white">
                  Add a new product
               </h2>
               <form action="#">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                     <div class="sm:col-span-2">
                        <label
                           for="name"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Name
                        </label>
                        <input
                           type="text"
                           name="name"
                           required="true"
                           value={formData.name}
                           onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                           }
                           id="name"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="Name the listing"
                        />
                     </div>
                     <div class="sm:col-span-2">
                        <label
                           for="description"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Description
                        </label>
                        <textarea
                           id="description"
                           rows="2"
                           required="true"
                           value={formData.description}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 description: e.target.value,
                              })
                           }
                           class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="Describe the listing"
                        ></textarea>
                     </div>
                     <div class="sm:col-span-2">
                        <label
                           for="address"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Address
                        </label>
                        <textarea
                           required="true"
                           value={formData.address}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 address: e.target.value,
                              })
                           }
                           id="description"
                           rows="2"
                           class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="Provide the address"
                        ></textarea>
                     </div>
                     <div>
                        <label
                           for="category"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Category
                        </label>
                        <select
                           id="category"
                           required="true"
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 type: e.target.value,
                              })
                           }
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                           <option selected="">Select category</option>
                           <option value="sell">Sell</option>
                           <option value="rent">Rent</option>
                        </select>
                     </div>
                     <div className="flex justify-between mt-5">
                        <div class="flex items-center">
                           <input
                              id="parking"
                              type="checkbox"
                              onChange={(e) => {
                                 setFormData({
                                    ...formData,
                                    parking: e.target.checked,
                                 });
                              }}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           />
                           <label
                              for="default-checkbox"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                           >
                              Parking Spot
                           </label>
                        </div>
                        <div class="flex items-center">
                           <input
                              id="furnished"
                              type="checkbox"
                              value=""
                              onChange={(e) => {
                                 setFormData({
                                    ...formData,
                                    furnished: e.target.checked,
                                 });
                              }}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           />
                           <label
                              for="checked-checkbox"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                           >
                              Furnished
                           </label>
                        </div>
                        <div class="flex items-center">
                           <input
                              id="offer"
                              type="checkbox"
                              onChange={(e) => {
                                 setFormData({
                                    ...formData,
                                    offer: e.target.checked,
                                 });
                              }}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           />
                           <label
                              for="checked-checkbox"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                           >
                              Offer
                           </label>
                        </div>
                     </div>
                     {/* <div>
                        <label
                           for="offer"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Offer
                        </label>
                        <select
                           id="offer"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                           <option selected="">Is it an offer</option>
                           <option value="yes">Yes</option>
                           <option value="no">No</option>
                        </select>
                     </div> */}
                     {/* <div>
                        <label
                           for="offer"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Offer
                        </label>
                        <input
                           type="number"
                           name="offer"
                           id="offer"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="12"
                           required
                        />
                     </div> */}

                     <div class="w-full">
                        <label
                           for="beds"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           No. of Beds
                        </label>
                        <input
                           type="number"
                           name="beds"
                           value={formData.bedrooms}
                           onChange={(e) => {
                              setFormData({
                                 ...formData,
                                 bedrooms: e.target.value,
                              });
                           }}
                           id="beds"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="00"
                           required="true"
                        />
                     </div>
                     <div class="w-full">
                        <label
                           for="bathroom"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           No. of bathrooms
                        </label>
                        <input
                           type="number"
                           value={formData.bathrooms}
                           onChange={(e) => {
                              setFormData({
                                 ...formData,
                                 bathrooms: e.target.value,
                              });
                           }}
                           name="bathroom"
                           id="bathroom"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="00"
                           required="true"
                        />
                     </div>
                     <div class="w-full">
                        <label
                           for="regularPrice"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Regular price
                        </label>
                        <input
                           value={formData.regularPrice}
                           onChange={(e) => {
                              setFormData({
                                 ...formData,
                                 regularPrice: e.target.value,
                              });
                           }}
                           type="number"
                           name="regularPrice"
                           id="regularPrice"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="Regular price"
                           required="true"
                        />
                     </div>
                     <div class="w-full">
                        <label
                           for="discountPrice"
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                           Discounted price
                        </label>
                        <input
                           value={formData.discountPrice}
                           onChange={(e) => {
                              setFormData({
                                 ...formData,
                                 discountPrice: e.target.value,
                              });
                           }}
                           type="number"
                           name="discountPrice"
                           id="discountPrice"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="Discounted price"
                           required="true"
                        />
                     </div>
                     <div className="sm:col-span-2">
                        <label
                           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           for="user_avatar"
                        >
                           Upload file
                        </label>
                        <input
                           onChange={(e) => setListingImage(e.target.files)}
                           required="true"
                           class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                           aria-describedby="user_avatar_help"
                           id="user_avatar"
                           type="file"
                           accept="image/*"
                           multiple="true"
                        />
                        {renderFileList()}
                        {/* {lis.map((file, index) => (
                           <div key={index} style={{ marginBottom: "10px" }}>
                              <div>
                                 <img
                                    className="preview"
                                    src={file[index]}
                                    alt="Preview"
                                 />
                              </div>
                           </div>
                        ))} */}
                        {/* <div
                           class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                           id="user_avatar_help"
                        >
                           No. of Images Uploaded :
                        </div> */}
                     </div>
                  </div>
                  <button
                     // disabled={loading}
                     type="button"
                     onClick={handleSubmit}
                     class="inline-flex bg-blue-600 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                     {loading ? "Loading..." : "Create"}
                  </button>
               </form>
            </div>
         </section>
      </div>
   );
}

export default CreateListing;
