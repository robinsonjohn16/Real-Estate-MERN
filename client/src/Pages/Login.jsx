import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth.jsx";
import {
   loginInFailure,
   loginInSuccess,
   loginInStart,
} from "../redux/user/userSlice.js";

function Login() {
   const navigate = useNavigate();
   const [formData, setFormData] = React.useState({
      email: "",
      password: "",
   });
   const dispatch = useDispatch();
   // const [loading, setLoading] = React.useState(false);
   // const [error, setError] = React.useState("");
   const { loading, error } = useSelector((state1) => state1.user);

   const handleRegister = async (e) => {
      e.preventDefault();
      // setLoading(true);
      console.log(formData);
      dispatch(loginInStart());
      const response = await axios
         .post("http://localhost:4000/api/v1/users/login", formData, {
            withCredentials: true,
         })
         .then((data) => {
            console.log(data.data.data);
            navigate("/");
            dispatch(loginInSuccess(data.data.data));
         })
         .catch((err) => {
            dispatch(loginInFailure(err.message));
            // setError(err.message);
            // console.log(err.message);
         });
      // .finally(() => setLoading(false));
   };
   return (
      <div className="bg-gray-50 dark:bg-gray-900 h-screen py-10">
         <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-5 text-center py-2 dark:text-white">
               Login
            </h1>
         </div>
         <form className="max-w-sm mx-auto">
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
                  required
               />
            </div>
            <div className="mb-5">
               <OAuth />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
               disabled={loading}
               onClick={handleRegister}
               type="submit"
               className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               {loading ? "Loading..." : "Submit"}
            </button>
            <Link to={"/register"}>
               <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Don't have an account?
               </p>
            </Link>
         </form>
      </div>
   );
}

export default Login;
