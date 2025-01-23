import { getPokemons } from "@/services/pokemonSvc";
import { useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPokemons()
      .then((res) => {
        setPokemons(res.data.results);
        setNextUrl(res.data.next);
      })
      .finally(() => setLoading(false));
  }, []);

  const getNextPokemons = () => {
    setLoading(true);
    getPokemons(nextUrl)
      .then((res) => {
        setPokemons(pokemons.concat(res.data.results));
        setNextUrl(res.data.next);
      })
      .finally(() => setLoading(false));
  };

  const addFavorite = (pokemonData: {name: string, url: string}) => {
    setFavorites([...favorites, pokemonData]);
    setPokemons(pokemons.filter((e) => e.name !== pokemonData.name));
  };

  const removeFavorite = (pokemonData: {name: string, url: string}) => {
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
