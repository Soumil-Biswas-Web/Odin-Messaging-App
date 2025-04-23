import multer from "multer";

export default function errorCatcher (err, req, res, next) {
    console.error(err.stack);
  
    // If it's a Multer error
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
  
    // If it's a general error (like from fileFilter)
    if (err) {
      return res.status(400).json({ message: err.message || 'Something went wrong!' });
    }
  
    next();
};