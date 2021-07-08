import { Router } from "express";
import multer from "multer";

import { storage } from "@shared/utils/uploads";
import UploadFilesController from "../controllers/UploadFilesController";

const uploadFilesRouter = Router();
const uploadFilesCtrl = new UploadFilesController();

const upload = multer({ storage });

uploadFilesRouter.post("/", upload.single("file"), uploadFilesCtrl.create);

export default uploadFilesRouter;
