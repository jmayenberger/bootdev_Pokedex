import type { State } from "./state.js";

export async function commandPokedex(state: State, ...args: string[]) {
    const entries = Object.keys(state.pokedex);
    if (entries.length === 0) {
        console.log("No entries yet. Use command catch <pokemon name>");
        return
    }
    console.log("Your Pokedex:");
    for (const key of entries) {
        console.log(`- ${state.pokedex[key]?.name}`);
    }
}