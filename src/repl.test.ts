import { cleanInput, startREPL } from "./repl";
import { describe, expect, test, vi } from "vitest";
import mockstdin from "mock-stdin";
const stdin = mockstdin.stdin()

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

// startREPL tests
describe.each([
  {
    input: "hello there",
    expected: "hello"
  },
  {
    input: "   ExIT   ",
    expected: "exit"
  },
])("startREPL -> $input", ({ input, expected }) => {
   test(`Expected: ${expected}`, () => {
    vi.spyOn(console, "log");
    startREPL();
    stdin.send(input + "\n");
    expect(console.log).toHaveBeenCalledWith(`Your command was: ${expected}`);
  });
});
