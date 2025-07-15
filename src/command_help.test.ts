import { describe, test, expect, vi } from "vitest";
import { commandHelp } from "./command_help.js";
import { initState } from "./state.js";

describe("test commandHelp", () => {
    test("", () => {
        vi.clearAllMocks();
        const spyConsole = vi.spyOn(console, "log").mockImplementation(() => {});
        const state = initState(1e4);
        commandHelp(state);
        const out = (spyConsole.mock.calls[0]?.[0] as string) ?? "";
        expect(out).toBeTypeOf("string");
        expect(out.startsWith("Welcome to the Pokedex!\nUsage:\n\n"));
        expect(out.includes("map: "));
        expect(out.includes("mapb: "));
        expect(out.includes("explore: "));
        expect(out.includes("help: "));
        expect(out.includes("exit: "));
        spyConsole.mockRestore();
        state.readline.close(); 
    });
});