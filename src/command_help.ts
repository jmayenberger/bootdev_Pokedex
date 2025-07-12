import { type State } from "./state.js";

export function commandHelp(state: State): void {
    let helpMessage = "Welcome to the Pokedex!\nUsage:\n\n";
    for (const cmd of Object.values(state.commands)) {
        helpMessage += `${cmd.name}: ${cmd.description}\n`;
    }
    console.log(helpMessage);
};