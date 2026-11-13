import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ChoCommand } from "@chojs/command";
import { CliModule } from "./app.ts";

/** Run the CLI with arguments; returns the exit code and what it printed. */
async function run(argv: string[]) {
  const lines: string[] = [];
  const log = console.log;
  console.log = (...values: unknown[]) => lines.push(values.join(" "));
  try {
    const app = ChoCommand.create(CliModule, { name: "cho", version: "1.2.3" });
    const code = await app.run(argv);
    await app.close();
    return { code, output: lines.join("\n") };
  } finally {
    console.log = log;
  }
}

describe("cho", () => {
  it("runs the main command", async () => {
    const { code, output } = await run([]);
    assert.equal(code, 0);
    assert.match(output, /command-line tool for CHO/);
  });

  it("prints its help and its version", async () => {
    const help = await run(["--help"]);
    assert.equal(help.code, 0);
    assert.match(help.output, /Usage: cho/);
    const version = await run(["--version"]);
    assert.deepEqual([version.code, version.output], [
      0,
      "cho version 1.2.3",
    ]);
  });
});
