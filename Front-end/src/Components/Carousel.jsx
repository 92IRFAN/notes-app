import React from "react";
import NoteCard from "./NoteCard";
import Spinner from './Spinner'
import { CgFileDocument } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, toggleWishlist } from "../../actions/NotesAction";

const Carousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, notesData } = useSelector((state) => state.notes);  

  if (loading) {
    return <div className= 'mt-16'>
    <Spinner />;
    </div>
  }

  return (
    <>
      <div className="flex border-b border-black/40 px-8 py-4 pt-8 overflow-x-scroll scrollbar">
        {notesData.length > 0 ? (
          // Reverse the array before mapping
          [...notesData].reverse().map(
            (
              note,
              index 
            ) => (
              <NoteCard
                key={index}
                note={note}
                readHandler={() => navigate(`/readNote/${note._id}`)}
                editHandler={() => navigate(`/updateNote/${note._id}`)}
                deleteHandler={() => dispatch(deleteNote(note._id))}
                handleWishlist={() => dispatch(toggleWishlist(note._id))}
              />
            )
          )
        ) : (
          <div className="grow flex items-center justify-center gap-6">
              <p className="text-center text-neutral-500 text-lg sm:text-3xl my-8">
              Start with a Note! 
              </p>
              <GiNotebook className="text-neutral-400 text-6xl"/>
          </div>
        )}
      </div>

      <div className="flex justify-end -mb-2 mr-4 lg:mr-8 mt-4">
        <button
          onClick={() => navigate("/searchNotes")}
          className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:underline focus:outline-none"
        >
          <CgFileDocument className="text-2xl mr-1" />
          <span className="mx-1 font-normal">Notes</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
