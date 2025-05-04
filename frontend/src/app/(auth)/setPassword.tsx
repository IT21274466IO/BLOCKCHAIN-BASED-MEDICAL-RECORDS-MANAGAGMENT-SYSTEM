import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import setPasswordSchema from '../../validations/setPasswordSchema';

export default function setPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F9F9F9] px-6 pt-16 pb-6">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Ionicons name="arrow-back" size={24} color="#4C8C6B" />
            </TouchableOpacity>

            {/* Header */}
            <Text className="text-xl font-extrabold text-[#034C24] mb-2 text-center">Set Password</Text>
            <Text className="text-sm text-gray-500 mb-6 text-center">
                Create a strong password to secure your account and access your health dashboard.
            </Text>

            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={setPasswordSchema}
                onSubmit={(values) => {
                    console.log('Password updated:', values);
                    router.replace('/login')
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="space-y-4">
                        {/* Password */}
                        <View>
                            <Text className="font-semibold mb-1 text-[#034C24] mt-8">Password</Text>
                            <View className="flex-row items-center bg-[#E9FFF5] rounded-lg px-4">
                                <TextInput
                                    className="flex-1 py-3 text-sm "
                                    placeholder="********"
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
                                <Text className="text-red-500 text-xs mt-1 text-right">{errors.password}</Text>
                            )}
                        </View>

                        {/* Confirm Password */}
                        <View>
                            <Text className="font-semibold mb-1 text-[#034C24] mt-8">Confirm Password</Text>
                            <View className="flex-row items-center bg-[#E9FFF5] rounded-lg px-4">
                                <TextInput
                                    className="flex-1 py-3 text-sm "
                                    placeholder="********"
                                    secureTextEntry={!showConfirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <Text className="text-red-500 text-xs mt-1 text-right">{errors.confirmPassword}</Text>
                            )}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit as any}
                            className="bg-[#4C8C6B] py-3 rounded-full items-center mt-10"
                        >
                            <Text className="text-white font-semibold text-base">Create New Password</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}