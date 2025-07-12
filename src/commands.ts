import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";

import { type CLICommand} from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: "map",
      description: "Shows next page of location areas",
      callback: commandMapForward
    },
    mapb: {
      name: "mapb",
      description: "Shows previous page of location areas",
      callback: commandMapBack
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },

    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
  };
}
