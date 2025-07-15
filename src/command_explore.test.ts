import { initState, type State } from "./state.js";
import { describe, expect, it, beforeEach, afterEach, vi, afterAll, type MockInstance } from "vitest";

import { commandExplore } from "./command_explore.js";


let spy:MockInstance;
let state:State;
beforeEach(() => {
  vi.clearAllMocks();
  spy = vi.spyOn(console, "log").mockImplementation(() => {});
  state = initState(1e4);
});

afterEach(() => { 
  state.pokeapi.closeCache();
  spy.mockRestore();
});

afterAll(() => {
  vi.restoreAllMocks(); 
});

describe.each([
    {
      inputs: ["canalave-city-area"],
      expected_params: [
        "Exploring canalave-city-area...",
        "Found Pokemon:",
        "- tentacool",
    ],
    },
    {
      inputs: ["pastoria-city-area"],
      expected_params: [
        "Exploring pastoria-city-area...",
        "Found Pokemon:",
        "- gastrodon",
    ],
    },
    {
      inputs: [""],
      expected_params: ["Please specifiy a location to explore"],
    },
  ])("commandExplore", async ({ inputs, expected_params }) => {

  it(`should print catchable pokemon, run ${inputs}`, async () => {
    await commandExplore(state, ...inputs);
    // const calls = structuredClone(spy.mock.calls); 
    // spy.mockRestore();
    for (const param of expected_params) {
      let param_called = false;
      for (const call of spy.mock.calls) {
        if (param === call[0]) param_called = true;
      }
      expect(param_called).toBe(true);
    }
  });
});

