import { getPokemons } from "@/services/pokemonSvc";
import { useEffect, useState } from "react";
import { sortElements } from '@/utils';

interface PokemonItem {
  name: string;
  height: number;
  img: string;
}

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState<Array<PokemonItem>>([]);
  const [favorites, setFavorites] = useState<Array<PokemonItem>>([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNextPokemons()
  }, []);

  const getNextPokemons = () => {
    setLoading(true);
    getPokemons()
      .then(async (res) => {
        setPokemons(
          sortElements(
            await Promise.all(
              res.data.results.map((e:any) => getPokemonData(e.url))
            )
          )
        ) 
        setNextUrl(res.data.next);
      })
      .finally(() => setLoading(false));
    };
    
  const getPokemonData = async (pokemonUrl:string) => {
    const pokemon = await getPokemons(pokemonUrl)
    return {
      name: pokemon.data.name,
      height: pokemon.data.height,
      img: pokemon.data.sprites.front_default
    }
  }

  const addFavorite = (pokemonData: PokemonItem) => {
    setFavorites(sortElements([...favorites, pokemonData]));
    setPokemons(pokemons.filter((e) => e.name !== pokemonData.name));
  };

  const removeFavorite = (pokemonData: PokemonItem) => {
    setPokemons(sortElements([...pokemons, pokemonData]));
    setFavorites(favorites.filter((e) => e.name !== pokemonData.name));
  };

  return {
    pokemons,
    setPokemons,
    favorites,
    setFavorites,
    loading,
    getNextPokemons,
    addFavorite,
    removeFavorite,
  };
};
