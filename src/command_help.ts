import { getCommands } from "./command.js";

export function commandHelp(): void {
    const commands = getCommands();
    let helpMessage = "Welcome to the Pokedex!\nUsage:\n\n";
    for (const cmd of Object.values(commands)) {
        helpMessage += `${cmd.name}: ${cmd.description}\n`;
    }
    console.log(helpMessage);
};