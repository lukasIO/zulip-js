
import { parse } from 'ini';

function parseConfigFile(strContent) {
  return parse(strContent)
    .then((parsedConfig) => {
        const config = {
        realm: parsedConfig.api.site,
        username: parsedConfig.api.email,
        apiKey: parsedConfig.api.key,
      };
      config.apiURL = `${parsedConfig.api.site}/api/v1`;
      return config;
    });
}

export default parseConfigFile;
