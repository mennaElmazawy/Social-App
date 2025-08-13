import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";




const schema = zod.object({
  email: zod.string().nonempty("email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email format"),
  password: zod.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),


  
})
export default function Login() {
let {getUserData}=  useContext(UserContext);
  let navigate = useNavigate();
  let { register, handleSubmit, formState:{errors} } = useForm({
      resolver: zodResolver(schema),
    });
  async function handleLogin(value) {
    let response = await axios
      .post("https://linked-posts.routemisr.com/users/signin", value)
      .catch((err) => {
        console.log(err);
        toast.error("Login failed, please check your credentials.");
      });
      console.log(response);

      if (response?.data?.message === "success") {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        getUserData();
        navigate("/");}
  }

  return (
    <div>
      

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-sm mx-auto"
      >
       
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            
          />
          {errors.email && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
          />
           {errors.password && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.password.message}
            </p>
          )}
        </div>
       

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}
