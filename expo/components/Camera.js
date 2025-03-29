import React from 'react';
import { ActivityIndicator, Picker, Alert, View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

export default class Camera extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            localUri: '',
            resultUri: '',
            resultTxt: '',
            message: '',
            showAlert: false,
            result: false,
            title: '',
            loader: false,
        };

    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Medicine Image',
        headerStyle: {
            backgroundColor: '#09c78b',
            elevation: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
        },

        headerLeft: () => (
            <View style={{ marginLeft: 10, marginTop: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <MaterialCommunityIcons name="menu" color='#ffffff' size={30} />
                </TouchableOpacity>
            </View>
        ),
    });

    uploadImage = async (uri_data) => {
        console.log(uri_data)
        const data = new FormData();
        await data.append("file", {
            uri: uri_data,
            name: uuidv4()+".jpg",
            type: "image/jpg"
        });
        try {
            await axios.post("http://" + LocalIP + ":5555/image_upload", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (res) => {
                console.log(res.data)
                if (res.data.con * 1 < 60) {
                    this.setState({ loader: false, result: true, resultTxt: "Not Detected!" })
                } else {
                    this.setState({ loader: false})
                    if(res.data.result=="Brain Stroke Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Brain Stroke Mri", resultDescription:"A brain stroke occurs when a blood clot blocks or bursts a blood vessel in the brain. It can lead to brain damage and serious neurological issues. An MRI scan helps in diagnosing the extent of brain injury and the impact on brain function."})
                    }
                    if(res.data.result=="Brain Tumors Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Brain Tumors Mri", resultDescription:"Brain tumors are abnormal growths of cells in the brain. They can cause symptoms like headaches, nausea, and neurological impairments. MRI imaging helps in identifying the size, type, and location of the tumor."})
                    }
                    if(res.data.result=="Brain Tumors Xray"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Brain Tumors Xray", resultDescription:"An X-ray of the brain can sometimes detect unusual masses or signs of brain tumors. It is less detailed compared to an MRI but can help in initial assessment."})
                    }
                    if(res.data.result=="Breast Cancer Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Breast Cancer Mri", resultDescription:"Breast cancer MRI scans are used to detect abnormal growths in the breast tissue, often used in conjunction with mammograms to better detect early-stage cancers."})
                    }
                    if(res.data.result=="Chest And Respiratory Lung Cancer Ct"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Lung Cancer Ct", resultDescription:"A CT scan of the chest helps in diagnosing lung cancer by providing detailed images of the lungs and nearby structures. It helps in staging the cancer and planning the appropriate treatment."})
                    }
                    if(res.data.result=="Chest And Respiratory Lung Cancer Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Lung Cancer Mri", resultDescription:"MRI scans can offer detailed views of the lungs and surrounding organs, aiding in the detection and evaluation of lung cancer and its spread."})
                    }
                    if(res.data.result=="Chest And Respiratory Pneumonia Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Pneumonia Mri", resultDescription:"Pneumonia is a serious lung infection that can cause inflammation and fluid accumulation. MRI scans help in assessing the extent of lung damage and fluid retention in the lungs."})
                    }
                    if(res.data.result=="Chest And Respiratory Pneumonia X-Ray"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Pneumonia X-Ray", resultDescription:"A chest X-ray is commonly used to diagnose pneumonia, detecting lung inflammation and the presence of fluid or infection in the lungs."})
                    }
                    if(res.data.result=="Chest And Respiratory Pulmonary Disorders X-Ray"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Pulmonary Disorders X-Ray", resultDescription:"X-rays are used to identify various pulmonary disorders such as chronic obstructive pulmonary disease (COPD), emphysema, and lung fibrosis."})
                    }
                    if(res.data.result=="Chest And Respiratory Tuberculosis (Tb)"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Tuberculosis (Tb)", resultDescription:"Tuberculosis (TB) is a bacterial infection that primarily affects the lungs. X-rays or CT scans are commonly used to detect the characteristic lesions caused by the infection."})
                    }
                    if(res.data.result=="Chest And Respiratory Tuberculosis (Tb) Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Chest And Respiratory Tuberculosis (Tb) Mri", resultDescription:"MRI scans can provide more detailed information about lung and chest tissues in TB patients, helping in assessing the spread of the infection and its impact."})
                    }
                    if(res.data.result=="Hip Implant Ct"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Hip Implant Ct", resultDescription:"A CT scan is useful in assessing the placement and condition of a hip implant, identifying complications like misalignment, wear, or infection."})
                    }
                    if(res.data.result=="Intracranial Hemorrhage Ct"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Intracranial Hemorrhage Ct", resultDescription:"Intracranial hemorrhage is bleeding inside the brain, often caused by head trauma. A CT scan helps in diagnosing the location, extent, and severity of the hemorrhage."})
                    }
                    if(res.data.result=="Spinal Code Disorder Ct"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Spinal Code Disorder Ct", resultDescription:"A CT scan can detect abnormalities in the spinal cord, including herniated discs, fractures, and other degenerative conditions affecting spinal function."})
                    }
                    if(res.data.result=="Spinal Code Disorder Mri"){
                        this.props.navigation.navigate("PhotoResult",{ result: res.data.result , photo_path: res.data.photo_path ,con: res.data.con ,resultTxt:"Spinal Code Disorder Mri", resultDescription:"MRI imaging provides detailed views of the spinal cord, helping diagnose spinal cord disorders like multiple sclerosis, infections, or spinal tumors."})
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        } catch (err) {
            console.log(err);
        }
    }

    onInsert = async (e) => {
        if (this.state.localUri != "") {
            if (this.state.loader != true) {

                this.setState({ loader: true })
    
                await this.uploadImage(this.state.localUri)
    
            } else {
                this.setState({ title: "Required!", message: "Please wait!" })
                this.showAlert()
            }

        } else {
            this.setState({ title: "Required!", message: "Please choose image!" })
            this.showAlert()
        }
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
            message: "",
            title: "",
        });
    };

    openImagePickerAsync = async (x) => {

        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            this.setState({ title: "Permission Denied!", message: "Permission to access camera roll is required!" })
            this.showAlert()
            return;
        }

        let pickerResult

        if (x === 1) {

            pickerResult = await ImagePicker.launchImageLibraryAsync();

        } else {

            pickerResult = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images
            });

        }

        if (pickerResult.cancelled === true) {
            return;
        }

        console.log(pickerResult.assets[0].uri)
        await this.setState({ localUri: pickerResult.assets[0].uri });

    }

    open_image_option = async () => {
        Alert.alert('Select Option', 'Camera or Gallery', [
            {
                text: 'Camera',
                onPress: () => { this.openImagePickerAsync(0) }
            },
            {
                text: 'Gallery',
                onPress: () => { this.openImagePickerAsync(1) }
            },
        ]);
    }

    render() {
        const { showAlert } = this.state;

        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.center}>
                        <Image
                            source={require("./../assets/logo.png")}
                            style={{ width: 150, height: 150, marginBottom: 20, marginTop: 10 }}
                        />
                    </View>

                    <View>
                        <Text style={styles.labelText}>Upload Image:</Text>
                        <View style={styles.center}>
                            <TouchableOpacity onPress={this.open_image_option} style={{
                                width: 80 + '%',
                                height: Dimensions.get('window').width * 0.8,
                                borderWidth: 1,
                                marginBottom: 10,
                                marginTop: 10,
                                borderColor: '#c4c4c4',
                            }}>
                                <View>
                                    <Image source={{ uri: this.state.localUri }}
                                        style={{
                                            width: 100 + '%',
                                            height: 100 + '%'
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonContainer, styles.registerButton, { width: 50 + '%' }]} onPress={this.open_image_option}>
                                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Choose Image</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.center}>
                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onInsert}>
                                {!this.state.loader ? (
                                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Upload</Text>
                                ) : null}
                                {this.state.loader ? (
                                    <ActivityIndicator size="large" color={"#ffffff"} />
                                ) : null}
                            </TouchableOpacity>
                        </View>
                        {this.state.result == true ? ([
                            <View style={styles.center}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.resultTxt}</Text>
                                </View>
                            </View>]
                        ) : null}
                    </View>

                    <AwesomeAlert
                        show={showAlert}
                        title={this.state.title}
                        message={this.state.message}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        cancelText="Close"
                        cancelButtonColor="#AEDEF4"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                    />

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 10 + '%'
    },
    firstLabelText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 10 + '%',
        marginTop: 2 + '%',
    },
    input: {
        borderBottomWidth: 1,
        width: 80 + '%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#c4c4c4',
        color: '#000000'
    },
    TextInputStyleClass: {
        borderBottomWidth: 1,
        width: 80 + '%',
        height: 100,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
        borderBottomColor: '#c4c4c4',
        color: '#000000'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 80 + '%',
        height: 60,
        borderRadius: 60
    },
    loginButton: {
      backgroundColor: '#665eff',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    registerButton: {
        backgroundColor: "#000000",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    card: {
      width: 350,
      padding: 20,
      borderRadius: 20,
      backgroundColor: '#fff',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
});