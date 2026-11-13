/**
 * The `cho` command-line application: its module and its commands.
 *
 * @module
 */

import {
  type ChoCommandContext,
  Controller,
  Help,
  Main,
  Module,
} from "@chojs/command";

/** The commands of the `cho` CLI. */
@Help("The command-line tool for CHO")
@Controller()
export class CliController {
  /** `cho`: the command that runs when no other is given. */
  @Help("Show what cho can do")
  @Main()
  main(_ctx: ChoCommandContext): void {
    console.log("cho: the command-line tool for CHO.");
    console.log("Run 'cho --help' to see what it can do.");
  }
}

/** The root module of the `cho` CLI. */
@Module({ controllers: [CliController] })
export class CliModule {}
