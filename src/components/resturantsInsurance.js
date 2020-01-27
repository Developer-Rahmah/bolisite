import React, { Component } from 'react';
import {ImageBackground,Dimensions,Image,Alert,Keyboard,StatusBar,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text, Icon, Content,View,Drawer} from 'native-base';
import {uploadButton,continueText,uploadLicenseText} from '../assests/styles/drivingLicenseStyles';
import {transparentBackground,centerStyle} from '../theme';
import {Actions} from "react-native-router-flux";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import Header from './header';
import SideBar from "./sideBar";
import Constants from 'expo-constants'
import {Spinner} from "./common/Spinner";

const deviceId = Constants.deviceId;
// import {RNCamera} from 'react-native-camera';
import * as drivingLicenseAction from '../actions/drivingLicenseAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
const dimensions=Dimensions.get('window');
class ResturantsInsurance extends Component{
  constructor(props){
    super(props);
    this.state ={
      showCameraView:false ,
      loading_d:false,
       type: Camera.Constants.Type.back,
       CommercialRegisterImage: null,
       ProfessionLicenceImage:null,
            cameraPermission: null,
            cameraRollPermission: null,
    }
  }
  async componentWillMount() {
    
    this.setState({ loading: false });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
}


  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    this.setState({
        cameraPermission: cameraPermission.status,
        cameraRollPermission: cameraRollPermission.status,
    })

}
 gotTo=()=>{
  this.setState({loading_d:true})

  const {user_id}=this.props


  let apiUrl = 'https://bolisati.com/app/addrestaurants';

  var formData = new FormData();
formData.append("user_id",user_id)
   formData.append("commercial", {
     name: 'uiyutesttest9:31.jpg',
     type: 'image/jpeg',
     uri:
       this.state.CommercialRegisterImage.replace("file://", "")

   });
   formData.append("license", {
     name: 'uiyutesttest3:32.jpg',
     type: 'image/jpeg',
     uri:
       this.state.ProfessionLicenceImage.replace("file://", ""),
   });
 
  
   let options = {
     method: 'POST',
     body: formData,
     headers: {
       Accept: 'application/x-www-from-urlencoded',
       'Content-Type': 'multipart/form-data',
       "consumer-device-id":deviceId,
      "consumer-key":"6df56cf915318431043dd7a75d",
"consumer-secret":"95032b42153184310488f5fb8f",
"consumer-nonce":"afczxcfasd"
     },
   };

   fetch(apiUrl, options).then(res=>{
             console.log('response test',res)
             var d=res._bodyInit.toString()
            //  var r=JSON.parse(d)
            //  console.log("rrrrrr",r)
            res.json().then(async data => {
            console.log("7777",data)
            if(Actions.currentScene=="resturantsinsurance"){

              Actions.DoneScreen2({user_id:this.props.user_id,order_id:data.order_id,name:"resturant"})
              }
              this.setState({loading_d:false})
            });
       


   }
   
   )
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "https://bolisati.com/app/addrestaurants");
  oReq.send(options);
 
 


}
closeDrawer = () => {
  this.drawer._root.close();

};



openDrawer = () => {
  
  this.drawer._root.open();
  setTimeout(() => Keyboard.dismiss());
};
showSubmitButton() {
  const {lang}=this.props;
    if (this.state.loading_d) {
     return(
      <Button block style={{backgroundColor: '#003580'}} >
       <Spinner size="large" />
     </Button>
     )
    }
  
    return (
      
      <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
      onPress={this.gotTo}>
                             <Text style={continueText}>{strings('drivinglicense.continue',lang)}</Text>

                        <Icon name='md-arrow-round-forward' style={{color:'#fff',marginTop:-2,marginEnd:7,resizeMode: 'contain'}}/>

       </TouchableOpacity>
   
    
    );
  }
  showSubmitButton2() {
    const {lang}=this.props;
      if (this.state.loading_d) {
       return(
        <Button block style={{backgroundColor: '#003580'}} >
         <Spinner size="large" />
       </Button>
       )
      }
    
      return (
        
        <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
        onPress={this.gotTo}>
                          <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>

           <Text style={continueText}>{strings('drivinglicense.continue',lang)}</Text>
         </TouchableOpacity>
     
      
      );
    }
    render(){
      let { CommercialRegisterImage, ProfessionLicenceImage} = this.state;

      const {lang}=this.props;
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
            <Content style={transparentBackground}>
  
              
               <CardItem style={[transparentBackground,{paddingTop:20}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                
     onPress={() => {
      Alert.alert(
        `${strings('add_photo.add_phot_title',lang)}`,
          "",
          [
              { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

              { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureProfessionlicence() } },
              { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageProfessionlicence  },

          ],
          { cancelable: false }
      )
  }}                   >
  {ProfessionLicenceImage != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('resturants_insurance.upload_Professionـlicence',lang)}</Text>
                     ) }
                   </Button>
                   
                 </Body>
               </CardItem>

               <CardItem style={transparentBackground}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureCommercialRegister() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageCommercialRegister },

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {CommercialRegisterImage != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('resturants_insurance.upload_CommercialـRegister',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
  
               {ProfessionLicenceImage!=null &&CommercialRegisterImage!=null?
               lang=="en"?
               <CardItem style={transparentBackground}>
               <Body style={[centerStyle,{alignItems:'center',justifyContent:'center'}]}>
          
                         {this.showSubmitButton()}

                   </Body>
               </CardItem>
               :
                         lang=="ar"?
                         <CardItem style={transparentBackground}>
                             <Body style={centerStyle}>
               
                         {this.showSubmitButton2()}
                             </Body>
                             </CardItem>
                             :null
               :null}
               </Content>
               </Drawer>
           </ImageBackground>
        )
    }

  _cam = async () => {
      let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });


      if (!result.cancelled) {
          this.setState({ image: result.uri });
      }
  };

  
  _checkCameraPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      //const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      this.setState({ status });
  }
  _reqCameraPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ cameraPermission: status });
  };


  _checkCameraRollPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      this.setState({ status });
  }
  _reqCameraRollPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ cameraRollPermission: status });
  };

  _pickImageProfessionlicence = async () => {
      this._checkCameraRollPermissions();
      this._reqCameraRollPermissions();
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.setState({ ProfessionLicenceImage: result.uri });
      }
  };

  _takePictureProfessionlicence = async () => {
      this._checkCameraPermissions();
      this._reqCameraPermissions();

      let result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
          this.setState({ ProfessionLicenceImage: result.uri });
      }
  };

  _pickImageCommercialRegister = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ CommercialRegisterImage: result.uri });
    }
};

_takePictureCommercialRegister = async () => {
    this._checkCameraPermissions();
    this._reqCameraPermissions();

    let result = await ImagePicker.launchCameraAsync();
    // let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ CommercialRegisterImage: result.uri });
    }
};

}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const { information} = state.drivingLicenseReducer;
  return { information,lang};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,drivingLicenseAction)(ResturantsInsurance);