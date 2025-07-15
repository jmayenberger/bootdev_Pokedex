import type { State } from "./state";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const location = args[0];
    if (!location) {
        console.log("Please specifiy a location to explore");
        return;
    }
    let data;
    if (isNaN(parseInt(location))) {
        console.log(`Exploring ${location}...`);
        data = await state.pokeapi.fetchLocation(location);
    } else {
        console.log(`Exploring location id: ${parseInt(location)} ...`);
        data = await state.pokeapi.fetchLocation(location);
        console.log(`Location id: ${parseInt(location)} is ${data.name}`);
    }
    console.log("Found Pokemon:");
    const encounters = data.pokemon_encounters;
    for (const pokemon of encounters) {
        const name = pokemon.pokemon.name;
        console.log(`- ${name}`);
    }
}