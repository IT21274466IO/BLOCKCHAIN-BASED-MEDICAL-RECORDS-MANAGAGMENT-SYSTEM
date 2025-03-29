import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CropHelpScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Home',
      headerStyle: { backgroundColor: '#09c78b' },
      headerTintColor: '#ffffff',
      headerLeft: () => {
        return null;
      }
    }
  };

  constructor(props) {
    super(props);
    
    this.state = {
      features: [
        { title: 'Take a Picture', icon: 'camera-alt', screen: 'Camera' },
      ],
    };
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => this.props.navigation.navigate(item.screen)}>
      <MaterialIcons name={item.icon} size={60} color="#292c39" />
      <Text style={styles.gridText}>{item.title}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/logo.png')} style={styles.logo} />
        <FlatList
          data={this.state.features}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  gridContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    margin: 20,
    padding:20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    elevation: 3,
  },
  gridText: {
    marginTop: 10,
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: "#000000",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
});