import React from "react";
import { CgMenuRight } from "react-icons/cg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../actions/UserAction";

const Navbar = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  
  const { userData } = useSelector((state) => state.user);
  const { enteries, wishList } = useSelector((state) => state.notes);

  const handleLogout = () => {
    dispatch(LogOut())
  }

  return (
    <>
      <nav className="border-b border-black/40 p-2 px-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
  
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={userData.image ? `${BASE_URL}/${userData.image}` 
                : 
                "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"}
                alt="loading"
              />
             
            <div className="dark:text-white">
              <div className="text-lg font-bold capitalize">
                {userData.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {enteries} Entries
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {wishList} Wishlist
              </div>
            </div>
          </div>

          <div className="text-3xl flex items-center space-x-2 relative group">
            <div className="text-white flex justify-center items-center mr-2 cursor-pointer space-x-2">
              <div className="text-black/40 font-bold">
                <CgMenuRight />
              </div>
            </div>

            <div className=" w-[180px] h-[140px] text-lg absolute right-0 top-11 z-10 hidden mt-2 bg-white border border-gray-200 rounded-md shadow-lg group-hover:block">
              <div className="flex flex-col justify-center space-y-4 pt-2">
                <button className="w-full px-4 py-2 text-left text-red-600 text-sm mt-2 hover:bg-red-100 flex items-center justify-center pr-6">
                  <span className="mr-2 text-xl">
                    <RiDeleteBin6Line />
                  </span>{" "}
                  Delete Account
                </button>
                <hr />
                <button onClick={handleLogout} className="flex items-center justify-center bg-gray-200 w-[80%] mx-auto rounded-md transition px-4 py-2 text-left text-gray-700 hover:bg-gray-300">
                  <span className="mr-1 text-xl">
                    <AiOutlineLogout />
                  </span>{" "}
                  <span className="ml-2 pr-2 text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
