import { View, Text, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React from 'react'
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    logIn,
    register
  } = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="Correo Electronico"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Contraseña"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        { loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Iniciar sesión" onPress={() => logIn()} />
            <Button title="Registrarse" onPress={() => register()} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  )
};

export default LoginPage;