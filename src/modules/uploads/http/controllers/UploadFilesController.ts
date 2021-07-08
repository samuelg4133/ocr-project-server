import StorageService from "@modules/uploads/services/StorageService";
import { Request, Response } from "express";
import { createWorker, createScheduler } from "tesseract.js";
import fs from "fs";

export default class UploadFilesController {
  public async create(request: Request, response: Response) {
    const storage = new StorageService();
    const file = storage.getFile();

    const worker = createWorker({
      logger: (m) => console.log(m),
    });

    const scheduler = createScheduler();

    (async () => {
      await worker.load();
      await worker.loadLanguage("por");
      await worker.initialize("por");
      await worker.recognize(file);
      scheduler.addWorker(worker);
      const { data } = await scheduler.addJob("getPDF", file);
      fs.writeFileSync(`${Date.now()}.pdf`, Buffer.from(data));
      await scheduler.terminate();
      await worker.terminate();
    })();

    return response.send({ file });
  }
}
