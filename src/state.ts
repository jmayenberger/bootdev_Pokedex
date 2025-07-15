import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI
    pokedex: Record<string, Pokemon>
    nextLocationsURL?: URL | null,
    prevLocationsURL?: URL | null, 
};

export function initState (cacheInterval: number): State {
    return {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        commands: getCommands(),
        pokeapi: new PokeAPI(cacheInterval),
        pokedex: {},
    };
};