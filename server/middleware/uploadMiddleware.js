const multer = require('multer');

// Configure memory storage so PDF buffers can be passed directly to pdf-parse
const storage = multer.memoryStorage();

// File filter to restrict uploads strictly to PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum file size limit
  },
});

module.exports = upload;