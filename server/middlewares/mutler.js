import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");

// import multer from "multer";

// const storage = multer.diskStorage({
//     destination:  (req, file, cb)=> {
//       cb(null,"")
//     },
//     filename: (req, file, cb)=> {
//       cb(null, file.originalname)
//     }
//   })

// export const singleUpload = multer({storage}).single("file");