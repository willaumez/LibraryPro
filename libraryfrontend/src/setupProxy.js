const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );

};

