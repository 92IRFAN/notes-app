import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxUpdate } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleNote, updateNote } from "../../../actions/NotesAction"
import Spinner from "../../Components/Spinner";

const UpdateNote = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const ImageInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, notesData } = useSelector((state) => state.notes);

  const handleImage = () => {
    if (ImageInput?.current) {
      ImageInput.current.click();
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Invalid file type. Please select an image.");
    }
  };

  useEffect(() => {
    dispatch(getSingleNote(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (notesData) {
      setImage(notesData.image ? `${BASE_URL}/${notesData.image}` : null);
      setTitle(notesData.title);
      setNote(notesData.note);
    }
  }, [notesData]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    if (ImageInput?.current?.files[0]) {
      formData.append("image", ImageInput.current.files[0]);
    }

    dispatch(updateNote({ id: notesData._id, data: formData }))

     if (notesData) {
      navigate(`/readNote/${id}`)
    }
    
    setImage(null);
    setTitle("");
    setNote("");
    if (ImageInput?.current) {
      ImageInput.current.value = null;
    }
  };


  return (
    
      loading ? <Spinner/> :
      <form onSubmit={handleUpdate}>
      <div className="mt-4">
        <div className="w-[95%] mx-auto">
          <div className="flex sm:w-1/2 overflow-hidden bg-white rtl:flex-row-reverse">
            {/* Hidden file input */}
            <input
              ref={ImageInput}
              type="file"
              accept=".jpg,.png,.jpeg"
              className="hidden"
              onChange={onImageChange}
            />

            {/* Image preview or upload button */}
            {image ? (
              <div className="mb-2 relative group">
                <img
                  className="w-[110px] h-[60px] rounded-lg object-cover"
                  src={image}
                  alt="Uploaded preview"
                />
                <button
                  type="button"
                  aria-label="Upload an image"
                  onClick={handleImage}
                  className="absolute bottom-0 left-0 rounded-b-md w-full h-1/2 text-neutral-100 text-sm bg-neutral-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                aria-label="Upload an image"
                onClick={handleImage}
                className="mr-1 flex w-32 flex-col items-center mb-2 px-4 py-2 font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 sm:px-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                <span className="text-[11px] text-neutral-400">Add image</span>
              </button>
            )}

            {/* Title input */}
            <div className="h-full w-full border-none outline-none">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="h-14 w-full pl-4 text-2xl font-bold outline-none"
                type="text"
                placeholder="Title"
                required
              />
            </div>
          </div>

          {/* Note textarea */}
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="14"
              placeholder="Write your note"
              className="border-stroke focus:border-primary active:border-primary disabled:bg-gray-2 w-full rounded-md border bg-transparent p-3 pl-12 text-neutral-600 outline-none transition disabled:cursor-default scrollbar"
            ></textarea>
            <span className="absolute left-4 top-[18px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.56622 3.23223C2.03506 2.76339 2.67094 2.5 3.33398 2.5H9.16732C9.62755 2.5 10.0006 2.8731 10.0006 3.33333C10.0006 3.79357 9.62755 4.16667 9.16732 4.16667H3.33398C3.11297 4.16667 2.90101 4.25446 2.74473 4.41074C2.58845 4.56702 2.50065 4.77899 2.50065 5V16.6667C2.50065 16.8877 2.58845 17.0996 2.74473 17.2559C2.90101 17.4122 3.11297 17.5 3.33398 17.5H15.0006C15.2217 17.5 15.4336 17.4122 15.5899 17.2559C15.7462 17.0996 15.834 16.8877 15.834 16.6667V10.8333C15.834 10.3731 16.2071 10 16.6673 10C17.1276 10 17.5006 10.3731 17.5006 10.8333V16.6667C17.5006 17.3297 17.2373 17.9656 16.7684 18.4344C16.2996 18.9033 15.6637 19.1667 15.0006 19.1667H3.33398C2.67094 19.1667 2.03506 18.9033 1.56622 18.4344C1.09738 17.9656 0.833984 17.3297 0.833984 16.6667V5C0.833984 4.33696 1.09738 3.70107 1.56622 3.23223Z"
                    fill="#9CA3AF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.5 2.5C12.96 2.5 13.3333 2.8731 13.3333 3.33333V6.66667H16.6667C17.1269 6.66667 17.5 7.03976 17.5 7.5C17.5 7.96024 17.1269 8.33333 16.6667 8.33333H13.3333V11.6667C13.3333 12.1269 12.96 12.5 12.5 12.5C12.0398 12.5 11.6667 12.1269 11.6667 11.6667V8.33333H8.33333C7.8731 8.33333 7.5 7.96024 7.5 7.5C7.5 7.03976 7.8731 6.66667 8.33333 6.66667H11.6667V3.33333C11.6667 2.8731 12.0398 2.5 12.5 2.5Z"
                    fill="#9CA3AF"
                  />
                </g>
              </svg>
            </span>
          </div>

          {/* Button */}
          <div class="flex justify-end mt-2">
            <button class="flex transform items-center rounded-md bg-blue-600 px-4 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <RxUpdate className="font-extrabold text-lg mr-2" />
              <span class="font-normal">{loading ? "Updating..." : "Update"}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
    
  );
};

export default UpdateNote;
