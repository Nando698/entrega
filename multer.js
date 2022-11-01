import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 100000).toString());
  },
});

const upload = multer({ storage });

export { storage, upload };
