import { cleanInput, startREPL } from "./repl.js";
import { initState } from "./state.js";
import { describe, expect, test, vi } from "vitest";
import mockstdin from "mock-stdin";
const stdin = mockstdin.stdin()

import * as commandExitModule from "./command_exit.js";
import * as commandHelpModule from "./command_help.js";


// cleanInput tests
describe.each([
    {
        input: "hello world",
        expected: ["hello", "world"],
    },
    {
        input: "HeLlo WorLD",
        expected: ["hello", "world"],
    },
    {
        input: "   hello      world      ",
        expected: ["hello", "world"],
    },
    {
        input: "  1   2  34  AND  return;  789  ",
        expected: ["1", "2", "34", "and", "return;", "789"],
    },
    {
      input: "",
      expected: [],
    },
    {
      input: "   ",
      expected: [],
    }
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

// startREPL call correct command tests
describe("startREPL calls correct commands", () => {
   
  // unknown input "hello there"
  test("Expected function call: console.log('Unknown command')", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("hello there" + "\n");
    expect(spy).toHaveBeenCalledWith("Unknown command - Use command 'help' for instructions");
    spy.mockRestore();
    state.interface.close();
  });

  // unknown input "  HelLo there pLEASe help"
  test("Expected function call: console.log('Unknown command')", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("  HelLo there pLEASe help" + "\n");
    expect(spy).toHaveBeenCalledWith("Unknown command - Use command 'help' for instructions");
    spy.mockRestore();
    state.interface.close();
  });

  // unknown input ""
  test("Expected function call: console.log('Unknown command')", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("\n");
    expect(spy).toHaveBeenCalledWith("Unknown command - Use command 'help' for instructions");
    spy.mockRestore();
    state.interface.close();
  });

  // exit input "exit"
  test("Expected function call: commandExit()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandExitModule, "commandExit").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("exit" + "\n");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    state.interface.close();
  });

  // exit input " ExIt please bla bla"
  test("Expected function call: commandExit()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandExitModule, "commandExit").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send(" ExIt please bla bla" + "\n");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    state.interface.close();
  });

  // help input "help"
  test("Expected function call: commandHelp()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandHelpModule, "commandHelp").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("help" + "\n");
    expect(spy).toHaveBeenCalledWith(state);
    spy.mockRestore();
    state.interface.close();
  });

  // help input "  hElP  bj adsljasdfö"
  test("Expected function call: commandHelp()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandHelpModule, "commandHelp").mockImplementation(() => {});
    const state = initState();
    startREPL(state);
    stdin.send("  hElP  bj adsljasdfö" + "\n");
    expect(spy).toHaveBeenCalledWith(state);
    spy.mockRestore();
    state.interface.close();
  });
});

