import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

interface Doctor {
  name: string;
  specialty: string;
  image: any;
}

interface Props {
  doctor: Doctor;
  index: number;
}

export default function DoctorCard({ doctor, index }: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/doctor',
          params: {
            name: doctor.name,
            specialty: doctor.specialty,
            imageKey: doctor.name,
          },
        })
      }
    >
      <Animated.View
        entering={FadeInUp.delay(index * 150).duration(600)}
        className="bg-white rounded-2xl mb-4 p-4 flex-row items-center space-x-4 border border-[#14919B]"
      >
        <Image source={doctor.image} className="w-14 h-14 rounded-full" />
        <View className="flex-1 ml-5">
          <Text className="font-semibold text-[#14919B]">{doctor.name}</Text>
          <Text className="text-xs text-gray-600">{doctor.specialty}</Text>
          <View className="flex-row space-x-4 mt-2 gap-5">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="star" size={14} color="#FACC15" />
              <Text className="text-xs text-gray-600 ml-1">5</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Feather name="eye" size={14} color="#14919B" />
              <Text className="text-xs text-gray-600 ml-1">60</Text>
            </View>
          </View>
        </View>
        <View className="flex-col items-end space-y-3 gap-3">
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={20} color="#14919B" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={20} color="#14919B" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

