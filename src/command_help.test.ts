import { describe, test, expect, vi, beforeEach, afterEach, afterAll, type MockInstance } from "vitest";
import { commandHelp } from "./command_help.js";
import { initState, type State } from "./state.js";

let spy: MockInstance;
let state: State;
beforeEach(() => {
  vi.clearAllMocks();
  spy = vi.spyOn(console, "log").mockImplementation(() => {});
  state = initState(1e4);
});

afterEach(() => { 
  state.pokeapi.closeCache();
  state.readline.close();
  spy.mockRestore();
});

afterAll(() => {
  vi.restoreAllMocks(); 
});


describe("test commandHelp", () => {
    test("", () => {
        commandHelp(state);
        const out = (spy.mock.calls[0]?.[0] as string) ?? "";
        expect(out).toBeTypeOf("string");
        expect(out.startsWith("Welcome to the Pokedex!\nUsage:\n\n"));
        expect(out.includes("map: "));
        expect(out.includes("mapb: "));
        expect(out.includes("explore: "));
        expect(out.includes("catch: "));
        expect(out.includes("help: "));
        expect(out.includes("exit: "));
    });
});