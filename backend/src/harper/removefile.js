const fs = require('fs').promises;

const removeFile = async (path) => {
  let fileExists;

  try {
    await fs.access(path);
    fileExists = true;
  } catch (e) {
    fileExists = false;
  }

  if (fileExists) {
    try {
      await fs.unlink(path);
      console.log(`File at ${path} has been removed`);
    } catch (err) {
      console.error(`Error removing file at ${path}:`, err);
    }
  }
};

module.exports = removeFile;
