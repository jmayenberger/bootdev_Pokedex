import { createInterface } from "readline";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
}

export function startREPL(): void {
    const commands = getCommands();

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        const commandName = words[0] ?? "";
        if (commands[commandName]){
            commands[commandName].callback(words.slice(1));
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    })
}