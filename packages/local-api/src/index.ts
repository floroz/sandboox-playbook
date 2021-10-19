import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

import cellsRouter from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(express.json());
  app.use("/cells", cellsRouter(filename, dir));

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

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        resolve(undefined);
        console.log("Server started on port " + port);
      })
      .on("error", reject);
  });
};
