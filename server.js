//Include the express server module
const express = require("express");
const app = express();

//Include the file system module
const fs = require("fs");
const path = require("path");

//Load the index.html
const indexHtml = (() => {
  return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8")
})();

app.use("/dist", express.static(path.resolve(__dirname, "./dist")));

//pass app (server variable) to the dev-server module
require("./build/dev-server")(app);

app.get("*", (request, response) => {
  response.write(indexHtml);
  response.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});



