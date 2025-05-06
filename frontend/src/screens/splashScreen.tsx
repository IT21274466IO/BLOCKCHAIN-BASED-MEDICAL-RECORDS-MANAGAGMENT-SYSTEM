import React, { useEffect } from 'react';
import { View, Image, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function splashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace('/welcome');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);


    return (
        <View className="flex-1 items-center justify-center bg-[#14919B]">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Top Left Rings */}
            <View className="absolute top-[-80] left-[-80] w-[350px] h-[350px] rounded-full bg-[#0aae7d] opacity-30" />
            <View className="absolute top-[-40] left-[-40] w-[250px] h-[250px] rounded-full bg-[#0aae7d] opacity-50" />

            {/* Bottom Right Rings */}
            <View className="absolute bottom-[-80] right-[-80] w-[350px] h-[350px] rounded-full bg-[#0aae7d] opacity-30" />
            <View className="absolute bottom-[-40] right-[-40] w-[250px] h-[250px] rounded-full bg-[#0aae7d] opacity-50" />

            {/* Animated Logo + Text */}
            <Animated.View entering={FadeIn.duration(800)} className="items-center ">
                <Image
                    source={require('../assets/logo.png')}
                    className="w-28 h-28 mb-4"
                    resizeMode="contain"
                />
                <Text className="text-white text-5xl font-semibold tracking-wide">
                    Med<Text className="font-light">Up</Text>
                </Text>
            </Animated.View>
        </View>
    );
}