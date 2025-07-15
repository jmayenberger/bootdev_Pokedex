import { Cache } from "./pokecache.js";
import { it, describe, expect, afterEach} from "vitest";

let cache: Cache;
afterEach(() => {
  cache.stopReapLoop();
});

describe.each([
  {
    key: new URL("https://example.com"),
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: new URL("https://example.com/path"),
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("test pokecache", async ({ key, val, interval }) => {
  
  it(`should create entry ${val} and delete after ${interval}ms`, async () => {
    cache = new Cache(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
  });
});