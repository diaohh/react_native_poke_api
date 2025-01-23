import { sortElements } from '@/utils';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { usePokemon } from '@/hooks/usePokemon';


export default function HomeScreen() {
  const { logOut } = useAuth();
  const {
    pokemons,
    setPokemons,
    favorites,
    setFavorites,
    loading,
    getNextPokemons
  } = usePokemon()

  const arr = [...Array(20)].map(() => {
    return {
      height: Math.floor(Math.random() * 99)
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.center}>React Native - Alternova</Text>
      {/* {sortElements(arr).map((item, index) => (
        <Text key={index}>{item.height}</Text>
      ))} */}
      
      <View>
        <Text>Lista de Pokémon</Text>
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setFavorites([...favorites, item.name]);
                setPokemons(pokemons.filter((e) => e !== item.name))
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Text>Mis Pokémon Favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                setPokemons([...pokemons, item.name]);
                setFavorites(favorites.filter((e) => e !== item.name))
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      </View>

      <Button title="Cerrar sesión" onPress={() => logOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    textAlign: 'center'
  }
})
