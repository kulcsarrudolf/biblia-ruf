const fs = require("fs");

const readJSONFile = async (path) => {
  let rawdata = fs.readFileSync(path);
  let data = JSON.parse(rawdata);

  return data;
};

module.exports = {
  readJSONFile,
};
