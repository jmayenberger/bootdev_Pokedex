import { cleanInput, startREPL } from "./repl.js";
import { describe, expect, test, vi } from "vitest";
import mockstdin from "mock-stdin";
const stdin = mockstdin.stdin()

import * as commandExitModule from "./command_exit.js";
//vi.mock("./command_exit.js", { spy: true })
import * as commandHelpModule from "./command_help.js";
//vi.mock("./command_help.js", { spy: true })


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
    startREPL();
    stdin.send("hello there" + "\n");
    expect(spy).toHaveBeenCalledWith("Unknown command");
    spy.mockRestore();
  });

  // unknown input "  HelLo there pLEASe help"
  test("Expected function call: console.log('Unknown command')", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    startREPL();
    stdin.send("  HelLo there pLEASe help" + "\n");
    expect(spy).toHaveBeenCalledWith("Unknown command");
    spy.mockRestore();
  });

  // unknown input ""
  test("Expected function call: console.log('Unknown command')", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    startREPL();
    stdin.send("\n");
    expect(spy).toHaveBeenCalledWith("Unknown command");
    spy.mockRestore();
  });

  // exit input "exit"
  test("Expected function call: commandExit()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandExitModule, "commandExit").mockImplementation(() => {});
    startREPL();
    stdin.send("exit" + "\n");
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });

  // exit input " ExIt please bla bla"
  test("Expected function call: commandExit()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandExitModule, "commandExit").mockImplementation(() => {});
    startREPL();
    stdin.send(" ExIt please bla bla" + "\n");
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });

  // help input "help"
  test("Expected function call: commandHelp()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandHelpModule, "commandHelp").mockImplementation(() => {});
    startREPL();
    stdin.send("help" + "\n");
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });

  // help input "  hElP  bj adsljasdfö"
  test("Expected function call: commandHelp()", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(commandHelpModule, "commandHelp").mockImplementation(() => {});
    startREPL();
    stdin.send("  hElP  bj adsljasdfö" + "\n");
    expect(spy).toHaveBeenCalledWith();
    spy.mockRestore();
  });
});

