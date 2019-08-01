'use strict';


function api(baseUrl, config, method, params, isFile = false) {
  var url = baseUrl;
  var auth = btoa(config.username + ':' + config.apiKey);
  var authHeader = 'Basic ' + auth;
  var options = { method: method, headers: { Authorization: authHeader } };
  if (method === 'POST') {
    if(!isFile) {
      options.body = new FormData();
      Object.keys(params).forEach(function (key) {
        options.body.append(key, params[key]);
      });
    } else {
      options.body = new FormData();
      options.body.append("files", params);
    }
  } else if (params) {
    var generateQueryParam = function generateQueryParam(key) {
      return key + '=' + params[key];
    };
    var queryParams = Object.keys(params).map(generateQueryParam);
    url = url + '?' + queryParams.join('&');
  }
  return fetch(url, options).then(function (res) {
    return res.json();
  });
}

module.exports = api;