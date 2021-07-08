import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "tmp",
    "uploads"
  ),
  filename: (_, __, cb) => {
    cb(null, `${Date.now()}.png`);
  },
});
