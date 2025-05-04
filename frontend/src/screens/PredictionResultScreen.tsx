import React, { useState ,useEffect} from 'react';
import { ScrollView, View, TouchableOpacity, Text ,Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import AppointmentCard from '../components/AppointmentCard';
import DoctorCard from '../components/DoctorCard';
import doctorData from '../Data/doctorData';
import { getDoctorAvailability } from '../api/appointmentApi';

interface DateItem {
  day: string;
  date: number;
}

export default function PredictionResultScreen() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(2);
  const [availableDates, setAvailableDates] = useState<DateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rawDates, setRawDates] = useState<string[]>([]);


  // Data passed from SymptomScreen
  const {
    name,
    specialty,
    hospital,
    contact,
    disease,
    confidence,
    description,
    image, // optional image uri passed from prediction screen
  } = useLocalSearchParams();

  const confidenceValue = confidence ? parseFloat(confidence as string) : 0;
 

// Find matching doctor for image
const matchedDoctor = doctorData.find(doc => doc.name === name);
const doctorEmail = matchedDoctor?.email;

  const formatDates = (dateStrings: string[]): DateItem[] => {
    return dateStrings.map((dateStr) => {
      const dateObj = new Date(dateStr);
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      return {
        day: days[dateObj.getDay()],
        date: dateObj.getDate(),
      };
    });
  };



  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorEmail) {
        Alert.alert('Doctor email not found');
        return;
      }

      setLoading(true);
      const result = await getDoctorAvailability(doctorEmail);
      if (result.success && result.data.length > 0) {
        const formatted = formatDates(result.data);
        setAvailableDates(formatted);
      } else {
        Alert.alert('No availability', result.message || 'Doctor not available');
      }
      setLoading(false);
    };

    fetchAvailability();
  }, []);



  const handleAppointment = () => {
    const selectedDate = availableDates[selectedDateIndex];
    if (!selectedDate) return Alert.alert('Error', 'No date selected');

    router.push({
      pathname: '/doctor',
      params: {
        name,
        specialty,
        hospital,
        contact,
        selectedDate: availableDates[selectedDateIndex]?.date.toString(),
        image,
        doctorEmail: matchedDoctor?.email,
      },
    });
  };

  return (
    <ScrollView className="flex-1 bg-[#F9F9F9]">
      <Header />
      <TouchableOpacity onPress={() => router.back()} className=" mt-5 ml-5">
        <Ionicons name="arrow-back" size={24} color="#034C24" />
      </TouchableOpacity>

      <Text className="text-center text-xl font-bold text-[#034C24] mb-6">
        Recommendations
      </Text>

      {/* Prediction Result Summary */}
      <View className="bg-white rounded-xl p-4 mx-4 mb-4 border border-[#4C8C6B]">
        <Text className="text-[#034C24] font-semibold">Predicted Disease:</Text>
        <Text className="text-gray-700 mb-2">{disease}</Text>

        <Text className="text-[#034C24] font-semibold">Confidence:</Text>
        <Text className="text-gray-700 mb-2">{confidenceValue.toFixed(2)}%</Text>

        <Text className="text-[#034C24] font-semibold">Description:</Text>
        <Text className="text-gray-700">{description}</Text>
      </View>


      <View className="px-4 pt-4 pb-10">
      <Text className="text-left text-lg font-bold text-[#034C24] mb-6">
        Available Dates
      </Text>
      {availableDates.length > 0 ? (
          <DateSelector
            dates={availableDates}
            selectedIndex={selectedDateIndex}
            onSelect={setSelectedDateIndex}
          />
        ) : (
          <Text className="text-center text-gray-400 mt-4 mb-6">
            No available dates found.
          </Text>
        )}
        

        <AppointmentCard
          name={name as string}
          specialty={specialty as string}
          hospital={hospital as string}
          contact={contact as string}
          image={matchedDoctor?.image}
          onConfirm={handleAppointment}
        />



        {doctorData.map((doc, index) => (
          <DoctorCard key={index} index={index} doctor={doc} />
        ))}
      </View>
    </ScrollView>
  );
}
