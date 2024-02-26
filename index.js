let http = require("http");
let url = require("url");
let fs = require("fs");

// create a server object
http
  .createServer(function (req, res) {
    // request the path from the url
    let u = url.parse(req.url, true);
    let filePointer = "";

    if (u.pathname === "/") {
      filePointer = "." + "/index.html";
    } else {
      filePointer = "." + u.pathname + ".html";
    }

    fs.readFile(filePointer, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(
          fs.readFileSync("404.html", function (err, data) {
            if (err) throw err;
            return data;
          })
        );
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
