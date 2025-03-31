// import dotenv from "dotenv";
// dotenv.config(); 

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; 
// import multer from "multer";
// import multerS3 from "multer-s3";

// // here we need credential then able to upload ....................
// const s3 = new S3Client({
//   region: process.env.BUCKET_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_KEY,
//   },
// });



// const uploadUser = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "private",
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       cb(null, `Uploads/User/${Date.now()}_${file.originalname}`);
//     },
//   }),
// });





// export const uploadUserFile = (req, res, next) => {
//   uploadUser.fields([{ name: "upload_user_file", maxCount: 15 }])(req, res, (err) => {
//     if (err) {
//       return res.status(422).json({ message: err.message, response: null });
//     }
//     next();
//   });
// };






// i am commenting this because it will not work without credential 