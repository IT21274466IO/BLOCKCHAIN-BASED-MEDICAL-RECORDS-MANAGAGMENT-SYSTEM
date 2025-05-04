import React from 'react';
import { View, Text, Image, TouchableOpacity ,StatusBar } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-[#F9F9F9] items-center  px-6 pb-10 pt-20">
         <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Illustration */}
      <Animated.View entering={FadeInUp.delay(200).duration(800)} className="w-full items-center">
        <Image
          source={require('../assets/welcome.png')}
          className="w-[500px] h-[500px]"
          resizeMode="contain"
        />
      </Animated.View>

      {/* Text Content */}
      <Animated.View entering={FadeInUp.delay(400).duration(800)} className="items-center mt-0">
        <Text className="text-center text-gray-500 text-sm px-4">
        Book appointments with trusted doctors anytime, anywhere. Get personalized care and health support with just a tap.
        </Text>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={() => router.push('/signup')}
          className="bg-[#4C8C6B] px-10 py-3 rounded-full mt-20"
        >
          <Text className="text-white font-semibold text-base">Sign Up</Text>
        </TouchableOpacity>

        {/* Log In Link */}
        <View className="flex-row space-x-1 mt-8">
          <Text className="text-gray-500">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-[#4C8C6B] font-semibold ml-3">Log In</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}