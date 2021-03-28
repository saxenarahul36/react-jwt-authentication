const { createProxyMiddleware } = require("http-proxy-middleware");

const filter = (path) => path.match("^/api/*");

module.exports = function (app) {
  app.use(
    filter,
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      logLevel: "debug",
      debug: true,
      autoRewrite: true,
      fallowRedirects: false,
    })
  );
};
