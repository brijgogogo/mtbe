const pathUtils = require("path");
const fs = require("fs");

const imgDir = pathUtils.resolve(__dirname, "..", "public", "img");
const newImagesDir = pathUtils.join(imgDir, "new");

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);
if (!fs.existsSync(newImagesDir)) fs.mkdirSync(newImagesDir);

const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
const exists = promisify(fs.exists);

module.exports = {
  saveNewFile: async (image) => {
    const path = newImagesDir + "/" + image.originalFilename;
    console.log("save to " + path);
    // save file
  },
  moveFile: async (fileName, newDir, newFileName) => {
    const dirExists = await exists(newDir);
    if (!dirExists) {
      await mkdir(newDir);
    }

    const oldPath = pathUtils.join(newImagesDir, fileName);
    const newPath = pathUtils.join(newDir, newFileName);

    await rename(oldPath, newPath);
  },
};
