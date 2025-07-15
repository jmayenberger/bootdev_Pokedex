import { afterAll, afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import { commandExit } from "./command_exit.js";
import { initState, type State } from "./state.js";

let consoleSpy: MockInstance;
let exitSpy: MockInstance;
let closeSpy: MockInstance;
let state: State;
beforeEach(() => {
    vi.clearAllMocks();
    state = initState(1e4);
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
        return undefined as never;
    });
    closeSpy = vi.spyOn(state.readline, "close");
});

afterEach(() => {
    consoleSpy.mockRestore();
    exitSpy.mockRestore();
    closeSpy.mockRestore();
    state.pokeapi.closeCache();
    state.readline.close()
});

afterAll(() => {
    vi.restoreAllMocks();
});

describe("commandExit()", () => {
    it("should print exit message and terminate", () => {
        commandExit(state);
        expect(consoleSpy).toHaveBeenCalledWith("Closing the Pokedex... Goodbye!");
        expect(exitSpy).toHaveBeenCalledWith(0);
        expect(closeSpy).toHaveBeenCalled;
    });
    
});