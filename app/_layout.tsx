import { FirebaseAuth } from '@/utils/FirebaseConfig';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, User } from 'firebase/auth';
import React from 'react';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      setUser(user)
    } )
  }, [])
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  useEffect(() => {
    if(!user && segments[0] !== '(auth)') router.push("/login")
    if(user && segments[0] === '(auth)') router.push("/")
  }, [segments, user])

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack initialRouteName='(auth)/login/index'>
        {user && (
          <Stack.Screen name="index" options={{headerShown: false}} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}