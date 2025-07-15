import { type State } from "./state.js";

export async function commandMapForward(state: State): Promise<void> {
    const nextLocationsURL = state.nextLocationsURL;
    if (nextLocationsURL === null) {
        console.log("you're on the last page");
        return;
    }
    const locations = await state.pokeapi.fetchLocations(nextLocationsURL);
    for (const location of locations.results) {
        const name = location.name;
        const url = location.url;
        const id = url.split("/").filter(segment => segment !== '').at(-1);
        console.log(`${name} id: ${id}`);
    }
    if (locations.next === null) state.nextLocationsURL = null;
    else state.nextLocationsURL = new URL(locations.next);
    if (locations.previous === null) state.prevLocationsURL = null;
    else state.prevLocationsURL = new URL(locations.previous);
};

export async function commandMapBack(state: State): Promise<void> {
    const prevLocationsURL = state.prevLocationsURL;
    if (prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }
    if (prevLocationsURL === undefined) {
        await commandMapForward(state);
        return;
    }
    const locations = await state.pokeapi.fetchLocations(prevLocationsURL);
    for (const location of locations.results) {
        const name = location.name;
        const url = location.url;
        const id = url.split("/")[-1];
        console.log(`${name} id: ${id}`);
    }
    if (locations.next === null) state.nextLocationsURL = null;
    else state.nextLocationsURL = new URL(locations.next);
    if (locations.previous === null) state.prevLocationsURL = null;
    else state.prevLocationsURL = new URL(locations.previous);
};