import { cleanInput, startREPL } from "./repl.js";
import { initState } from "./state.js";
import { describe, expect, it, vi } from "vitest";
import mockstdin from "mock-stdin";
const stdin = mockstdin.stdin()

import * as commandExitModule from "./command_exit.js";
import * as commandHelpModule from "./command_help.js";
import * as commandMapModule from "./command_map.js";


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
  it("should return $expected", () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

// startREPL call correct command tests
describe.each([
    {
      input: "hello there",
      expected_call: [console, "log"],
      expected_param: "Unknown command - Use command 'help' for instructions",
      expected_call_number: 1,
    },
    {
      input: "  HelLo there pLEASe help",
      expected_call: [console, "log"],
      expected_param: "Unknown command - Use command 'help' for instructions",
      expected_call_number: 1,
    },
    {
      input: "",
      expected_call: [console, "log"],
      expected_param: "Unknown command - Use command 'help' for instructions",
      expected_call_number: 1,
    },
    {
      input: "exit",
      expected_call: [commandExitModule, "commandExit"],
      expected_param: undefined,
      expected_call_number: 1,
    },
    {
      input: " ExIt please bla bla",
      expected_call: [commandExitModule, "commandExit"],
      expected_param: undefined,
      expected_call_number: 1,
    },
    {
      input: "help",
      expected_call: [commandHelpModule, "commandHelp"],
      expected_param: undefined,
      expected_call_number: 1,
    },
    {
      input: "  hElP  bj adsljasdfö",
      expected_call: [commandHelpModule, "commandHelp"],
      expected_param: undefined,
      expected_call_number: 1,
    },
    {
      input: "map",
      expected_call: [commandMapModule, "commandMapForward"],
      expected_param: undefined,
      expected_call_number: 1,
    },
    {
      input: "mapb",
      expected_call: [commandMapModule, "commandMapBack"],
      expected_param: undefined,
      expected_call_number: 1,
    },
  ])("startREPL", async ({ input, expected_call, expected_call_number, expected_param }) => {
  
  it("should call correct command", () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(expected_call[0] as any, expected_call[1] as string).mockImplementation(async () => {});
    const state = initState(0);
    startREPL(state);
    stdin.send(input + "\n");
    expect(spy).toHaveBeenCalledWith(expected_param ?? state);
    expect(spy).toHaveBeenCalledTimes(expected_call_number);
    spy.mockRestore();
    state.readline.close();
  });
});

