export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    pageURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    try {
        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
    try {
        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching locations: ${(error as Error).message}`);
    }
  }
};

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string,
    url: string,
  }[]
};

export type Location = {
  encounter_method_rates: any[]
  game_index: number
  id: number
  location: Location
  name: string
  names: any[]
  pokemon_encounters: any[]
};