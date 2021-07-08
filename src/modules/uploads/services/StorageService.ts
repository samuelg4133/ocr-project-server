import fs from "fs";
import path from "path";

export default class StorageService {
  public getFile(): string {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "tmp",
      "uploads"
    );

    const files = fs.readdirSync(filePath);

    return path.join(filePath, files[0]);
  }
}
