const https = require("https");
const fs = require("fs");

const NPM_RC_FILE =
  "https://gist.githubusercontent.com/wayou/baa18849de3424db5d7ca24e94645c25/raw/84910c72f9e600d665e088deafbcd8c7cedcf9d4/.npmrc";

const YARN_RC_FILE =
  "https://gist.githubusercontent.com/wayou/a1a6fb1fc5153bc20829c7b2700ec0bc/raw/0a33e57630475326aaf6f19b5501605f4afe640e/.yarnrc";

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

module.exports = function(type) {
  let fileUrl = NPM_RC_FILE,
    fileName = ".npmrc";
  if (type === "yarn") {
    fileUrl = YARN_RC_FILE;
    fileName = ".yarnrc";
  }
  fetchFile(fileUrl, fileName, function() {
    console.log(`${fileName} created`);
  });
};
