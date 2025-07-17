import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = new URL("https://pokeapi.co/api/v2");
  #cache: Cache;

  constructor(cacheInterval: number) {
    this.#cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.#cache.stopReapLoop();
  }

  async fetchWithCache<T>(pageURL: URL): Promise<T> {
    const cached = this.#cache.get<T>(pageURL);
    if (cached) {
      console.log("returned cached information");
      return cached;
    }
    try {
        const response = await fetch(pageURL.toString());
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const json: T = await response.json();
        this.#cache.add<T>(pageURL, json);
        return json;
    } catch (error) {
        throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocations(pageURL?: URL): Promise<ShallowLocations> {
    pageURL = pageURL ?? new URL(`${PokeAPI.baseURL.toString()}/location-area`);
    const json = await this.fetchWithCache<ShallowLocations>(pageURL);
    return json;
  }

  async fetchLocation(locationName: string | number): Promise<Location> {
    const pageURL = new URL(`${PokeAPI.baseURL.toString()}/location-area/${locationName}`);
    const json = await this.fetchWithCache<Location>(pageURL);
    return json;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const pageURL = new URL(`${PokeAPI.baseURL.toString()}/pokemon/${pokemonName}`);
    const json = await this.fetchWithCache<Pokemon>(pageURL);
    return json;
  }
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string,
  }[],
};

export type Location = {
  encounter_method_rates: any[],
  game_index: number,
  id: number,
  location: Location,
  name: string,
  names: any[],
  pokemon_encounters: {
    pokemon: {
      name: string,
      url: string,
    },
    version_details: any[],
  }[],
};

export type Pokemon = {
  abilities: any[],
  base_experience: number,
  cries: any,
  forms: any[],
  game_indices: any[],
  height: number,
  held_items: any[],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: any[],
  name: string,
  order: number,
  past_abilities: any[],
  past_types: any[],
  species: any,
  sprites: any,
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    },
  }[],
  types: {
    slot: number
    type: {
      name: string
      url: string
    },
  }[],
  weight: number,
};