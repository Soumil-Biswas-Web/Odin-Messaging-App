import multer from "multer";
import path from "path";

// Configure storage for uploaded files
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 1024 * 1024 * 5, 
    files: 1  
  }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png image files are allowed!'));
    }
  },
});

export default upload;