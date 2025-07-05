import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

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