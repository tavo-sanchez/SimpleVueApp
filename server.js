//Include the express server module
const express = require("express");
const app = express();

//Include the file system module
const fs = require("fs");
const path = require("path");
const serialize = require('serialize-javascript');
// For server-side rendering
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')
let renderer

//Load the index.html
const indexHtml = (() => {
  return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8")
})();

if (isProd) {
  app.use("/", express.static(path.resolve(__dirname, "./dist")));
} else {
  app.use("/dist", express.static(path.resolve(__dirname, "./dist")));
}

if (isProd) {
  const bundlePath = path.resolve(__dirname, './dist/server/main.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  //pass app (server variable) to the dev-server module
  require("./build/dev-server")(app, bundle => {
    // Add callback, every time the server bundle changes we will receive the new bundle and
    // generate a new renderer
    renderer = createBundleRenderer(bundle)
  });
}

// Server-side rendering
app.get("*", (request, response) => {
  const context = { url: request.url };
  renderer.renderToString(context, (err, html) => {
    if(err) {
      return response.status(500).send('Server Error')
    }
    html = indexHtml.replace('{{ APP }}', html)
    html = html.replace('{{ STATE }}',
      `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
    response.write(html)
    //response.write(indexHtml);
    response.end();
  })
});

/* // Client-side rendering
app.get("*", (request, response) => {
  response.write(indexHtml);
  response.end();
}); */

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});



