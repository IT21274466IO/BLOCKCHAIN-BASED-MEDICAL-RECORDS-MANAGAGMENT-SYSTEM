import React from 'react';
import { View, Text, TouchableOpacity ,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Props {
  name: string;
  specialty: string;
  hospital: string;
  contact: string;
  image: any;
  onConfirm?: () => void;
}

export default function AppointmentCard({ name, specialty, hospital, contact, image, onConfirm }: Props) {

  return (
    <View className="border rounded-2xl p-4 bg-white mb-6">
      <Text className="text-sm text-gray-500">10 AM</Text>
      <View className="mt-2 p-5 rounded-xl bg-[#E9FFF5]">
        <View className="flex-row items-center space-x-4 gap-5">
          {image && <Image source={image} className="w-14 h-14 rounded-full" />}
          <View className="flex-1">
            <Text className="font-bold text-[#034C24]">{name}</Text>
            <Text className="text-xs text-gray-600 mt-1">🩺   {specialty}</Text>
            <Text className="text-xs text-gray-600 mt-1">🏥   {hospital}</Text>
            {contact && (
              <TouchableOpacity className="mt-2" onPress={() => console.log(`Call ${contact}`)}>
                <Text className="text-xs text-[#034C24]">📞   {contact}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity onPress={onConfirm}>
              <Ionicons name="checkmark-done-circle-outline" size={24} color="#4C8C6B" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Cancelled')}>
              <Ionicons name="close-circle-outline" size={24} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
