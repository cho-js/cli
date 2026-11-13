#!/usr/bin/env -S deno run --allow-env
/**
 * @chojs/cli — the `cho` command-line tool.
 *
 * @example
 * ```sh
 * deno run --allow-env jsr:@chojs/cli --help
 * ```
 *
 * @module
 */

import { ChoCommand } from "@chojs/command";
import { CliModule } from "./app.ts";
import config from "./deno.json" with { type: "json" };

const app = ChoCommand.create(CliModule, {
  name: "cho",
  version: config.version,
});
const code = await app.run(Deno.args);
await app.close();
Deno.exit(code);
