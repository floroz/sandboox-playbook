import { Router } from "express";
import fs from "fs/promises";
import path from "path";

const defaultCells = { cells: {}, order: [] };

export default (filename: string, dir: string) => {
  const router = Router();

  router.get("/", async (_, res) => {
    const filepath = path.join(dir, filename);

    try {
      const content = await fs.readFile(filepath, "utf-8");
      const { cells, order } = JSON.parse(content);
      res.status(200).json({ cells, order });
    } catch (error) {
      console.error(error);
      if ((error as any).code === "ENOENT") {
        res.status(200).json(defaultCells);
      } else {
        res.status(500).json(defaultCells);
      }
    }
  });

  router.post("/", async (req, res) => {
    const { cells, order } = req.body;
    try {
      await fs.writeFile(
        path.join(dir, filename),
        JSON.stringify({ cells, order }),
        "utf-8"
      );
      res.status(201).json({ message: "cells saved" });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Could not save the cells successfully.",
      });
    }
  });

  return router;
};
