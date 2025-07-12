import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    let helpMessage = "Welcome to the Pokedex!\nUsage:\n\n";
    for (const cmd of Object.values(state.commands)) {
        helpMessage += `${cmd.name}: ${cmd.description}\n`;
    }
    console.log(helpMessage);
};