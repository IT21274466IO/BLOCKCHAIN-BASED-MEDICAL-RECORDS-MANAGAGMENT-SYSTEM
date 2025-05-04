
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Header from '../components/Header';
import doctorData from '../Data/doctorData';
import { createAppointment } from '../api/appointmentApi';

const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const dates = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DoctorProfile() {
  const params = useLocalSearchParams();
  const {
    name,
    specialty,
    hospital,
    contact,
    selectedDate,
    doctorEmail,
  } = params;

  const selectedDay = selectedDate ? parseInt(selectedDate as string) : null;
  const doctor = doctorData.find(doc => doc.name === name);

  const getFormattedDate = () => {
    if (!selectedDay) return '';
    const today = new Date();
    today.setDate(selectedDay);
    return today.toISOString().split('T')[0];
  };

  const handleAppointmentSubmit = async () => {
    if (!doctorEmail || !selectedDate) {
      Alert.alert('Error', 'Doctor email or selected date is missing!');
      return;
    }

    const dateStr = getFormattedDate();
    const result = await createAppointment(doctorEmail as string, dateStr);

    if (result.success) {
      Alert.alert('Success', 'Appointment created successfully!');
      router.replace('/home');
    } else {
      Alert.alert('Error', result.message || 'Something went wrong.');
    }
  };

  return (
    <View className='flex-1'>
      <Header />
      <ScrollView className="bg-white px-4 pt-5">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="">
          <Ionicons name="arrow-back" size={24} color="#034C24" />
        </TouchableOpacity>

        <Animated.View entering={FadeInUp.duration(600)}>
          {/* Header */}
          <Text className="text-center text-xl font-bold text-[#034C24] mb-4">Schedule</Text>

          {/* Profile Card */}
          <View className="items-center bg-[#E9FFF5] rounded-2xl p-4">
            <Image
              source={doctor?.image || require('../assets/avatar.jpg')}
              className="w-32 h-32 rounded-full mb-3"
            />
            <Text className="text-lg font-bold text-[#034C24]">{doctor?.name}</Text>
            <Text className="text-sm text-gray-500">{doctor?.specialty}</Text>

            {/* Stats */}
            <Text className="text-sm text-gray-600 mt-2">⭐ {doctor?.rating} | 👁️ {doctor?.views} views</Text>
            <Text className="text-xs text-gray-500 mt-1">Mon - Sat / 9AM - 4PM</Text>
          </View>

          {/* Profile Text */}
          <Text className="text-[#034C24] font-bold mt-6 mb-2">Profile</Text>
          <Text className="text-sm text-gray-600 leading-5">
            {doctor?.description || 'No profile description available.'}
          </Text>

          {/* Calendar Section */}
          <Text className="text-[#034C24] font-bold mt-6 mb-5 text-center">📅 Select Appointment Date</Text>

          {/* Weekday Headers */}
          <View className="flex-row justify-between mb-2 px-2">
            {daysOfWeek.map((day) => (
              <Text key={day} className="text-xs font-semibold text-[#034C24]">
                {day}
              </Text>
            ))}
          </View>

          {/* Non-selectable Date Grid */}
          <View className="flex-row flex-wrap justify-between">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
              <View
                key={num}
                className={`w-[13%] aspect-square m-1 rounded-full items-center justify-center ${
                  selectedDay === num ? 'bg-[#4C8C6B]' : 'bg-[#E9FFF5] opacity-40'
                }`}
              >
                <Text className={`text-sm ${selectedDay === num ? 'text-white' : 'text-gray-400'}`}>
                  {num}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity
        className="bg-[#4C8C6B] m-5 p-4 rounded-full items-center"
        onPress={handleAppointmentSubmit}
      >
        <Text className="text-white text-base font-bold"> Receive Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}
