import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
};

export function startREPL(state: State): void {
    state.interface.prompt();
    state.interface.on("line", async (input) => {
        const words = cleanInput(input);
        const commandName = words[0] ?? "";
        if (state.commands[commandName]){
            state.commands[commandName].callback(state);
        } else {
            console.log("Unknown command - Use command 'help' for instructions");
        }
        state.interface.prompt();
    })
};