import React, {Component} from "react";
import {createStore, applyMiddleware} from "redux";
import {View, Text, StatusBar, Keyboard,I18nManager,BackHandler,Alert,AsyncStorage,Platform} from "react-native";
import {Drawer, Root} from "native-base";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import SideBar from "./components/sideBar";
import Header from "./components/header";
import Router from "./Router";
import I18n from "i18n-js";
import { AppLoading, Asset, Icon,SplashScreen, Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font';

import {Actions} from "react-native-router-flux";
import client from './constants';

// import store from './Store'
class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      loading: true,
      isReady: false
    };
  }

  // async componentDidMount() {
  //   SplashScreen.preventAutoHide();
  //        AsyncStorage.getItem('user', (err, result) => {
  //       result=JSON.parse(result)
  //       if(result!=null){
  //         console.log("resukt")
  //       client.post(`customerinfo?id=${result[0].customers_id}`).then((response) => {
  //        console.log("response of customer  in router",response)
  //        if (response.data.data.length>0) {
  //         isUserLogin=true
  //        }
  //        else{
  //          isUserLogin=false
  //        }
       
  //          })
    
  //        }
  //    });
   
  // }
  
  async componentWillMount() {
    // this.registerForPushNotificationsAsync()

    await Font.loadAsync({
      arial: require("../assets/fonts/arial.ttf"),
      arialbd: require("../assets/fonts/arialbd.ttf"),
      arialbi: require("../assets/fonts/arialbi.ttf"),
      ariali: require("../assets/fonts/ariali.ttf"),
      ariblk: require("../assets/fonts/ariblk.ttf"),
      TajawalBlack0: require("../assets/fonts/TajawalBlack0.ttf"),
      TajawalBold0: require("../assets/fonts/TajawalBold0.ttf"),
      TajawalExtraBold0: require("../assets/fonts/TajawalExtraBold0.ttf"),
      TajawalExtraLight0: require("../assets/fonts/TajawalExtraLight0.ttf"),
      TajawalLight0: require("../assets/fonts/TajawalLight0.ttf"),
      TajawalMedium0: require("../assets/fonts/TajawalMedium0.ttf"),
      TajawalRegular0: require("../assets/fonts/TajawalRegular0.ttf")
    });
    this.setState({loading: false});

  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  async  registerForPushNotificationsAsync() {
    console.log("hereeeeeeeeeeeeeeeeeeee")
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
   
    // only ask if permissions have not already been determined, because
    // iOS won’t necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
   
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
   
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("token",token)
    let platform=Platform.OS
    console.log("Platform",Platform)

    await AsyncStorage.setItem("deviceToken", token+'');
    await AsyncStorage.setItem("devicePlatform", platform+'');
   
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    this.setState({token:token})
    console.log('tokeeen:'+token)
   
   
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
   
   
   }
 
  render() {
    const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
    console.log("actions.Actions.prevScene",Actions.prevScene)

console.log("actions.currentScene",Actions.currentScene)

if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    console.log("store", store);

    return (
      <Provider store={store}>
        <Root>
          <Router />
        </Root>
      </Provider>
    );
  }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
export var scanned_driving_license = {
  scanned: false,
  full_name: "",
  car_type: "",
  fuel_type: "",
  car_model: "",
  manufacturing_year: "",
  end_date: "",
  license_no: "",
  symbol: "",
  driving_license_img:"",
  driving_license_img_back:"",
  category:""
};
export var scanned_id_image = {
  scanned: false,
  full_name: "",
  id_number: "",
  skip_id_img:"",
  date_of_birth:""
};
export var scanned_passport_image = {
  scanned: false,
  full_name: "",
  passport_number: "",
  skip_passport_img:""
};
export default App;
