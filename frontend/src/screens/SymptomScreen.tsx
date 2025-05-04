import React, { useState ,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import Header from '@/src/components/Header';
import { router } from 'expo-router';
import moment from 'moment';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { predictDisease , getPredictionHistory } from '../api/predictApi'



export default function SymptomScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<'skin' | 'eye' | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [history, setHistory] = useState<any[]>([]);


    // Fetch prediction history
    useEffect(() => {
        const fetchHistory = async () => {
          setLoadingHistory(true);
          const result = await getPredictionHistory();
          setLoadingHistory(false);
          if (result.success) {
            setHistory(result.data);
          } else {
            console.log(result.message);
          }
        };
        fetchHistory();
      }, []);



    //function for api
    const handlePrediction = async () => {
        if (!image || !selectedType) {
            Alert.alert("Missing", "Please select an image and disease type.");
            return;
        }

        setLoading(true);
        try {
            const result = await predictDisease(image, selectedType);
            setLoading(false);

            console.log("Result from backend:", result);

            if (result?.doctor_info) {
                router.push({
                    pathname: '/predict',
                    params: {
                        name: result.doctor_info["Doctor Name"],
                        specialty: result.doctor_info.Specialist,
                        hospital: result.doctor_info.Hospital,
                        contact: result.doctor_info.Contact,
                        disease: result.label,
                        confidence: result.confidence.toString(),
                        description: result.doctor_info.Description,
                        image, // Optional: to show the scanned image on result screen
                    },
                });
            } else {
                Alert.alert("No doctor found for this condition.");
            }
        } catch (err) {
            setLoading(false);
            Alert.alert("Error", "Prediction failed. Please try again.");
            console.error(err);
        }
    };


    // Open camera
    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Camera permission is needed to use this feature.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // You can navigate or process the image here
        }
    };

    // Open gallery
    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Gallery permission is needed to use this feature.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // You can navigate or process the image here
        }
    };


    return (
        <ScrollView className="flex-1 bg-[#F9F9F9]">
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            {/** Header */}
            <Header />

            {/* Main Content */}
            <View className="px-6 pt-4">
                {/* Back Arrow (optional, can be removed if using tabs) */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#034C24" />
                </TouchableOpacity>

                {/* Scan area */}

                <Animated.View
                    entering={FadeInUp.duration(700)} className="items-center justify-center mt-4">
                    {/* Blurred background circle */}

                    <TouchableOpacity
                        onPress={openCamera}
                        className=" w-60 h-60 bg-[#E9FFF5] rounded-full items-center justify-center overflow-hidden border-2 border-yellow-500"
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Ionicons name="camera-outline" size={64} color="#034C24" />
                        )}
                    </TouchableOpacity>
                </Animated.View>


                {/* Buttons */}
                <Animated.View entering={FadeInUp.delay(200).duration(700)} className="mt-6 space-y-3 ">

                    <TouchableOpacity
                        onPress={openGallery}
                        className="bg-[#4C8C6B] py-3 rounded-full items-center"
                    >
                        <Text className="text-white font-semibold text-base">Add Manually</Text>
                    </TouchableOpacity>

                    {/* Skin / Eye Selection */}
                    <View className="flex-row justify-center space-x-4 mt-5 gap-5">
                        <TouchableOpacity
                            onPress={() => setSelectedType('skin')}
                            className={`px-6 py-2 rounded-full border ${selectedType === 'skin' ? 'bg-[#4C8C6B]' : 'bg-white'
                                }`}
                        >
                            <Text
                                className={`font-semibold ${selectedType === 'skin' ? 'text-white' : 'text-[#034C24]'
                                    }`}
                            >
                                Skin
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('eye')}
                            className={`px-6 py-2 rounded-full border ${selectedType === 'eye' ? 'bg-[#4C8C6B]' : 'bg-white'
                                }`}
                        >
                            <Text
                                className={`font-semibold ${selectedType === 'eye' ? 'text-white' : 'text-[#034C24]'
                                    }`}
                            >
                                Eye
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="bg-[#9A9F17] py-3 rounded-full items-center mt-6"
                        disabled={loading}
                        onPress={handlePrediction}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-semibold text-base">Check Disease</Text>
                        )}
                    </TouchableOpacity>

                </Animated.View>

                {/* History Section */}
                <Animated.View entering={FadeInDown.delay(400).duration(700)}>
                    <View className="mt-8 flex-row justify-between items-center ">
                        <Text className="font-semibold text-[#034C24] text-base">History Details</Text>
                        <TouchableOpacity>
                            <Text className="text-[#034C24] font-medium text-sm">See More</Text>
                        </TouchableOpacity>
                    </View>

                    {/* History Card */}
                    {loadingHistory ? (
            <ActivityIndicator color="#034C24" className="mt-4" />
          ) : history.length > 0 ? (
            history.map((record, index) => (
                    <View key={index}
                     className="mt-4 border border-[#034C24] rounded-xl p-4 flex-row items-center space-x-4 bg-white">
                        <Image
                            source={{
                                uri: `http://<your-ip>:5000/uploads/${record.local_image_path.split('/').pop()}`,
                              }}// Replace with your eye image
                            className="w-14 h-14 rounded-full"
                        />
                        <View className="flex-1 ml-6">
                            <Text className="font-semibold text-[#034C24]">{record.model_type?.toUpperCase()} - {record.predicted_label}</Text>
                            <Text className="text-gray-500 text-xs">Checked By {record.doctor_info?.['Doctor Name'] || 'Unknown'}</Text>
                        </View>
                        <Text className="text-gray-400 text-xs">{moment(record.timestamp).format('YYYY/MM/DD')}</Text>
                    </View>
                    ))
                ) : (
                  <Text className="text-center text-gray-500 mt-4">No predictions found.</Text>
                )}
                </Animated.View>
            </View>
        </ScrollView>

    )
}