import type { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const location = args[0];
    if (!location) {
        console.log("Please specifiy a location to explore");
        return;
    }
    console.log(`Exploring ${location}...`);
    const data = await state.pokeapi.fetchLocation(location);
    console.log("Found Pokemon:");
    const encounters = data.pokemon_encounters;
    for (const pokemon of encounters) {
        const name = pokemon.pokemon.name;
        console.log(`- ${name}`);
    }
}