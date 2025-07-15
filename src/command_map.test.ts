import { initState, type State } from "./state.js";
import { describe, expect, it, vi, beforeEach, afterEach, afterAll, type MockInstance } from "vitest";

import {commandMapBack, commandMapForward} from "./command_map.js";

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


describe.each([
    {
      inputs: ["map"],
      expected_param_last: undefined,
      expected_call_number: 20,
    },
    {
      inputs: ["mapb"],
      expected_param_last: undefined,
      expected_call_number: 20,
    },
    {
      inputs: ["map", "mapb"],
      expected_param_last: "you're on the first page",
      expected_call_number: 21,
    },
    {
      inputs: ["mapb", "map"],
      expected_param_last: undefined,
      expected_call_number: 40,
    },
  ])("commandMap", async ({ inputs, expected_call_number, expected_param_last }) => {
  
  it(`should print locations, run ${inputs}`, async () => {
    for (const input of inputs) {
        if (input === "map") await commandMapForward(state);
        else if (input === "mapb") await commandMapBack(state);
    }
    expect(spy).toHaveBeenCalledTimes(expected_call_number);
    if (expected_param_last) expect(spy).toHaveBeenLastCalledWith(expected_param_last);
  });
});

