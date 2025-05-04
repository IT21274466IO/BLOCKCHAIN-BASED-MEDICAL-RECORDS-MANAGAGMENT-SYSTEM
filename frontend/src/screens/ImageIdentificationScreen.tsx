import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import moment from 'moment';
import Header from '@/src/components/Header';
import { identifyMedicalImage, getImagePredictionHistory } from '../api/predictApi';

export default function ImageIdentificationScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const result = await getImagePredictionHistory();
            setHistoryLoading(false);
            if (result.success) {
                setHistory(result.data);
            } else {
                console.log(result.message);
            }
        };
        fetchHistory();
    }, []);

    {/** camera function */ }
    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Camera permission is needed to use this feature.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    {/** gallery function */ }
    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Gallery permission is needed to use this feature.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Submit image for identification
    const handleIdentify = async () => {
        if (!image) {
            Alert.alert('Image required', 'Please add an image before identifying.');
            return;
        }

        setLoading(true);
        try {
            const result = await identifyMedicalImage(image);
            setLoading(false);

            router.push({
                pathname: '/category',
                params: {
                    image,
                    category: result.predicted_class,
                    confidence: result.confidence.toString(),
                },
            });
        } catch (err) {
            setLoading(false);
            console.error(err);
            Alert.alert('Error', 'Image identification failed. Please try again.');
        }
    };



    return (
        <ScrollView className="flex-1 bg-[#F9F9F9]">
            <StatusBar barStyle="light-content" />
            <Header />

            {/* Title + Back Arrow */}
            <View className="flex-row items-center px-4 mt-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <Ionicons name="arrow-back" size={22} color="#034C24" />
                </TouchableOpacity>
                <Text className="text-[#034C24] text-lg font-semibold mx-20">Image Identification</Text>
            </View>

            {/* Camera/Image Area */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)} className="px-5 mt-6">
                <View className="bg-[#E9FFF5] rounded-2xl items-center justify-center h-60 overflow-hidden">
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <TouchableOpacity onPress={openCamera}>
                            <Ionicons name="camera-outline" size={80} color="#000" />
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {/* Buttons */}
            <Animated.View entering={FadeInUp.delay(300).duration(700)} className="px-6 mt-6 space-y-4">
                <TouchableOpacity
                    className="bg-[#4C8C6B] py-4 rounded-full items-center border-2 border-yellow-300"
                    onPress={openGallery}
                >
                    <Text className="text-white font-semibold text-base">Add Manually</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-[#9A9F17] py-4 rounded-full items-center mt-5 border-2 border-yellow-300"
                    onPress={handleIdentify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-base">Identify</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>

            {/* History Section */}
            <Animated.View entering={FadeInUp.delay(500).duration(700)} className="px-6 mt-8 ">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-[#034C24] font-semibold text-base">History Details</Text>
                    <TouchableOpacity>
                        <Text className="text-sm text-[#034C24] font-medium">See More</Text>
                    </TouchableOpacity>
                </View>

                {/* History Card */}
                {historyLoading ? (
                    <ActivityIndicator color="#034C24" className="mt-4" />
                ) : history.length === 0 ? (
                    <Text className="text-gray-500 text-sm">No image predictions yet.</Text>
                ) : (
                    history.map((record, index) => (
                        <View key={index} className="border border-[#034C24] rounded-2xl px-4 py-3 bg-white flex-row items-center mt-6">
                            <Image
                                source={{
                                    uri: `http://<your-ip>:5000/uploads/${record.image_path?.split('/').pop()}`,
                                }}
                                className="w-12 h-12 rounded-full"
                            />
                            <View className="flex-1 ml-4">
                                <Text className="text-[#034C24] font-medium">{record.predicted_class}</Text>
                               
                            </View>
                            <Text className="text-xs text-gray-400">
                                {moment(record.timestamp).format('YYYY/MM/DD')}
                            </Text>
                        </View>
                    ))
                )}
            </Animated.View>
        </ScrollView>
    );
}
