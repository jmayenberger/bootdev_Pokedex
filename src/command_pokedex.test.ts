import { describe, it, beforeEach, afterEach, afterAll, expect, vi, type MockInstance } from "vitest";
import { type State, initState } from "./state.js";
import { commandCatch } from "./command_catch.js";
import { commandPokedex } from "./command_pokedex.js";


let state: State;
let spy: MockInstance;

beforeEach(() => {
    vi.clearAllMocks();
    spy = vi.spyOn(console, "log").mockImplementation(() => {});
    state = initState(1e4);
});

afterEach(() => {
    spy.mockClear();
    state.pokeapi.closeCache();
    state.readline.close();
});

afterAll(() => {
    vi.resetAllMocks();
})

describe.each([
    {
        pokedex: [
            "pikachu",
            "pidgey",
            "tentacool",
        ],
        expected: [
            "Your Pokedex:",
            "- pikachu",
            "- pidgey",
            "- tentacool",
        ],
    },
    {
        pokedex: [],
        expected: [
            "No entries yet. Use command catch <pokemon name>",
        ]
    },
])("commandPokedex() - entries: $pokedex", async ({ pokedex, expected }) => {
    it("should output pokemon in pokedex", async () => {
        for (const pokemon of pokedex) {
            while (true) {
                await commandCatch(state, pokemon);
                const lastcall = spy.mock.lastCall ?? [""];
                if (lastcall[0] === `${pokemon} was added to the Pokedex!`) break;
            }
        }
        await commandPokedex(state);
        for (const element of expected) {
            expect(spy).toHaveBeenCalledWith(element);
        }
    });
});