
function api(baseUrl, config, method, params, isFile = false) {
  let url = baseUrl;
  const auth = btoa(`${config.username}:${config.apiKey}`);
  const authHeader = `Basic ${auth}`;
  const options = { method, headers: { Authorization: authHeader } };
  if (method === 'POST') {
    if (!isFile) {
      options.body = new FormData();
      Object.keys(params).forEach((key) => {
        options.body.append(key, params[key]);
      });
    } else {
      options.body = new FormData();
      options.body.append('file', params);
    }
  } else if (params) {
    const generateQueryParam = function generateQueryParam(key) {
      return `${key}=${params[key]}`;
    };
    const queryParams = Object.keys(params).map(generateQueryParam);
    url = `${url}?${queryParams.join('&')}`;
  }
  return fetch(url, options).then(res => res.json());
}

module.exports = api;