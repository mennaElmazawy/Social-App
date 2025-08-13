import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .max(20, "max char 20")
      .min(3, "min char 3"),
    email: zod
      .string()
      .nonempty("email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email format"
      ),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: zod.string().nonempty("rePassword is required"),
    gender: zod
      .string()
      .nonempty("gender is required")
      .regex(/^(male|female)$/, "invalid gender"),
    dateOfBirth: zod
      .string()
      .nonempty("date of birth is required")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "invalid date format"),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword
    },
    {
      message: "Passwords must match",
      path: ["rePassword"]
    }
  );

export default function Register() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(errors);
  async function handleRegister(value) {
    let response = await axios
      .post("https://linked-posts.routemisr.com/users/signup", value)
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed, please try again.");
      });
    console.log(response);
    if (response?.data?.message === "success") {
      toast.success("Registration successful!");
      navigate("/login");
    }
  }

  return (
    <div>
      

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-sm mx-auto"
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="menna"
          />
          
          {errors.name && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.name.message}
            </p>
          )}
        </div>

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
        <div className="mb-5">
          <label
            htmlFor="repassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            repassword
          </label>
          <input
            {...register("rePassword")}
            type="password"
            id="repassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
          />
           {errors.rePassword && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.rePassword.message}
            </p>
          )}
        </div>

        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          gender
        </label>
        <select
          {...register("gender")}
          id="gender"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
         {errors.gender && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.gender.message}
            </p>
          )}
        <div className="mb-5">
          <label
            htmlFor="dateOfBirth"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter date of birth
          </label>
          <input
            {...register("dateOfBirth")}
            type="date"
            id="dateOfBirth"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           
          />
           {errors.dateOfBirth && (
            <p
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 
                 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
               {errors.dateOfBirth.message}
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
