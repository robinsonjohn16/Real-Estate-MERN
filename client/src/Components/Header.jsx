import React, { useEffect } from "react";
import { useState } from "react";
import { toggleMode } from "../redux/mode/modeSlice";
import { deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile from "../Pages/Profile";

function Header() {
   const navigate = useNavigate();
   const { currentUser } = useSelector((state) => state.user);
   const { modeClass } = useSelector((state) => state.mode);
   const dispatch = useDispatch();
   const [profileMenu, setProfileMenu] = useState(false);
   useEffect(() => {
      if (modeClass) {
         document.documentElement.classList.remove("dark");
      } else {
         document.documentElement.classList.add("dark");
      }
   });
   const toggleDarkMode = () => {
      dispatch(toggleMode());
      if (modeClass) {
         document.documentElement.classList.remove("dark");
      } else {
         document.documentElement.classList.add("dark");
      }
   };

   const showProfileMenu = () => {
      setProfileMenu(!profileMenu);
      if (profileMenu) {
         document.getElementById("dropdown").classList.add("hidden");
      } else {
         document.getElementById("dropdown").classList.remove("hidden");
      }
   };
   const deleteProfile = async () => {
      dispatch(deleteUserStart());
      console.log(currentUser);
      if (!currentUser) {
         return;
      }
      try {
         await axios
            .delete(`http://localhost:4000/api/v1/users/delete`, {
               withCredentials: true,
            })
            .then(() => {
               dispatch(deleteUserSuccess());
               toggleModel();
               navigate("/");
            });
      } catch (error) {
         return;
      }
   };
   const signOut = async () => {
      try {
         await axios
            .post(
               `http://localhost:4000/api/v1/users/logout`,
               {},
               { withCredentials: true }
            )
            .then(() => {
               dispatch(deleteUserSuccess());
               navigate("/");
            });
      } catch (error) {
         return;
      }
   };
   const toggleModel = () => {
      document.getElementById("popup-modal").classList.toggle("hidden");
   };

   const profile = () => {
      navigate("/profile");
   };
   return (
      <div>
         <div
            id="popup-modal"
            tabindex="-1"
            class="hidden absolute top-[8vh] right-[35vw]"
         >
            <div class="relative p-4 w-full max-w-md max-h-full">
               <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                     type="button"
                     onClick={toggleModel}
                     class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                     data-modal-hide="popup-modal"
                  >
                     <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                     >
                        <path
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                     </svg>
                     <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                     <svg
                        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                     >
                        <path
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                     </svg>
                     <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                     </h3>
                     <button
                        onClick={deleteProfile}
                        data-modal-hide="popup-modal"
                        type="button"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                     >
                        Yes, I'm sure
                     </button>
                     <button
                        data-modal-hide="popup-modal"
                        type="button"
                        onClick={toggleModel}
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                     >
                        No, cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <header class="antialiased">
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
               <div class="flex flex-wrap justify-between items-center">
                  <div class="flex justify-between items-center">
                     <a href="https://flowbite.com" class="flex mr-4">
                        <img
                           src="https://flowbite.s3.amazonaws.com/logo.svg"
                           class="mr-3 h-8"
                           alt="FlowBite Logo"
                        />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                           Flowbite
                        </span>
                     </a>
                     <form
                        action="#"
                        method="GET"
                        class="hidden lg:block lg:pl-2 ml-[20vw]"
                     >
                        <label for="topbar-search" class="sr-only">
                           Search
                        </label>
                        <div class="relative mt-1 lg:w-96">
                           <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg
                                 class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 20 20"
                              >
                                 {" "}
                                 <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                 />{" "}
                              </svg>
                           </div>
                           <input
                              type="text"
                              name="email"
                              id="topbar-search"
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Search"
                           />
                        </div>
                     </form>
                  </div>
                  <div class="flex items-center lg:order-2">
                     {currentUser ? (
                        ""
                     ) : (
                        <button
                           type="button"
                           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                           SignUp
                           <svg
                              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                           >
                              <path
                                 stroke="currentColor"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                           </svg>
                        </button>
                     )}{" "}
                     <button
                        type="button"
                        onClick={toggleDarkMode}
                        data-dropdown-toggle="notification-dropdown"
                        class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                     >
                        {modeClass ? (
                           <svg
                              class="w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        ) : (
                           <svg
                              class="w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 fill-rule="evenodd"
                                 d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                                 clip-rule="evenodd"
                              />
                           </svg>
                        )}
                     </button>
                     {/* <!-- Dropdown menu --> */}
                     <button
                        type="button"
                        onClick={showProfileMenu}
                        class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown"
                     >
                        <span class="sr-only">Open user menu</span>
                        {currentUser ? (
                           <img
                              class="w-8 h-8 rounded-full"
                              src={currentUser.avatar}
                              alt="user photo"
                           />
                        ) : (
                           ""
                        )}
                     </button>
                     {/* <!-- Dropdown menu --> */}
                     <div
                        class="hidden absolute top-10 right-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="dropdown"
                     >
                        <div class="py-3 px-4">
                           <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                              {currentUser ? currentUser.username : ""}
                           </span>
                           <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                              {currentUser ? currentUser.email : ""}
                           </span>
                        </div>
                        <ul
                           class="py-1 text-gray-500 dark:text-gray-400"
                           aria-labelledby="dropdown"
                        >
                           <li onClick={profile}>
                              <a
                                 href="#"
                                 class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                              >
                                 My profile
                              </a>
                           </li>
                           <li onClick={toggleModel}>
                              <a
                                 href="#"
                                 class="block py-2 px-4 text-sm hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-400 text-red-400 dark:hover:text-white"
                              >
                                 Delete Profile
                              </a>
                           </li>
                        </ul>
                        <ul
                           class="py-1 text-gray-500 dark:text-gray-400"
                           aria-labelledby="dropdown"
                        >
                           <li onClick={signOut}>
                              <a
                                 href="#"
                                 class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                 Sign out
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </nav>
         </header>
      </div>
   );
}

export default Header;
