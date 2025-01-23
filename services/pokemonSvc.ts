import axios from 'axios';

export const getPokemons = async (url = "https://pokeapi.co/api/v2/pokemon"): Promise<any> => {
  return await axios.get(url);
}