import { initState } from "./state.js";
import { describe, expect, it, vi } from "vitest";

import {commandMapBack, commandMapForward} from "./command_map.js";

describe.each([
    {
      inputs: ["map"],
      expected_call: [console, "log"],
      expected_param_last: undefined,
      expected_call_number: 20,
    },
    {
      inputs: ["mapb"],
      expected_call: [console, "log"],
      expected_param_last: undefined,
      expected_call_number: 20,
    },
    {
      inputs: ["map", "mapb"],
      expected_call: [console, "log"],
      expected_param_last: "you're on the first page",
      expected_call_number: 21,
    },
    {
      inputs: ["mapb", "map"],
      expected_call: [console, "log"],
      expected_param_last: undefined,
      expected_call_number: 40,
    },
  ])("commandMap", async ({ inputs, expected_call, expected_call_number, expected_param_last }) => {
  
  it(`should print locations, run ${inputs}`, async () => {
    vi.clearAllMocks();
    const spy = vi.spyOn(expected_call[0] as any, expected_call[1] as string).mockImplementation(async () => {});
    const state = initState(1e4);
    for (const input of inputs) {
        if (input === "map") await commandMapForward(state);
        else if (input === "mapb") await commandMapBack(state);
    }
    expect(spy).toHaveBeenCalledTimes(expected_call_number);
    if (expected_param_last) expect(spy).toHaveBeenLastCalledWith(expected_param_last);
    spy.mockRestore();
  });
});

