import { afterEach, beforeEach, afterAll, describe, type MockInstance, vi, it, expect } from "vitest";
import { initState, type State } from "./state.js";
import { commandCatch } from "./command_catch";

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
        expected: [
            "Throwing a Pokeball at pikachu...",
            ["pikachu escaped!", "pikachu was caught!"],
        ]
    },
    {
        input: "",
        expected: [
            "Please specify a Pokemon to catch",
        ]
    },
])("commandCatch()", async ({input, expected}) => {
    it(`should output correct catch messages, run commandCatch(${input})`, async () => {
        await commandCatch(state, input);
        for (const param of expected) {
            let was_called = false;
            for (const call of spy.mock.calls) {
                if (typeof param === "string" && call[0] === param) was_called = true;
                else if (call[0] === param[0] || call[0] === param[1]) was_called = true;
            }
            expect(was_called).toBe(true);
        }
    });
});