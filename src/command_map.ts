import { type State } from "./state.js";

export async function commandMapForward(state: State): Promise<void> {
    if (state.nextLocationsURL === null) {
        console.log("you're on the last page");
        return;
    }
    const locations = state.pokeapi.fetchLocations(state.nextLocationsURL as string | undefined);
    for (const location of (await locations).results) console.log(location.name);
    state.nextLocationsURL = (await locations).next;
    state.prevLocationsURL = (await locations).previous;
};

export async function commandMapBack(state: State): Promise<void> {
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }
    const locations = state.pokeapi.fetchLocations(state.prevLocationsURL as string | undefined);
    for (const location of (await locations).results) console.log(location.name);
    state.nextLocationsURL = (await locations).next;
    state.prevLocationsURL = (await locations).previous;
};