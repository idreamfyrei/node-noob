// import {add,sub} from "./math.js";
import * as math from "../math.js";

//For 1st type of import
// console.log(add(1, 2));
// console.log(sub(1, 2));

//for second import
console.log(math.add(1, 2));
console.log(math.sub(1, 2));

//----------------------

/*
 * Http Server
 */

//* Create a log file to register every hit on server and log it. The operation is asynchronous

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.method} ${req.url}: New req received`;
  fs.appendFile("log.txt", log + "\n", (err) => {
    switch (req.url) {
      case "/": 
        break;
      case "/user":
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>User Page</h1>");
        res.end();
        break;
      default:
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>404 Page Not Found</h1>");
        res.end();
        break;
    }
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

//---------------------------------------------------------



