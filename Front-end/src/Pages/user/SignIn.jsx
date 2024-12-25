import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { LogIn } from "../../../actions/UserAction"
import { useDispatch, useSelector } from "react-redux"
import { reset as resetUserState} from "../../features/UserSlice"
import { toast } from 'react-toastify';
import Spinner from "../../Components/Spinner"

const SignIn = () => {
  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "ali@gmail.com", // Prefilled value for the email input
      password: 123456, // Prefilled value for the password input
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing user state
  const { loading, userData, error, message } = useSelector((state) => state.user);

  useEffect(() => {

    if(error) {
      toast.error(message);
    }
    if(userData){
      toast.success(message || "You have already Logged In");
      navigate('/')
    }
    dispatch(resetUserState())

  }, [userData, error])

  const onSubmit = (data) => {
    dispatch(LogIn(data))    //  dispatching the SignIn action
    reset();
  };

  if(loading){
    return <Spinner/>
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="flex min-h-screen flex-col justify-center bg-gray-100 ">
      <div class="relative py-3 sm:mx-auto sm:max-w-xl">
        <div class="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div class="relative bg-white px-14 py-12 shadow-lg sm:rounded-3xl">
          <div class="mx-auto max-w-md">
            <div>
              <h1 className="text-center text-2xl font-bold mt-4 my-16">
                Sign In
              </h1>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="space-y-4 mt-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    autocomplete="off"
                    id="email"
                    name="email"
                    type="text"
                    class="focus:border-blue-600 text-normal mb-4 focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                    placeholder="Email address"
                  />
                  <label
                    for="email"
                    class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    {" "}
                    Email
                  </label>
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                </div>
                <div class="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    class="focus:border-blue-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                    placeholder="Password"
                  />
                  <label
                    for="password"
                    class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    {" "}
                    Password{" "}
                  </label>
                    {errors.password && (
                        <p className="text-red-500 text-xs">
                          {errors.password.message}
                        </p>
                    )}
                </div>
                <div class="relative">
                  <button
                    type="submit"
                    class=" mt-4 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p class="my-4 mt-8 mr-3 text-sm tracking-wide">
            Do you have an account?
            <span onClick={() => navigate('/signUp')} class="text-blue-600 font-normal ml-1 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
    </form>
  );
};

export default SignIn;
