import { getPokemons } from "@/services/pokemonSvc";
import { useEffect, useState } from "react";

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
    getPokemons(nextUrl)
      .then((res) => {
        res.data.results.map((e:any) => getPokemonData(e.url))
        setNextUrl(res.data.next);
      })
      .finally(() => setLoading(false));
    };
    
  const getPokemonData = async (pokemonUrl:string) => {
    return await getPokemons(pokemonUrl).then((pokemon) => {
      setPokemons([
        ...pokemons,
        {
          name: pokemon.data.name,
          height: pokemon.data.height,
          img: pokemon.data.sprites.front_default
        }
      ]);
    })
  }

  const addFavorite = (pokemonData: PokemonItem) => {
    setFavorites([...favorites, pokemonData]);
    setPokemons(pokemons.filter((e) => e.name !== pokemonData.name));
  };

  const removeFavorite = (pokemonData: PokemonItem) => {
    setPokemons([...pokemons, pokemonData]);
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
