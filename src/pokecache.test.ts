import { Cache } from "./pokecache.js";
import { test, expect , afterEach} from "vitest";

let cache:Cache;
afterEach(() => {
  cache.stopReapLoop();
});

test.each([
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
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);
});