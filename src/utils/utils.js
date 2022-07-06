const fs = require("fs");

const readJSONFile = async (path) => {
  try {
    let rawdata = fs.readFileSync(path);
    let data = JSON.parse(rawdata);

    return data;
  } catch (err) {
    const windowsPath = __dirname
      .replace("src\\utils", path)
      .replace("/", "\\");

    let rawdata = fs.readFileSync(windowsPath);
    let data = JSON.parse(rawdata);
    return data;
  }
};

module.exports = {
  readJSONFile,
};
