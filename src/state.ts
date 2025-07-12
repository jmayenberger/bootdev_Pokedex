import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
};

export function initState (): State {
    return {
        interface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        commands: getCommands()
    };
};