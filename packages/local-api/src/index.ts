import express from "express";
import http from "http-proxy-middleware";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.static("/public"));

app.get("/", (req, res) => {
  console.log("get on /");
  res.send("/");
});

app.get("/cells", (req, res) => {
  console.log("get on /cells");
  res.send("/cells");
});

app.post("/cells", (req, res) => {
  console.log("post on /cells");
  res.send("/cells");
});

export const serve = (port: number, filename: string, dir: string) => {
  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        resolve(undefined);
        console.log("Server started on port " + port);
      })
      .on("error", reject);
  });
};
