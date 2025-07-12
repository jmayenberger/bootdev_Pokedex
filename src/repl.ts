import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
};

export async function startREPL(state: State): Promise<void> {
    state.readline.prompt();
    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        const commandName = words[0] ?? "";
        if (state.commands[commandName]){
            try {
                await state.commands[commandName].callback(state);
            } catch (error) {
                console.log(`Error fetching data, try again: ${(error as Error).message}`);
            }
            
        } else {
            console.log("Unknown command - Use command 'help' for instructions");
        }
        state.readline.prompt();
    })
};