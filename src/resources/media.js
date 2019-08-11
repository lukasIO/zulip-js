const api = require('../api');

function getImg(config) {
  return {
    image: srcUrl => api(srcUrl, config, 'GET', null, true),
  };
}

module.exports = getImg;
