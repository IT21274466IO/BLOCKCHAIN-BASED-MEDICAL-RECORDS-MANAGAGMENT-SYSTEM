import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView , Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Formik } from 'formik';
import signupSchema from '../../validations/signupSchema';
import { registerUser } from '../../api/auth';

export default function signup() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (values: any) => {
      const result = await registerUser(values);
      if (result.success) {
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Sign Up Failed', result.message);
      }
    };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F9F9F9] px-6 pt-16 pb-6">
      
    {/* Back Button */}
    <TouchableOpacity onPress={() => router.back()} className="mb-4">
      <Ionicons name="arrow-back" size={24} color="#4C8C6B" />
    </TouchableOpacity>

    {/* Header */}
    <Text className="text-center text-2xl font-extrabold text-[#4C8C6B] mb-6">Create Account</Text>

    <Formik
      initialValues={{ fullName: '', password: '', email: '', phone: '', dob: '' }}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="space-y-4">
          {/* Full Name */}
          <View>
            <Text className="font-semibold mb-1 text-[#034C24]">Full name</Text>
            <TextInput
              className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm mb-5"
              placeholder="John Doe"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && (
              <Text className="text-red-500 text-xs mt-0 text-right">{errors.fullName}</Text>
            )}
          </View>

          {/* Password */}
          <View>
            <Text className="font-semibold mb-1 text-[#034C24]">Password</Text>
            <View className="flex-row items-center bg-[#E9FFF5] rounded-lg px-4 mb-5">
              <TextInput
                className="flex-1 py-3 text-sm"
                placeholder="************"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text className="text-red-500 text-xs mt-0 text-right">{errors.password}</Text>
            )}
          </View>

          {/* Email */}
          <View>
            <Text className="font-semibold mb-1 text-[#034C24]">Email</Text>
            <TextInput
              className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm mb-5"
              placeholder="example@email.com"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text className="text-red-500 text-xs mt-0 text-right">{errors.email}</Text>
            )}
          </View>

          {/* Phone */}
          <View>
            <Text className="font-semibold mb-1 text-[#034C24]">Mobile Number</Text>
            <TextInput
              className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm mb-5"
              placeholder="+94 70 123 4567"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {errors.phone && touched.phone && (
              <Text className="text-red-500 text-xs mt-0 text-right">{errors.phone}</Text>
            )}
          </View>

          {/* DOB */}
          <View>
            <Text className="font-semibold mb-1 text-[#034C24]">Date Of Birth</Text>
            <TextInput
              className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm"
              placeholder="DD / MM / YYYY"
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
              value={values.dob}
            />
            {errors.dob && touched.dob && (
              <Text className="text-red-500 text-xs mt-0 text-right">{errors.dob}</Text>
            )}
          </View>

          {/* Terms and Privacy */}
          <Text className="text-center text-xs text-gray-500 mt-10">
            By continuing, you agree to{' '}
            <Text className="underline text-black">Terms of Use</Text> and{' '}
            <Text className="underline text-black">Privacy Policy</Text>.
          </Text>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSubmit as any}
            className="bg-[#4C8C6B] py-3 rounded-full items-center mt-5"
          >
            <Text className="text-white font-semibold text-base">Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>

    {/* Social login */}
    <Text className="text-center text-sm text-gray-400 mt-6">or sign up with</Text>
    <View className="flex-row justify-center space-x-6 mt-3 gap-6">
      <Image source={require('../../assets/google.png')} className="w-12 h-12" />
      <Image source={require('../../assets/facebook.png')} className="w-12 h-12" />
      <Image source={require('../../assets/instagram.png')} className="w-12 h-12" />
    </View>

    {/* Bottom Login Link */}
    <View className="flex-row justify-center mt-6">
      <Text className="text-gray-500">Already have an account?</Text>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text className="text-[#4C8C6B] font-semibold ml-3">Log in</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  )
}