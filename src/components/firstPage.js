import React,{Component} from 'react';
import {ImageBackground,Dimensions,Text,AsyncStorage,TouchableOpacity,Image,View,Keyboard,StatusBar,BackHandler,Platform,Alert} from 'react-native';
import {Body,CardItem,Button,Root,Drawer} from 'native-base';
import {Actions} from "react-native-router-flux";
import{centerStyle,buttonText} from '../theme'
import {cardItem,signInButton,signInText,orText,signUpButton} from '../assests/styles/firstPageStyles';
import {strings} from '../../Locales/i18n';
import * as sideBarAction from '../actions/sideBarAction';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { Font, AppLoading,SplashScreen,Facebook,Permissions, Notifications,Constants} from 'expo';
import Header from './AuthHeader'
import SideBar from "./sideBar";
import * as Expo from 'expo';
const dimensions=Dimensions.get('window');
import client from '../constants';

class FirstPage extends Component{
  constructor(props) {
    super(props);
  this.state={language:"",
  deviceToken:"",
  devicePlatform:"",
loading:true,
isReady: false,
}}
async componentWillMount() {
  AsyncStorage.getItem("locale").then((value) => {
 
    this.setState({language:value})
    });

  await Font.loadAsync({
    arial: require("../../assets/fonts/arial.ttf"),
    arialbd:require("../../assets/fonts/arialbd.ttf"),
    arialbi:require("../../assets/fonts/arialbi.ttf"),
    ariali:require("../../assets/fonts/ariali.ttf"),
    ariblk:require("../../assets/fonts/ariblk.ttf"),
    TajawalBlack0:require("../../assets/fonts/TajawalBlack0.ttf"),
    TajawalBold0:require("../../assets/fonts/TajawalBold0.ttf"),
    TajawalExtraBold0:require("../../assets/fonts/TajawalExtraBold0.ttf"),
    TajawalExtraLight0:require("../../assets/fonts/TajawalExtraLight0.ttf"),
    TajawalLight0:require("../../assets/fonts/TajawalLight0.ttf"),
    TajawalMedium0:require("../../assets/fonts/TajawalMedium0.ttf"),
    TajawalRegular0:require("../../assets/fonts/TajawalRegular0.ttf"),



  });
  this.setState({ loading: false });
  console.log("in componenttttt")
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  if(Platform.OS === 'ios') {
          console.log(" ios") 
          await AsyncStorage.setItem("devicePlatform",'ios');
       } else {
             console.log("android") 
             await AsyncStorage.setItem("devicePlatform",'android');
      } 
        this.registerForPushNotificationsAsync();
  var that = this;
  // BackHandler.addEventListener("hardwareBackPress", function() {
  //   that.props.navigation.navigate("SignUp");
  //   return true;
  // });
  const token = await AsyncStorage.getItem("deviceToken");
  console.log("token in login1",token)
  const platform2 = await AsyncStorage.getItem("devicePlatform");
  console.log("platform in login1",platform2)

  if(token !=null){
      this.setState({deviceToken:token,devicePlatform:platform2})
  }
}
  async  componentDidMount() {
    SplashScreen.preventAutoHide();

    if (Platform.OS == "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

   

}
componentWillUnmount() {
  BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
}
  // async componentWillMount() {
    
  // }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  checkPrevScene = () => {
    return (

      Actions.prevScene === "home" ||
      Actions.prevScene === "firstpage"||
      Actions.prevScene===null
    );
  };
  handleBack = () =>{
    if (this.drawer != null) {
      this.drawer._root.close();
    }

 

    if ((Actions.currentScene === "firstpage" && this.checkPrevScene())||(Actions.currentScene === "home" && Actions.prevScene === "home")) {
      Alert.alert(
        "Warning",
        "Are you sure you want to exit from bolisati app?",
        [
          {text: "NO", onPress: () => ""},
          {text: "YES", onPress: () => BackHandler.exitApp()}
        ],
        {cancelable: false}
      );
      return true;
    }
  };
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "24076008028-j1f1isda22oril8ubpprjjlja07die5q.apps.googleusercontent.com",
        iosClientId: "24076008028-d6gbtkmqcq3jjk9dfttfclf18jc3m7i0.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
  console.log("result",result)
        Alert.alert('Logged in!', `Hi ${result.user.name}!`);

     
        
       client.post(`/reggoogle?full_name=${result.user.name}&google_id=${result.user.id}&google_email=${result.user.email}`).then((res) => {

        if(res.status==200){
          AsyncStorage.setItem("user",JSON.stringify(res.data.data));
          Actions.home();
          // AsyncStorage.setItem("user",JSON.stringify(res.data.data));
          // Actions.home();
        
        }
        else if(res.status==='400'){
            showMessage({
                message: res.data.message,
                type: "danger",
              });
        }
        
        else
        {
        showMessage({
            message: res.data.message,
            type: "danger",
          })}  
           })

      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
 
