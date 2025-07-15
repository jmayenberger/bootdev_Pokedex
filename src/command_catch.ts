import type { State } from "./state";
const catchFactor = 60;

export async function commandCatch(state: State, ...args:string[]): Promise<void> {
    const pokemon = args[0];
    if (!pokemon) {
        console.log("Please specify a Pokemon to catch");
        return;
    }
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const data = await state.pokeapi.fetchPokemon(pokemon);
    const baseExp = data.base_experience;
    const catchRoll = Math.random() * baseExp;
    if ( catchRoll < catchFactor) {
        console.log(`${pokemon} was caught!`);
        if (!state.pokedex[pokemon]) {
            state.pokedex[pokemon] = data;
            console.log(`${pokemon} was added to the Pokedex!`);
        }
    }
    else {
        console.log(`${pokemon} escaped!`);
    }
}