import axios from 'axios';

export const getPokemons = async (url?: string): Promise<any> => {
  return await axios.get(url || "https://pokeapi.co/api/v2/pokemon");
}