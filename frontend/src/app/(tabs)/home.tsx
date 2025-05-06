import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import Header from '@/src/components/Header';

export default function home() {
    return (
        <ScrollView className="flex-1 relative">
            <StatusBar barStyle="light-content" backgroundColor="#F9F9F9" />

            {/* Blurred Green Blobs */}

            {/* Top Left Rings */}
            <View className="absolute top-[-80] left-[-80] w-[250px] h-[350px] rounded-full bg-[#4C8C6B] opacity-30" />
            <View className="absolute top-[-40] left-[-40] w-[150px] h-[250px] rounded-full bg-[#14919B] opacity-20" />

            {/* Bottom Right Rings */}
            <View className="absolute bottom-[-150] right-[-180] w-[350px] h-[350px] rounded-full bg-[#4C8C6B] opacity-30" />
            <View className="absolute bottom-[-90] right-[-130] w-[250px] h-[250px] rounded-full bg-[#14919B] opacity-20" />

            {/* Header */}
            <Header />

            {/* Body */}
            <Animated.View entering={FadeInUp.delay(200).duration(700)} className="items-center mt-8">
                <Image source={require('../../assets/new.png')} className="w-64 h-64" />
                <Text className="text-[#034C24] font-extrabold text-3xl mt-4 ">Medup</Text>
                <Text className="text-gray-500 text-sm mt-1">Care That’s Always With You.</Text>
            </Animated.View>

            {/* Buttons */}
            <Animated.View entering={FadeInUp.delay(400).duration(700)} className="mt-10 space-y-4 p-5">
                <TouchableOpacity
                    onPress={() => router.push('/identify')}
                    className="bg-[#29d3ba] border border-[#14919B] rounded-3xl py-4 items-center mb-6"
                >
                    <Text className="text-[#034C24] font-semibold text-base">Image Identification</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push('/symptoms')}
                    className="bg-[#29d3ba] border border-[#14919B] rounded-3xl py-4 items-center mb-6"
                >
                    <Text className="text-[#034C24] font-semibold text-base">Symptoms Identification</Text>
                </TouchableOpacity>

                <TouchableOpacity
                
                    onPress={() => router.push('/riskscreen')}
                    className="bg-[#29d3ba] border border-[#14919B] rounded-3xl py-4 items-center"
                >
                    <Text className="text-[#034C24] font-semibold text-base">Risk Analysis</Text>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    );
}
