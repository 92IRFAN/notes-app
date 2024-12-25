import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../../actions/NotesAction";
import dayjs from "dayjs";
import Spinner from '../../Components/Spinner'

const SearchNotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch, navigate])

  const {notesData, loading} = useSelector(state => state.notes) 

  if (loading) {
    return <div className= 'mt-16'>
    <Spinner />;
    </div>
  }

  // Filter notes based on the search input
  const filteredNotes = notesData.filter((note) =>
    note.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <section className="my-4">
      <div>
        <div className="flex justify-between items-center px-6 sm:px-12 py-4 border-b border-black/40">
          <div className="relative flex w-[220px] sm:w-[40%]  items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-11 text-md text-gray-700 placeholder-gray-400/70 focus:border-neutral-400 focus:outline-none rtl:pl-11 rtl:pr-5"
            />
            <button className="absolute right-0 focus:outline-none cursor-default">
              <IoIosSearch className="text-2xl mr-4 text-neutral-400" />
            </button>
          </div>  
          <button onClick={() => navigate("/")} className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-200 rounded-full flex items-center justify-center hover:shadow-lg hover:scale-105 cursor-pointer transition duration-300">
              <svg className="text-blue-600" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
        </div>

        <section className="container mx-auto px-4">
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                  <table className="min-w-full  dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3 text-normal font-bold tracking-wide text-neutral-600">
                            <CgFileDocument className="text-3xl"/>
                            <span className="text-sm sm:text-lg">All Notes</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="flex justify-end px-4 py-3.5 text-right text-normal font-bold text-neutral-600 rtl:text-right dark:text-gray-400"
                        >
                            <div className="flex items-center gap-x-3 text-normal font-bold text-neutral-600">
                            <CiCalendarDate className="text-3xl -m-2"/>
                            <span className="text-sm sm:text-lg">Date Created</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* table body  */}
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {filteredNotes.map((note, index) => (
                        <tr key={index} onClick={() => navigate(`/readNote/${note._id}`)} className="cursor-pointer hover:bg-neutral-100">
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-gray-800">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                  </svg>
                                </div>

                                <div>
                                  <h2 className="font-normal text-lg text-black">
                                    {note.title}
                                  </h2>
                                  <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                                    {note.note.length > 20 ? `${note.note.slice(0, 20)} ...` : note.note}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm tracking-wide text-gray-500 dark:text-gray-300">
                            {dayjs(note.createdAt).format("MMM DD, YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SearchNotes;
