import { describe, it, beforeEach, afterEach, afterAll, expect, vi, type MockInstance } from "vitest";
import { type State, initState } from "./state.js";
import { commandInspect } from "./command_inspect.js";
import { commandCatch } from "./command_catch.js";


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
        input: "pikachu",
        is_catched: true,
        expected: [
            "Name: pikachu",
            "Height: 4",
            "Weight: 60",
            "Stats:",
            "-hp: 35",
            "-attack: 55",
            "-defense: 40",
            "-special-attack: 50",
            "-special-defense: 50",
            "-speed: 90",
            "Types:",
            "- electric",
        ]
    },
    {
        input: "pidgey",
        is_catched: true,
        expected: [
            "Name: pidgey",
            "Height: 3",
            "Weight: 18",
            "Stats:",
            "-hp: 40",
            "-attack: 45",
            "-defense: 40",
            "-special-attack: 35",
            "-special-defense: 35",
            "-speed: 56",
            "Types:",
            "- normal",
            "- flying",
        ]
    },
    {
        input: "pidgey",
        is_catched: false,
        expected: ["you have not caught that pokemon"],
    },
    {
        input: "",
        is_catched: false,
        expected: ["Please specify the Pokemon to inspect"],
    },
])("commandInspect($input)", async ({ input, is_catched, expected }) => {
    it("should output pokemon details", async () => {
        while (is_catched) {
            await commandCatch(state, input);
            const lastcall = spy.mock.lastCall ?? [""];
            if (lastcall[0] === `${input} was added to the Pokedex!`) break;
        }
        await commandInspect(state, input);
        const calls = spy.mock.calls;
        for (const element of expected) {
            let was_called = false;
            for (const call of calls) {
                if (call[0].includes(element)) was_called = true;
            }
            expect(was_called).toBe(true);
        }
    });
});