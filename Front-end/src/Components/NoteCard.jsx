import React from 'react'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";

const NoteCard = ({note, readHandler, editHandler, deleteHandler, handleWishlist}) => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={readHandler} className='min-w-[338px] sm:min-w-[400px]  sm:w-1/2 lg:w-1/3 h-[102px] border-r-8 px-6'>
        <div className='flex justify-between items-center cursor-pointer hover:-translate-y-1 transition duration-500'>
            <div className='w-[140px] h-[95px] flex flex-col justify-between py-1 text-neutral-700'>
                <h2 className='text-2xl tracking-wide'>{note.title.length > 8 ? `${note.title.slice(0, 8)}...` : note.title}</h2>
                {/* CRUD icons */}
                <div className='flex text-xl space-x-4 cursor-default'>
                    {
                      note.InWishlist ?
                      <IoIosHeart
                                className='cursor-pointer'
                                onClick={(e) => { stopPropagation(e); handleWishlist();}}
                      />
                      :
                      <IoIosHeartEmpty
                                className='cursor-pointer hover:text-black'
                                onClick={(e) => { stopPropagation(e); handleWishlist();}}
                      /> 
                    }
                    <PiPencilSimpleLineLight onClick={(e) => { stopPropagation(e); editHandler();}} className='cursor-pointer hover:text-blue-400'/>
                    <AiFillDelete onClick={(e) => {stopPropagation(e); deleteHandler();}} className='text-red-600 cursor-pointer hover:text-red-700' />
                </div>
            </div>
            <img className='w-[160px] h-[100px] rounded-lg object-cover border' src={note.image ? `${BASE_URL}/${note.image}` 
                : 
                "https://cdn.dribbble.com/users/2527679/screenshots/18000242/media/1242c9459fb71d992c3f0b200cf68e32.jpg?resize=400x0"}
                alt="loading" />
        </div>
    </div>
  )
}

export default NoteCard