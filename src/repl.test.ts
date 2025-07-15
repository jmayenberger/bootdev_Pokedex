import { cleanInput, startREPL } from "./repl.js";
import { initState, type State } from "./state.js";
import { describe, expect, it, vi, beforeEach, afterEach, afterAll, type MockInstance } from "vitest";
import mockstdin from "mock-stdin";
const stdin = mockstdin.stdin()

import * as commandExitModule from "./command_exit.js";
import * as commandHelpModule from "./command_help.js";
import * as commandMapModule from "./command_map.js";
import * as commandExploreModule from "./command_explore.js";
import * as commandCatchModule from "./command_catch.js";


let spyConsole: MockInstance;
let spyCommandExit: MockInstance;
let spyCommandHelp: MockInstance;
let spyCommandMapForward: MockInstance;
let spyCommandMapBackward: MockInstance;
let spyCommandExplore: MockInstance;
let spyCommandCatch: MockInstance;
let state: State;
let spys: Record<string, MockInstance>;

beforeEach(() => {
  vi.clearAllMocks();
  spyConsole = vi.spyOn(console, "log").mockImplementation(() => {});
  spyCommandExit = vi.spyOn(commandExitModule, "commandExit").mockImplementation(async () => {});
  spyCommandHelp = vi.spyOn(commandHelpModule, "commandHelp").mockImplementation(async () => {});
  spyCommandMapForward = vi.spyOn(commandMapModule, "commandMapForward").mockImplementation(async () => {});
  spyCommandMapBackward = vi.spyOn(commandMapModule, "commandMapBack").mockImplementation(async () => {});
  spyCommandExplore = vi.spyOn(commandExploreModule, "commandExplore").mockImplementation(async () => {});
  spyCommandCatch = vi.spyOn(commandCatchModule, "commandCatch").mockImplementation(async () => {});
  state = initState(1e4);
  spys = {
    spyConsole,
    spyCommandExit,
    spyCommandHelp,
    spyCommandMapForward,
    spyCommandMapBackward,
    spyCommandExplore,
    spyCommandCatch
  };
});

afterEach(() => { 
  state.pokeapi.closeCache();
  state.readline.close();
  for (const key of Object.keys(spys)) (spys[key] as MockInstance).mockRestore();
});

afterAll(() => {
  vi.restoreAllMocks(); 
});

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
  it(`should return ${expected}`, () => {
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
      expected_call: "spyConsole",
      expected_param: "Unknown command - Use command 'help' for instructions",
    },
    {
      input: "  HelLo there pLEASe help",
      expected_call: "spyConsole",
      expected_param: "Unknown command - Use command 'help' for instructions",
    },
    {
      input: "",
      expected_call: "spyConsole",
      expected_param: "Unknown command - Use command 'help' for instructions",
    },
    {
      input: "exit",
      expected_call: "spyCommandExit",
      expected_param: undefined,
    },
    {
      input: " ExIt please bla bla",
      expected_call: "spyCommandExit",
      expected_param: ["please", "bla", "bla"],
    },
    {
      input: "help",
      expected_call: "spyCommandHelp",
      expected_param: undefined,
    },
    {
      input: "  hElP  bj adsljasdfö",
      expected_call: "spyCommandHelp",
      expected_param: ["bj", "adsljasdfö"],
    },
    {
      input: "map",
      expected_call: "spyCommandMapForward",
      expected_param: undefined,
    },
    {
      input: "mapb",
      expected_call: "spyCommandMapBackward",
      expected_param: undefined,
    },
    {
      input: "explore 1",
      expected_call: "spyCommandExplore",
      expected_param: ["1"],
    },
    {
      input: "explore something",
      expected_call: "spyCommandExplore",
      expected_param: ["something"],
    },
    {
      input: "explore",
      expected_call: "spyCommandExplore",
      expected_param: undefined,
    },
    {
      input: "catch pikachu",
      expected_call: "spyCommandCatch",
      expected_param: ["pikachu"],
    },

  ])("startREPL()", async ({ input, expected_call, expected_param }) => {
  
  it("should call correct command", () => {
    const spy = spys[expected_call];
    startREPL(state);
    stdin.send(input + "\n");
    if (typeof expected_param === "string") expect(spy).toHaveBeenCalledWith(expected_param);
    else if (expected_param) expect(spy).toHaveBeenCalledWith(state, ...expected_param);
    else expect(spy).toHaveBeenCalledWith(state);
  });
});

