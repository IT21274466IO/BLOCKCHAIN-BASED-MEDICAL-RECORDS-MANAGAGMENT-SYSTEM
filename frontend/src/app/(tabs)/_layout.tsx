import { Tabs } from 'expo-router';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#F9F9F9',
          height: 70,
          width: 'auto',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderColor: '#034C24',
          borderWidth: 1,
          paddingTop: 4,
          position: 'absolute',
          
        },
        tabBarActiveTintColor: '#A5971E',
        tabBarInactiveTintColor: '#034C24',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
