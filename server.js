const express = require('express')
const next = require('next')

const { createProxyMiddleware } = require('http-proxy-middleware')
const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()
    server.use(
      createProxyMiddleware("/api", {
        target: "http://121.196.27.34:3000",
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      })
    );
    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })