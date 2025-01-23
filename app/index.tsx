import { sortElements } from '@/utils';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from "expo-router";
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { usePokemon } from '@/hooks/usePokemon';
import { homeStyles } from '@/styles/homeStyles';

interface PokemonItem {
  name: string;
  height: number;
  img: string;
}

export default function HomeScreen() {
  const { logOut } = useAuth();
  const {
    pokemons,
    favorites,
    loading,
    getNextPokemons,
    addFavorite,
    removeFavorite
  } = usePokemon()

  const arr = [...Array(20)].map(() => {
    return {
      height: Math.floor(Math.random() * 99)
    }
  });

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.center}>React Native - Alternova</Text>
      {/* {sortElements(arr).map((item, index) => (
        <Text key={index}>{item.height}</Text>
      ))} */}

      <View style={homeStyles.table}>
        <Text style={homeStyles.title}>Lista de Pokémon</Text>
        <FlatList
          data={pokemons}
          keyExtractor={(item:PokemonItem) => `${item.name}-list`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={homeStyles.row}
              onPress={() => addFavorite(item)}
            >
              <Text style={homeStyles.pokemonName}>{item.name}</Text>
              <Image style={homeStyles.pokemonImage} source={{uri: item.img}} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={homeStyles.table}>
        <Text style={homeStyles.title}>Mis Pokémon Favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item: PokemonItem) => `${item.name}-favorite`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={homeStyles.row}
              onPress={() => removeFavorite(item)}
            >
              <Text style={homeStyles.pokemonName}>{item.name}</Text>
              <Image style={homeStyles.pokemonImage} source={{uri: item.img}} />
              </TouchableOpacity>
          )}
          style={homeStyles.list}
        />
      </View>

      <TouchableOpacity style={homeStyles.button} onPress={() => logOut()}>
        <Text style={homeStyles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
