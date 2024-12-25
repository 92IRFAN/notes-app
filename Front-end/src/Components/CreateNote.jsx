import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../actions/NotesAction";

const CreateNote = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const ImageInput = useRef();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    formData.append("creator", userData.id);
    if (ImageInput?.current?.files[0]) {
      formData.append("image", ImageInput.current.files[0]);
    }

    dispatch(createNote(formData));

      // Reset form fields and inputs
      setImage(null);
      setTitle("");
      setNote("");
      if (ImageInput?.current) {
        ImageInput.current.value = null;
      }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              onChange={(e) => setNote(e.target.value)}
              value={note}
              rows="7"
              placeholder="Write your note"
              required
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
                    d="M16.6673 2.39909C16.4195 2.39909 16.1818 2.49754 16.0066 2.67278L8.25314 10.4262L7.81264 12.1882L9.57463 11.7477L17.3281 3.99427C17.5033 3.81903 17.6018 3.58135 17.6018 3.33352C17.6018 3.0857 17.5033 2.84802 17.3281 2.67278C17.1528 2.49754 16.9152 2.39909 16.6673 2.39909ZM14.8281 1.49427C15.3159 1.00647 15.9775 0.732422 16.6673 0.732422C17.3572 0.732422 18.0188 1.00647 18.5066 1.49427C18.9944 1.98207 19.2684 2.64364 19.2684 3.33352C19.2684 4.02341 18.9944 4.68498 18.5066 5.17278L10.7531 12.9262C10.5779 13.1014 10.3402 13.1998 10.0924 13.1998C10.0063 13.1998 9.91956 13.1864 9.8353 13.1596L7.78563 12.5636C7.51498 12.4824 7.33502 12.2734 7.25256 12.0024C7.17011 11.7314 7.18688 11.4364 7.29891 11.1751L7.89491 9.12542C7.94496 8.97964 8.0237 8.84603 8.1279 8.73122L15.8281 1.49427C15.828 1.49427 15.8281 1.49427 14.8281 1.49427Z"
                    fill="#9CA3AF"
                  />
                </g>
              </svg>
            </span>
          </div>
          {/* Button */}
          <div className="flex justify-end mt-2">
            <button className="flex transform items-center rounded-md bg-blue-600 px-4 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="2" width="4" height="20" fill="currentColor" />
                <rect x="2" y="10" width="20" height="4" fill="currentColor" />
              </svg>
              <span className="font-normal">Create</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateNote;
