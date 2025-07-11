import { describe, expect, test, vi } from "vitest";
import { commandExit } from "./command_exit.js";

describe("commandExit()", () => {
    test("should print exit message and terminate", () => {
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
            return undefined as never;
        });
        commandExit();
        expect(consoleSpy).toHaveBeenCalledExactlyOnceWith("Closing the Pokedex... Goodbye!");
        expect(exitSpy).toHaveBeenCalledExactlyOnceWith(0);
        consoleSpy.mockRestore();
        exitSpy.mockRestore();
    });
    
});