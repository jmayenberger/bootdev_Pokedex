import type { State } from "./state.js";

export async function commandInspect(state: State, ...args:string[]): Promise<void> {
    const name = args[0];
    if (!name) {
        console.log("Please specify the Pokemon to inspect");
        return;
    }
    if (!state.pokedex[name]) {
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemon = state.pokedex[name];
    const outputs = [
        `Name: ${pokemon.name}`,
        `Height: ${pokemon.height}`,
        `Weight: ${pokemon.weight}`,
        `Stats:`,
    ];
    for (const stat of pokemon.stats) {
        outputs.push(`-${stat.stat.name}: ${stat.base_stat}`);
    }
    outputs.push("Types:");
    for (const type of pokemon.types) {
        outputs.push(`- ${type.type.name}`);
    }
    for (const out of outputs) console.log(out);

}