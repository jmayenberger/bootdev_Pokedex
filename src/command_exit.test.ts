import { describe, expect, test, vi } from "vitest";
import { commandExit } from "./command_exit.js";
import { initState } from "./state.js";

describe("commandExit()", () => {
    test("should print exit message and terminate", () => {
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
            return undefined as never;
        });
        const state = initState();
        const closeSpy = vi.spyOn(state.readline, "close");
        commandExit(state);
        expect(consoleSpy).toHaveBeenCalledExactlyOnceWith("Closing the Pokedex... Goodbye!");
        expect(exitSpy).toHaveBeenCalledExactlyOnceWith(0);
        expect(closeSpy).toHaveBeenCalled;
        consoleSpy.mockRestore();
        exitSpy.mockRestore();
    });
    
});