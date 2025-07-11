import { describe, test, expect, vi } from "vitest";
import { commandHelp } from "./command_help.js";

describe("test commandHelp", () => {
    test("", () => {
        vi.clearAllMocks();
        const spyConsole = vi.spyOn(console, "log").mockImplementation(() => {});
        commandHelp();
        const out = (spyConsole.mock.calls[0]?.[0] as string) ?? "";
        expect(out).toBeTypeOf("string");
        expect(out.startsWith("Welcome to the Pokedex!\nUsage:\n\n"));
        expect(out.includes("help: "));
        expect(out.startsWith("exit: "));
        spyConsole.mockRestore();
        
    });
});