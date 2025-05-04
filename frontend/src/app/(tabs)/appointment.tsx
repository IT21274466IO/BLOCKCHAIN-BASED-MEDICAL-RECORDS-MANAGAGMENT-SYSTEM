
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import Header from '@/src/components/Header';
import { getMyAppointments } from '../../api/appointmentApi';

const tabs = ['Complete', 'Upcoming', 'Cancelled'];

const formatDate = (dateObj: any) => {
  if (typeof dateObj === 'string') return new Date(dateObj).toDateString();
  if (dateObj?.$date) return new Date(dateObj.$date).toDateString();
  return 'Invalid date';
};

const formatStatus = (appointmentDate: any) => {
  const date = new Date(appointmentDate?.$date || appointmentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) return 'Upcoming';
  if (date < today) return 'Complete';
  return 'Upcoming';
};
export default function AppointmentScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [cancelledIds, setCancelledIds] = useState<string[]>([]);

  const fetchAppointments = async () => {
    const result = await getMyAppointments();
    if (result.success) {
      const enriched = result.data.map((item: any) => ({
        ...item,
        _id: item._id?.$oid || item._id,
        status: formatStatus(item.appointment_date),
      }));
      setAppointments(enriched);
    } else {
      Alert.alert('Fetch Error', result.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (item) => item.status === activeTab && !cancelledIds.includes(item._id)
  );

  
  return (
    <View className="flex-1">
      <Header />
      <ScrollView className="bg-[#F9F9F9] px-4 pt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#034C24" />
        </TouchableOpacity>

        <Text className="text-center text-xl font-bold text-[#034C24] mb-6">
          All Appointment
        </Text>

        <View className="flex-row justify-center space-x-4 mb-6 mt-8 gap-5 ">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border ${
                activeTab === tab ? 'bg-[#4C8C6B] border-transparent' : 'border-[#4C8C6B]'
              }`}
            >
              <Text className={`text-sm ${activeTab === tab ? 'text-white' : 'text-[#034C24]'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="space-y-4">
          {filteredAppointments.map((item, index) => (
            <Animated.View
              entering={FadeInUp.delay(index * 100)}
              key={item._id || index}
              className="bg-white p-4 rounded-2xl shadow-sm mb-5"
            >
              <View className="flex-row items-center space-x-4 gap-5">
                <Image
                  source={
                    item.profile_image
                      ? { uri: item.profile_image }
                      : require('../../assets/avatar.jpg')
                  }
                  className="w-14 h-14 rounded-full"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-[#034C24]">{item.doctor_name}</Text>
                  <Text className="text-xs text-gray-500">{item.specialty}</Text>
                </View>
              </View>

              <View className="flex-row items-center mt-4 space-x-2 gap-3">
                <Ionicons name="calendar-outline" size={16} color="#034C24" />
                <Text className="text-sm text-[#034C24]">
                  {formatDate(item.appointment_date)}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mt-4">
                <TouchableOpacity className="bg-[#4C8C6B] px-6 py-2 rounded-full">
                  <Text className="text-white font-semibold">Details</Text>
                </TouchableOpacity>
                <View className="flex-row space-x-4 gap-6">
                  <TouchableOpacity>
                    <Ionicons name="checkmark" size={22} color="#4C8C6B" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setCancelledIds([...cancelledIds, item._id])}
                  >
                    <Ionicons name="close" size={22} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
