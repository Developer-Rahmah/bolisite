
import React, { Component } from 'react';
import {ImageBackground,Dimensions,Image,Alert,Keyboard,StatusBar,ActivityIndicator,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text, Icon, Content,View,Drawer,Label,Input,Right,Left} from 'native-base';
import {uploadButton,continueText,uploadLicenseText} from '../assests/styles/drivingLicenseStyles';
import {transparentBackground,centerStyle} from '../theme';
import {Actions} from "react-native-router-flux";
import {  ImagePicker, Camera, Permissions } from 'expo';
import Header from './header';
import SideBar from "./sideBar";
import { Constants } from 'expo';
const deviceId = Constants.deviceId;
import {Spinner} from "./common/Spinner";

var loading_button=false;
// import {RNCamera} from 'react-native-camera';
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
const dimensions=Dimensions.get('window');
var showBillImage2=false
var showBillImage3=false
var showBillImage4=false
var showBillImage4=false
var showBillImage5=false
class ShippingInsuranceInformation extends Component{
  constructor(props){
    super(props);
    this.state ={
      showCameraView:false ,
      counter:1,
       type: Camera.Constants.Type.back,
       billImage: null,
     billImage2:"",
     billImage3:"",
     billImage4:"",
     billImage5:"",
            cameraPermission: null,
            cameraRollPermission: null,
            loading_d:false
    }
  }
  async componentWillMount() {
    
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
gotTo=()=>{
  
  // loading_button=true

  this.setState({loading_d:true})
  let apiUrl = 'https://bolisati.com/app/addcargoorder';

  var formData = new FormData();
formData.append("user_id",this.props.user_id)
   formData.append("image", {
     name: 'uiyutesttest1:31.jpg',
     type: 'image/jpeg',
     uri:
       this.state.billImage.replace("file://", "")
   });
   if(this.state.billImage2!=""){
   formData.append("image1", {
     name: 'uiyutesttest2:32.jpg',
     type: 'image/jpeg',
     uri:this.state.billImage2.replace("file://", "")
   });
  }
  if(this.state.billImage3!=""){
   formData.append("image2", {
    name: 'uiyutesttest3:33.jpg',
    type: 'image/jpeg',
    uri:this.state.billImage3.replace("file://", "")
  });
}
if(this.state.billImage4!=""){
  formData.append("image3", {
    name: 'uiyutesttest4:34.jpg',
    type: 'image/jpeg',
    uri:this.state.billImage4.replace("file://", "")
  });
}
if(this.state.billImage5!=""){
  formData.append("image4", {
    name: 'uiyutesttest5:35.jpg',
    type: 'image/jpeg',
    uri:this.state.billImage5.replace("file://", "")
  });
}
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
             var r=JSON.parse(res._bodyInit)
             if(Actions.currentScene=="shippinginsuranceinformation"){

             Actions.DoneScreen2({user_id:this.props.user_id,order_id:r.order_id,name:"shipping"})
             }
             this.setState({counter:1})
            showBillImage2=false
            showBillImage3=false
            showBillImage4=false
            showBillImage5=false
             this.setState({loading_d:false})
            })

            
            var formData2= new FormData();
      
        
}
addBill=()=>{
 
  this.setState({counter:this.state.counter+1})
  if(this.state.counter==1){
    showBillImage2=true
  }
  else if(this.state.counter==2){
    showBillImage3=true
  }
  else if(this.state.counter==3){
    showBillImage4=true
  }
  else if(this.state.counter==4){
    showBillImage5=true
  }
 
}
RemoveBill=()=>{
  this.setState({counter:this.state.counter-1})
  if(this.state.counter==2){
    showBillImage2=false
  }
  else if(this.state.counter==3){
    showBillImage3=false
  }
  else if(this.state.counter==4){
    showBillImage4=false
  }
  else if(this.state.counter==5){
    showBillImage5=false
  }
 
}
closeDrawer = () => {
  this.drawer._root.close();

};



