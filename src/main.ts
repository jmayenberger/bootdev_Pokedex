import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const state = initState(5 * 60 * 1e3);
  await startREPL(state);
}

main();