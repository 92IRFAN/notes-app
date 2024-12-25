import React, { useEffect } from "react";
import { CgFileDocument } from "react-icons/cg";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteNote, getSingleNote, toggleWishlist } from "../../../actions/NotesAction";
import Spinner from "../../Components/Spinner";

const ReadNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const { loading, notesData, trigger } = useSelector((state) => state.notes);

  // Fetch notes on component mount
  useEffect(() => {
    dispatch(getSingleNote(id));
  }, [dispatch, trigger]);

  if (loading) {
    return <Spinner/>;
  }

  const handleDelete = (id_to_delete) => {
    dispatch(deleteNote(id_to_delete))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => alert(err));
  };

  return (
    <section>
      <div className="flex justify-between items-center px-4  sm:px-12 sm:py-4 pt-6">
        {/* Button to Navigate on Home Page  */}
        <button
          onClick={() => navigate("/")}
          className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center hover:shadow-lg hover:scale-105 cursor-pointer transition duration-300"
        >
          <svg
            className="text-blue-600"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Button to Navigate on searchNotes Page  */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/searchNotes")}
            className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:underline focus:outline-none"
          >
            <CgFileDocument className="text-2xl mr-1" />
            <span className="mx-1 font-normal">Notes</span>
          </button>
        </div>
      </div>

      {/* Section to read the actual note */}
      <div className="w-[95%] border mb-2 border-black/20 mx-auto mt-4 rounded-md ">
        <div className="p-6 pl-6 sm:p-8">
          <div className="flex items-center justify-between sm:mb-8">
            <h2 className="text-2xl font-bold">{notesData.title}</h2>
            {/* Buttons to perform the CRUD operations against the note  */}
            <div className="flex text-2xl space-x-6 sm:mr-4">
              {
                notesData.InWishlist ?
                
                <IoIosHeart className="cursor-pointer" onClick={() => dispatch(toggleWishlist(notesData._id))}/>
                :
                <IoIosHeartEmpty className='cursor-pointer hover:text-black'
                onClick={() => dispatch(toggleWishlist(notesData._id))}/>

              }
              <PiPencilSimpleLineLight onClick={() => navigate(`/updateNote/${notesData._id}`)} className="cursor-pointer hover:text-blue-400" />
              <AiFillDelete
                className="text-red-600 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(notesData._id)}
              />
            </div>
          </div>
          <div className="h-72 overflow-auto scrollbar">
            <p className="text-neutral-600 pt-4 sm:p-4 text-sm leading-relaxed">
              {notesData.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadNote;