openDrawer = () => {
  
  this.drawer._root.open();
  setTimeout(() => Keyboard.dismiss());
};
    render(){
      let { billImage,billImage2,billImage3,billImage4,billImage5} = this.state;
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
   

               <CardItem style={[transparentBackground,{marginTop:10}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                   
      
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureBill() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageBill},

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {billImage != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('shippinginsurance.upload_bill',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
               {showBillImage2?
               <CardItem style={[transparentBackground,{marginTop:10}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                   
      
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureBill2() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageBill2},

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {billImage2 != "" ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('shippinginsurance.upload_bill',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
               :null}
               {showBillImage3?
               <CardItem style={[transparentBackground,{marginTop:10}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                   
      
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureBill3() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageBill3},

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {billImage3 != "" ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('shippinginsurance.upload_bill',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
               :null}
               {showBillImage4?
               <CardItem style={[transparentBackground,{marginTop:10}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                   
      
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureBill4() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageBill4},

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {billImage4 != "" ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('shippinginsurance.upload_bill',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
               :null}
               {showBillImage5?
               <CardItem style={[transparentBackground,{marginTop:10}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                   
      
                 onPress={() => {
                    Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                            { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },

                            { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureBill5() } },
                            { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageBill5},

                        ],
                        { cancelable: false }
                    )
                }}




                   >
                   {billImage5 != "" ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('shippinginsurance.upload_bill',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
               </CardItem>
               :null}
              
               <CardItem style={[transparentBackground,{marginTop:10,  justifyContent: "space-between"}]}>
               {this.state.counter<5?
                 <Right style={{marginRight:this.state.counter==1&&!showBillImage2?110:null}}>
                   <Button style={uploadButton} onPress={this.addBill} >
                   <Text style={uploadLicenseText}>+</Text>
                  </Button>      
                 </Right>
                 :null}

                 {this.state.counter>=1&&showBillImage2?
                 <Left style={{marginLeft:this.state.counter==5?125:null}}>
                    <Button style={[uploadButton,{marginLeft:20}]} onPress={this.RemoveBill} >
                   <Text style={uploadLicenseText}>-</Text>
                  </Button>  
                 </Left>
                 :null}
               </CardItem>

 
               {billImage!=null?
               lang=="en"?
               <CardItem style={transparentBackground}>
               <Body style={[centerStyle,{alignItems:'center',justifyContent:'center'}]}>
         
                   
                     {this.showSubmitButton()}
                   </Body>
             
               </CardItem>
           :
           <CardItem style={transparentBackground}>
           <Body style={[centerStyle,{alignItems:'center',justifyContent:'center'}]}>

               
                 {this.showSubmitButton2()}
               </Body>
         
           </CardItem>
               :null}
      
               </Content>
               </Drawer>
           </ImageBackground>
        )
    }


  
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

  _pickImageBill = async () => {
      this._checkCameraRollPermissions();
      this._reqCameraRollPermissions();
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.setState({ billImage: result.uri });
          // CameraRoll.saveToCameraRoll(result.uri)
      }
  };

  _takePictureBill= async () => {
      this._checkCameraPermissions();
      this._reqCameraPermissions();

      let result = await ImagePicker.launchCameraAsync();
      // let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.setState({ billImage: result.uri });
      }
  };
  _pickImageBill2 = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ billImage2: result.uri });
        // CameraRoll.saveToCameraRoll(result.uri)
    }
};

_takePictureBill2= async () => {
    this._checkCameraPermissions();
    this._reqCameraPermissions();

    let result = await ImagePicker.launchCameraAsync();
    // let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ billImage2: result.uri });
    }
};
_pickImageBill3 = async () => {
  this._checkCameraRollPermissions();
  this._reqCameraRollPermissions();
  let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage3: result.uri });
      // CameraRoll.saveToCameraRoll(result.uri)
  }
};

_takePictureBill3= async () => {
  this._checkCameraPermissions();
  this._reqCameraPermissions();

  let result = await ImagePicker.launchCameraAsync();
  // let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage3: result.uri });
  }
};

_pickImageBill4 = async () => {
  this._checkCameraRollPermissions();
  this._reqCameraRollPermissions();
  let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage4: result.uri });
      // CameraRoll.saveToCameraRoll(result.uri)
  }
};

_takePictureBill4= async () => {
  this._checkCameraPermissions();
  this._reqCameraPermissions();

  let result = await ImagePicker.launchCameraAsync();
  // let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage4: result.uri });
  }
};
 
_pickImageBill5 = async () => {
  this._checkCameraRollPermissions();
  this._reqCameraRollPermissions();
  let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage5: result.uri });
      // CameraRoll.saveToCameraRoll(result.uri)
  }
};

_takePictureBill5= async () => {
  this._checkCameraPermissions();
  this._reqCameraPermissions();

  let result = await ImagePicker.launchCameraAsync();
  // let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ billImage5: result.uri });
  }
};
 

}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default DrivingLicense;
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const { information} = state.drivingLicenseReducer;
  return { information,lang};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,shippingInsuranceAction)(ShippingInsuranceInformation);