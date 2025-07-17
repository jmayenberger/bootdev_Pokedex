import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

import { type CLICommand} from "./state.js";



export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: "map",
      description: "Shows next page of location areas",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Shows previous page of location areas",
      callback: commandMapBack,
    },
    explore: {
      name: "explore <location_name or id>",
      description: "Lists all catchable Pokemon in a given location",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Trys to catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "Shows details of a Pokemon that is in the Pokedex",
      callback: commandInspect,
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
