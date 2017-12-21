const { API_HOST, API_PREFIX } = process.env;

console.log('dont forget change host');

export default {
  apiPrefix: API_PREFIX || '/api/v1',
  apiHost: API_HOST || 'http://127.0.0.1:8080' // TODO console.log change host
};