  async  logInFB() {
    try {
      const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('2355284404708712', {
              permissions: ['public_profile'],
            });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}`);

        const responseFB=JSON.parse(response._bodyInit)
        client.post(`/regfacebook?full_name=${ responseFB.name }&fb_id=${responseFB.id}&fb_email=${responseFB.email}`).then((res) => {
if(res.status==200){

  AsyncStorage.setItem("user",JSON.stringify(res.data.data));
  Actions.home();

}
else if(res.status==='400'){
    showMessage({
        message: res.data.message,
        type: "danger",
      });
}

else
{
showMessage({
    message: res.data.message,
    type: "danger",
  })}  
   })
   


      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  async  registerForPushNotificationsAsync() {
    console.log("123456789876543234567")
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
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
    // let platform=Constants.platform
    await AsyncStorage.setItem("deviceToken", token+'');
   
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    // this.setState({token:token})
    console.log('tokeeennnnnnnnnn:'+token)
   
    
  }
    render(){

   

      if (this.state.loading) {
        return (
          <Root>
            <AppLoading />
          </Root>
        );
      }

      const {lang}=this.props
  
      return(
<ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height: "100%"}}>
<Drawer
            type="overlay"
            side="right"
            ref={ref => {
              this.drawer = ref;
            }}
            content={
              <SideBar
                navigator={this._navigator}
                closeDrawer={this.closeDrawer}
              />
            }
            onClose={this.closeDrawer}
            onOpen={this.openDrawer}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
          >

           <Header
                       openDrawer={this.openDrawer}
                       closeDrawer={this.closeDrawer}
           /> 
 
            <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
<CardItem style={cardItem}>
         <Body style={centerStyle}>
          <Button style={signInButton}block onPress={() => Actions.login({deviceToken:this.state.deviceToken,devicePlatform:this.state.devicePlatform})}>
            <Text style={signInText}>{strings('login.login_button',lang)}</Text>
          </Button>
          <Text style={[orText,{lineHeight:20}]}>{strings('login.or',lang)}</Text>
          <Button style={signUpButton}block onPress={() => Actions.signup()}>
            <Text style={buttonText}>{strings('login.signup_button',lang)}</Text>
          </Button>
          <View style={{height:25}}/>
       







<View style={{ width: Dimensions.get('window').width, alignItems: 'center' ,marginTop:15}}>
                        <Text style={[orText,{marginBottom:10,lineHeight:20}]}>{strings('login.orSignUpWith',lang)}</Text></View>

                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 5, backgroundColor: 'rgba(59, 89, 152, 1)', width: Dimensions.get('window').width / 2.4, height: 48, alignItems: 'center' ,justifyContent:'center'}}onPress={() => this.logInFB()}>

                            <SocialIcon type='facebook' style={{ width: 36, height: 36, elevation: 0, backgroundColor: null, marginLeft:Platform.OS == "android"?30:null }} />
                            <Text style={{
                                width: Dimensions.get('window').width / 4, alignItems: 'center', fontSize: 16,
                                fontWeight: "normal",marginStart:-3,marginTop:3,
                                fontStyle: "normal",
                                lineHeight: 19, color: 'white', fontFamily: 'TajawalMedium0',
                                marginRight:Platform.OS == "android"?30:null
                            }}>{strings('login.signInWithFacebook',lang)}</Text>
                              
                        </TouchableOpacity>

                        <View style={{ width: 14 }} />
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, borderRadius: 5, backgroundColor: 'white', width: Dimensions.get('window').width / 2.4, height: 48, alignItems: 'center' ,justifyContent:'center'}}onPress={() => this.signIn()}>

                            <Image
                                source={require('../../assets/signupwithgoogle.png')}
                                style={{
                                    width: 30,
                                    height: 30, marginEnd: 5, marginStart: 25,
                                    resizeMode: 'contain'
                                }} />
                            <Text style={{
                               width: Dimensions.get('window').width / 4,
                                 alignItems: 'center', fontSize: 16,marginStart:5,
                                fontWeight: "normal", fontFamily: 'TajawalMedium0',marginTop:3,
                                marginRight:Platform.OS == "android"?30:null,
                                
                                lineHeight: 19, color: 'black'
                            }}>{strings('login.signInWithGoogle',lang)}</Text>
                        </TouchableOpacity>
                    </View>
         </Body>
        </CardItem>
        </Drawer>
</ImageBackground>
      )

      
    }
    _cacheSplashResourcesAsync = async () => {
      const gif = require('../assests/images/Artboard–3.png');
      return Asset.fromModule(gif).downloadAsync()
  }

  _cacheResourcesAsync = async () => {
      SplashScreen.hide();
      const images = [
          require('../assests/images/Artboard–3.png'),
          require('../assests/images/Artboard–3.png'),
      ];

      const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
      });

      await Promise.all(cacheImages);
      this.setState({ isReady: true });
  }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default FirstPage;
const mapStateToProps = state =>
{
  const { lang } = state.sideBarReducer;
  return {lang};
}
export default connect(mapStateToProps,{sideBarAction})(FirstPage);