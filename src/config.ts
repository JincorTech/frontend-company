const { API_HOST, API_PREFIX } = process.env;

export default {
  apiPrefix: API_PREFIX || '/api/v1',
  apiHost: API_HOST || 'https://companies-api.jincor.com'
};
