
import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert, StatusBar ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { updateProfile, deleteProfile , getProfile } from '../../api/auth';

export default function profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getProfile();
      if (response.success) {
        const { fullname, email, mobile, profile_image, dob } = response.data;

        setInitialValues({
          fullName: fullname,
          phone: mobile || '',
          email,
          dob: dob || '',
        });

        if (profile_image) {
          setProfileImage(profile_image);
        }
      } else {
        Alert.alert('Error', response.message);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#034C24" />
        <Text className="mt-4 text-[#034C24] font-semibold">Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#F9F9F9] px-6 pt-10">
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      {/* Back Icon */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-10 left-6 z-10">
        <Ionicons name="arrow-back" size={24} color="#034C24" />
      </TouchableOpacity>

      <Text className="text-center text-xl font-bold text-[#034C24] mb-4 mt-8">Profile</Text>

      {/* Profile Image */}
      <View className="items-center mb-6 mt-5">
        <View className="relative">
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/avatar.jpg')}
            className="w-28 h-28 rounded-full"
          />
          <TouchableOpacity
            onPress={handleImagePick}
            className="absolute bottom-0 right-0 bg-[#4C8C6B] p-1 rounded-full"
          >
            <Ionicons name="create-outline" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          const result = await updateProfile({
            fullname: values.fullName,
            email: values.email,
            mobile: values.phone,
            profile_image: profileImage || undefined,
          });

          if (result.success) {
            Alert.alert('Success', 'Profile updated successfully!');
          } else {
            Alert.alert('Error', result.message);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <View className="space-y-4">
            {/* Full Name */}
            <View>
              <Text className="font-semibold mb-2 text-[#034C24] mt-5">Full Name</Text>
              <TextInput
                className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm"
                placeholder="John Doe"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="font-semibold mb-2 text-[#034C24] mt-5">Phone Number</Text>
              <TextInput
                className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm"
                placeholder="+123 567 89000"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
            </View>

            {/* Email */}
            <View>
              <Text className="font-semibold mb-2 text-[#034C24] mt-5">Email</Text>
              <TextInput
                className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm"
                placeholder="johndoe@example.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            {/* Date of Birth */}
            <View>
              <Text className="font-semibold mb-2 text-[#034C24] mt-5">Date Of Birth</Text>
              <TouchableOpacity
                className="bg-[#E9FFF5] rounded-lg px-4 py-3"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-sm text-gray-700">{values.dob || 'DD / MM / YYYY'}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString('en-GB');
                    setFieldValue('dob', formatted);
                  }
                }}
                maximumDate={new Date()}
              />
            )}

            {/* Buttons */}
            <View className="flex-row justify-between mt-12">
              <TouchableOpacity
                onPress={handleSubmit as any}
                className="bg-[#4C8C6B] flex-1 py-3 rounded-full items-center mr-2"
              >
                <Text className="text-white font-semibold text-base">Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#DC2626] flex-1 py-3 rounded-full items-center ml-2"
                onPress={() =>
                  Alert.alert('Confirm Delete', 'Are you sure you want to delete your profile?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: async () => {
                        const result = await deleteProfile();
                        if (result.success) {
                          Alert.alert('Deleted', 'Your profile was deleted.');
                          router.replace('/login');
                        } else {
                          Alert.alert('Error', result.message);
                        }
                      },
                    },
                  ])
                }
              >
                <Text className="text-white font-semibold text-base">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
