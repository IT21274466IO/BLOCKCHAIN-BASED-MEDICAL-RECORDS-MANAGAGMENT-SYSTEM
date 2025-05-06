import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuthStore } from '../Store/authStore';

export default function Header() {

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.clearAuth);

  const displayName = user?.fullname || 'Guest';
  const profileImage = user?.profile_image;

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    logout(); // clear token 
    setModalVisible(false);
    router.replace('/login'); 
  };




  return (
    <View className="bg-[#14919B] p-4 rounded-b-3xl h-48">
      {/* Top row */}
      <View className="flex-row justify-between items-center mb-4 pt-10">
        {/* Profile + Welcome */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../assets/avatar.jpg')
              }
              className=" w-16 h-16 rounded-full"
            />
          </TouchableOpacity>
          <View className=' ml-4'>
            <Text className="text-white text-md">Hi, WelcomeBack</Text>
            <Text className="text-white font-bold text-xl">{displayName}</Text>
          </View>
        </View>

        {/* Notification + Settings */}
        <View className="flex-row space-x-4 items-center gap-6">
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={22} color="white" />
            {/* Red dot */}
            <View className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View className="flex-row items-center bg-white rounded-full px-4 py-2">
        <Feather name="sliders" size={18} color="#14919B" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          className="flex-1 px-3 text-sm text-[#14919B]"
        />
        <Ionicons name="search" size={18} color="#14919B" />
      </View>
      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white p-6 rounded-t-2xl">
            <Text className="text-center text-[#14919B] font-semibold text-lg mb-4">
              Do you want to logout?
            </Text>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-[#DC2626] py-3 rounded-full items-center"
            >
              <Text className="text-white font-semibold">Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 items-center"
            >
              <Text className="text-[#14919B] font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
