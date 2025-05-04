import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import Header from '@/src/components/Header';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function RiskAnalysisScreen() {
  const { reportImage, riskLevel, fbsValue } = useLocalSearchParams();

// Normalize input
const normalizedRiskLevel = (Array.isArray(riskLevel) ? riskLevel.join(' ') : riskLevel || '').trim().toLowerCase();



const getRiskEmoji = (level: string) => {
  switch (level) {
    case 'low':
      return '😊';
    case 'medium':
      return '😐';
    case 'high':
      return '😟';
    default:
      return '❓';
  }
};

const getRiskMessage = (level: string) => {
  switch (level) {
    case 'low':
      return 'Your sugar levels seem normal. Keep up the healthy lifestyle!';
    case 'medium':
      return 'Monitor regularly and consider consulting a nutritionist.';
    case 'high':
      return 'Please consult a doctor soon. Risk of diabetes may be elevated.';
    default:
      return 'Risk level not recognized.';
  }
};

  return (
    <ScrollView className="flex-1 bg-[#F9F9F9]">
      <StatusBar barStyle="light-content" />
      <Header />

      {/* Title + Back */}
      <View className="flex-row items-center px-4 mt-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={22} color="#034C24" />
        </TouchableOpacity>
        <Text className="text-[#034C24] text-lg font-semibold mx-24">Risk Analysis</Text>
      </View>

      {/* Report Image */}
      <Animated.View entering={FadeInDown.delay(100).duration(600)} className="mt-6 px-6">
        <View className="rounded-3xl overflow-hidden bg-[#F2FFFC]">
          <Image
            source={
              reportImage
                ? { uri: reportImage as string }
                : require('../assets/pressure.jpg')
            }
            className="w-full h-72 "
            resizeMode="cover"
          />
        </View>
      </Animated.View>

      


      {/* Risk Result */}
      <Animated.View entering={FadeInUp.delay(300).duration(600)} className="items-center mt-8 p-4">
        <Text className="text-[#034C24] font-semibold text-lg mb-2">Fasting Blood Sugar (FBS) Value</Text>
        <Text className="text-2xl text-[#034C24] font-bold mb-6">{fbsValue || 'N/A'} mg/dL</Text>

        <Text className="text-[#034C24] font-semibold text-lg mb-4">Your Risk Level</Text>
        <View className="bg-[#E9FFF5] px-10 py-8 rounded-3xl items-center p-5">
        <Text className="text-8xl">{getRiskEmoji(normalizedRiskLevel)}</Text>
          <Text className="text-3xl text-[#034C24] font-bold mt-2">
            {riskLevel}
          </Text>
          <Text className="text-center text-[#034C24] text-base mt-4 px-6">
          {getRiskMessage(normalizedRiskLevel)}
  </Text>
        </View>

      
      </Animated.View>
    </ScrollView>
  );
}
