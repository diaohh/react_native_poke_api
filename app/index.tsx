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
    <View style={styles.container}>
      <Text style={styles.center}>React Native - Alternova</Text>
      {/* {sortElements(arr).map((item, index) => (
        <Text key={index}>{item.height}</Text>
      ))} */}
      
      <View style={styles.table}>
        <Text style={styles.title}>Lista de Pokémon</Text>
        <FlatList
          data={pokemons}
          keyExtractor={(item:any) => `${item.name}-list`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {addFavorite(item.name)}}
            >
              <Text style={styles.pokemonName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.table}>
        <Text style={styles.title}>Mis Pokémon Favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item:any) => `${item.name}-favorite`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {removeFavorite(item.name)}}
            >
              <Text style={styles.pokemonName}>{item.name}</Text>
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
  table: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  center: {
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  list: {
    marginBottom: 20,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonName: {
    fontSize: 16,
  },
});