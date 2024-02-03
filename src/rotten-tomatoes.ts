import { Command } from "commander";
const program = new Command();

import { getMediaInfo } from "./main.js";

program
  .description("Get media info from rotten tomatoes")
  .version("1.0.0")
  .argument("<mediaTitle>", "Name of the movie of series to search for.")
  .action(async (mediaTitle: string) => {
    console.log(await getMediaInfo(mediaTitle));
  })
  .parseAsync();
