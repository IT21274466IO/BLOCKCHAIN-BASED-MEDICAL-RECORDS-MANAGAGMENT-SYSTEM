import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Header from '@/src/components/Header';

export default function ImageCategorizationResult() {
  const { image, category, confidence } = useLocalSearchParams();

  const parsedConfidence = confidence ? parseFloat(confidence as string) : null;

  return (
    <ScrollView className="flex-1 bg-[#F9F9F9] ">
      <StatusBar barStyle="light-content" />
      <Header />

      {/* Title + Back */}
      <View className="flex-row items-center px-4 mt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={22} color="#034C24" />
        </TouchableOpacity>
        <Text className="text-[#034C24] text-lg font-semibold mx-20">Image Identification</Text>
      </View>

      {/* Image Box */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)} className="mt-8 mx-6">
        <View className="rounded-3xl overflow-hidden items-center justify-center bg-[#F2FFFC]">
          <Image
            source={{ uri: image as string }}
            className="w-full h-72"
            resizeMode="cover"
          />
        </View>
      </Animated.View>

      {/* Label */}
      <Animated.View entering={FadeInUp.delay(400).duration(700)} className="items-center mt-8 px-6">
        <Text className="text-[#034C24] text-base font-medium mb-2">
          Your Uploaded File Categorized
        </Text>
        <Text className="text-3xl font-bold text-[#034C24] text-center">{category}</Text>
      </Animated.View>
    </ScrollView>
  );
}
