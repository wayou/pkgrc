const https = require("https");
const fs = require("fs");
const pkg = require("./package.json");

const NPM_RC_FILE =
  "https://gist.githubusercontent.com/wayou/baa18849de3424db5d7ca24e94645c25/raw/.npmrc";

const YARN_RC_FILE =
  "https://gist.githubusercontent.com/wayou/a1a6fb1fc5153bc20829c7b2700ec0bc/raw/.yarnrc";

/**
 * download file
 * @param {*} url url to download from
 * @param {*} cb callback
 */
function fetchFile(url, fileName, cb) {
  const file = fs.createWriteStream(fileName);
  https
    .get(url, function(response) {
      const { statusCode } = response;
      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        file.close();
        return;
      }

      response.pipe(file);
      file.on("finish", function() {
        file.close(cb);
      });
    })
    .on("error", error => {
      console.error(`request error: ${error.message}`);
    });
}

module.exports = function(type = "npm") {
  if (type === "-v" || type === "-V" || type === "--version") {
    console.log(pkg.version);
    return;
  }
  type = type || "npm";
  let fileUrl = NPM_RC_FILE,
    fileName = ".npmrc";
  if (type === "yarn") {
    fileUrl = YARN_RC_FILE;
    fileName = ".yarnrc";
  } else if (type === "npm") {
    fileUrl = NPM_RC_FILE;
  } else {
    console.error("usage: pkgrc [npm|yarn]");
    return;
  }
  fetchFile(fileUrl, fileName, function() {
    console.log(`${fileName} created`);
  });
};
