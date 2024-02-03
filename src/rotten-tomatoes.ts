import { Command } from "@commander-js/extra-typings";
const program = new Command();

import { getMediaInfo } from "./main.js";

program
  .description("Get media info from rotten tomatoes")
  .version("1.0.0")
  .argument("<mediaTitle...>", "Name of the movie of series to search for.")
  .option(
    "-l, --limit <limit>",
    "Get the top <limit> results from the search",
    "1",
  )
  .option(
    "-y, --year <releaseYear>",
    "Only get results from media released in <releaseYear>",
  )
  .action(async (mediaTitle, opts) => {
    const year = opts.year ? parseInt(opts.year) : undefined;
    console.log(
      await getMediaInfo(mediaTitle.join(" "), parseInt(opts.limit), year),
    );
  })
  .parseAsync();
