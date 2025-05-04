import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView ,Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { loginUser } from '../../api/auth';

export default function login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: { identifier: string; password: string }) => {
        setLoading(true);
        const result = await loginUser(values.identifier, values.password);
        setLoading(false);

        if (result.success) {
            router.push('/(tabs)/home');
        } else {
            Alert.alert('Login Failed', result.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F9F9F9] px-6 pt-16 pb-6">

            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Ionicons name="arrow-back" size={24} color="#4C8C6B" />
            </TouchableOpacity>

            {/* Header */}
            <Text className="text-center text-xl font-extrabold text-[#034C24] mb-2">LOG IN</Text>
            <Text className="text-xl font-bold text-[#034C24] mb-5">Welcome</Text>
            <Text className="text-sm text-gray-500 mb-6">
                Log in to access your appointments, manage your health records, and connect with doctors anytime, anywhere.
            </Text>


            <Formik
                initialValues={{ identifier: '', password: '' }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View className="space-y-4">

                        {/* Email or Phone */}
                        <View>
                            <Text className="font-semibold mb-1 text-[#034C24]">Email or Mobile Number</Text>
                            <TextInput
                                className="bg-[#E9FFF5] rounded-lg px-4 py-3 text-sm mb-6"
                                placeholder="example@example.com"
                                onChangeText={handleChange('identifier')}
                                onBlur={handleBlur('identifier')}
                                value={values.identifier}
                            />
                        </View>

                        {/* Password */}
                        <View>
                            <Text className="font-semibold mb-1 text-[#034C24]">Password</Text>
                            <View className="flex-row items-center bg-[#E9FFF5] rounded-lg px-4">
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
                            <TouchableOpacity onPress={() => router.push('/setPassword')} className="mt-5 self-end">
                                <Text className="text-sm text-[#034C24] font-semibold">Forget Password</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleSubmit as any}
                            disabled={loading}
                            className="bg-[#4C8C6B] py-3 rounded-full items-center mt-8"
                        >
                            <Text className="text-white font-semibold text-base">{loading ? 'Logging in...' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            {/* Social login */}
            <Text className="text-center text-sm text-gray-400 mt-6">or sign up with</Text>
            <View className="flex-row justify-center space-x-6 mt-6 gap-6">
                <Image source={require('../../assets/google.png')} className="w-12 h-12" />
                <Image source={require('../../assets/facebook.png')} className="w-12 h-12" />
                <Image source={require('../../assets/instagram.png')} className="w-12 h-12" />
            </View>

            {/* Bottom Sign Up Link */}
            <View className="flex-row justify-center mt-6">
                <Text className="text-gray-500">Don’t have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text className="text-[#4C8C6B] font-semibold ml-2">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}