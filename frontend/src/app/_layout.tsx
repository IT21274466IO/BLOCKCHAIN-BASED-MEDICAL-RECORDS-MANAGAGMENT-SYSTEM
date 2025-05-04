
import React from 'react';
import { SplashScreen, Stack } from "expo-router";
import "../../global.css"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
    </Stack>
    
    
        </GestureHandlerRootView>
  )
}