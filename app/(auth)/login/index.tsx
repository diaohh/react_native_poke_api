import { View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";
import React, { useState } from 'react'
import { useAuth } from "@/hooks/useAuth";
import { loginStyles } from "@/styles/loginStyles";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    logIn,
    register,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={loginStyles.container}
    >
      <View style={loginStyles.card}>
        <View style={loginStyles.title}>
          <Image style={loginStyles.icon} source={require('../../../assets/images/PokeballIcon.png')} />
          <Text style={loginStyles.titleLabel}>{isLogin ? "Iniciar sesión" : "Registrarse"}</Text>
        </View>
        <TextInput
          style={loginStyles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={loginStyles.input}
          secureTextEntry
          placeholder="Contraseña"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#E53935" />
        ) : (
          <TouchableOpacity
            style={loginStyles.button}
            onPress={() => (isLogin ? logIn() : register())}
          >
            <Text style={loginStyles.buttonText}>
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={loginStyles.toggle}
        >
          <Text style={loginStyles.toggleText}>
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </Text>
          <Text style={loginStyles.toggleLink}>
            {isLogin ? "Presiona aquí para registrarte" : "Presiona aquí para iniciar sesión"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
