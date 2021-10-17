import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run on", "4005")
  .action(async (file = "notebook.js", { port }: { port: string }) => {
    try {
      const filename = path.basename(file);
      const dir = path.join(process.cwd(), path.dirname(file));
      await serve(parseInt(port), filename, dir);
    } catch (err) {
      if ((err as any).code === "EADDRINUSE") {
        console.error("Port is in use. Try running on a different port.");
      } else {
        console.log("Problem is: ", (err as any).message);
      }
      process.exit(1);
    }
  });
