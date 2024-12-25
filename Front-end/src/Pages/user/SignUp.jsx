import React, { useEffect, useRef, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../actions/UserAction";
import { reset as resetUserState } from "../../features/UserSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  
  const [image, setImage] = useState(null);

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // DOM manipulation via useRef
  const imageInput = useRef();

  const handleImage = () => {
    imageInput.current.click();
  };

  // Image storing in state
  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userData, error, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {

    if (error) {
      toast.error(message)
    } else if (userData) {
      toast.success(message || 'You have already Logged In');
      navigate("/");
    }

    dispatch(resetUserState());
  }, [userData, error]);

  // Form Submission
  const onSubmit = (data) => {
    const formData = new FormData(); // Converting form data in multipart/form-data format

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    dispatch(createUser(formData)); // action dispatch

    reset();
    setImage(null);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex min-h-screen flex-col justify-center bg-gray-100">
        <div className="relative py-3 sm:mx-auto sm:max-w-xl">
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-white px-16 py-12 shadow-lg sm:rounded-3xl">
            <div className="mx-auto max-w-md">
              <div className="flex flex-col items-center space-y-6">
                <input
                  ref={imageInput}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  className="hidden"
                  onChange={onImageChange}
                />
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={
                    image ||
                    "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
                  }
                  alt="avatar"
                />
                <button
                  type="button"
                  onClick={handleImage}
                  className="flex items-center rounded-full text-neutral-700 bg-neutral-200 px-6 py-2 font-medium tracking-wide hover:shadow-md focus:outline-none transition duration-300"
                >
                  <TbCameraPlus className="text-xl mr-2" />
                  <span className="font-normal text-sm">Add picture</span>
                </button>
              </div>

              <div className="divide-y divide-gray-200 mt-12">
                <div className="space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="focus:border-blue-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Name"
                    />
                    <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600">
                      Name
                    </label>
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="text"
                      className="focus:border-blue-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Email address"
                    />
                    <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600">
                      Email
                    </label>
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      className="focus:border-blue-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none"
                      placeholder="Password"
                    />

                    <label className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600">
                      Password
                    </label>
                    {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="mt-4 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      {loading ? "Loading..." : "Sign Up"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm tracking-wide">
              Already Registered?
              <span
                onClick={() => navigate("/signIn")}
                className="text-blue-600 font-normal ml-1 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
