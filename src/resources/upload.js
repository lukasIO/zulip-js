const api = require('../api');

function upload(config) {
  const baseURL = `${config.apiURL}/user_uploads`;
  return {
    file: (fileList) => {
        return api(baseURL, config, 'POST', fileList, true);
    }, 
  };
}

module.exports = upload;
