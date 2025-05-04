import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

interface DateItem {
  day: string;
  date: number;
}

interface Props {
  dates: DateItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function DateSelector({ dates, selectedIndex, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
      {dates.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(index)}
          className={`w-16 h-20 rounded-2xl items-center justify-center mx-1 ${
            selectedIndex === index ? 'bg-[#4C8C6B]' : 'bg-white border border-gray-200'
          }`}
        >
          <Text className={`text-xs ${selectedIndex === index ? 'text-white' : 'text-gray-600'}`}>
            {item.day}
          </Text>
          <Text className={`text-lg font-bold ${selectedIndex === index ? 'text-white' : 'text-[#034C24]'}`}>
            {item.date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}


