// import DeviceInfo from "react-native-device-info";
import axios from "axios";
import Expo from 'expo';
import Constants from 'expo-constants';
// import { Permissions, Notifications } from 'expo';
// const token = await Notifications.getExpoPushTokenAsync();
// in bare apps:
// import Constants from 'expo-constants';
// const deviceId = DeviceInfo.getDeviceId();
const deviceId = Constants.deviceId;

const client = axios.create({
  baseURL: "https://bolisati.com/app"
});
client.defaults.headers.common["consumer-key"] = "6df56cf915318431043dd7a75d";
client.defaults.headers.common["consumer-secret"] ="95032b42153184310488f5fb8f";
client.defaults.headers.common["consumer-nonce"] = "afczxcfasd";
client.defaults.headers.common["consumer-device-id"] = deviceId;

export default client;
