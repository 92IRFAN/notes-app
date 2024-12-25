import multer from "multer";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
 
const fileUpload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "." + ext);
    },
    }),

    fileFilter: (req, file, cb) => {
        const IsValid = !!MIME_TYPE_MAP[file.mimetype];
        const error = IsValid ? null : new Error ('invalid file type')
        cb(error, IsValid)
    }
});

export default fileUpload;
