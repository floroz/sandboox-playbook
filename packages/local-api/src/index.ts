import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import fs from "fs";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    app.use(
      "/",
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const localClientPath = path.join(
      require.resolve("local-client/build/index.html")
    );
    app.use(express.static(path.dirname(localClientPath)));
  }

  app.get("/cells", (req, res) => {
    console.log("get on /cells");
    res.send("/cells");
  });

  app.post("/cells", (req, res) => {
    console.log("post on /cells");
    res.send("/cells");
  });

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        resolve(undefined);
        console.log("Server started on port " + port);
      })
      .on("error", reject);
  });
};
