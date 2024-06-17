import multer from "multer";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/tmp/");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   },
});

// Create the multer instance
export const upload = multer({ storage: storage });

// export const upload = multer({ storage });
