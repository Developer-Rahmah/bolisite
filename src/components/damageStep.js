import React, { Component } from 'react';
import {ImageBackground,Dimensions,Image,Keyboard,StatusBar,View,TouchableOpacity,Platform} from 'react-native';
import {CardItem,Body,Button,Text,Right,Left, Icon, Content,Drawer} from 'native-base';
import * as damageStepAction from '../actions/damageStepAction';
import { connect } from 'react-redux';
import {transparentBackground,centerStyle,sevicesCardItemStyle,servicesText,buttonText,whiteBackground} from '../theme';
import {strings} from '../../Locales/i18n';
import {  ImagePicker, Camera, Permissions,Location } from 'expo';
import Header from './header';
import SideBar from "./sideBar";
import { Constants } from 'expo';
const deviceId = Constants.deviceId;
// const deviceId = DeviceInfo.getDeviceId();
const dimensions=Dimensions.get('window');
class DamageStep extends Component{
  constructor(props){
    super(props);
    this.state ={
   
      type: Camera.Constants.Type.back,
      leftCarPic: null,
      rightCarPic:null,
      frontCarPic: null,
      backCarPic: null,
leftDate:'',
rightDate:'',
frontDate:'',
backDate:'',
      cameraPermission: null,
      locationPermission:null,
      cameraRollPermission: null,
      location: null,
      errorMessage: null,
      rightlatitude:'',
rightlongitude:'',
leftlatitude:'',
leftlongitude:'',
frontlatitude:'',
frontlongitude:'',
backlatitude:'',
backlongitude:'',
locationLeft:'',
locationRight:'',
locationFront:'',
locationBack:''
   }
  }
  
  // componentWillMount() {
  //   if (Platform.OS === 'android' && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  _getLocationAsyncL = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationLeft:location });
  };
  _getLocationAsyncR= async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationRight:location });
  };
  _getLocationAsyncF= async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationFront:location });
  };
  _getLocationAsyncB= async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationBack:location });
  };
gotToPayment=(leftImage,rightImage,frontImage,backImage)=>{

  const {carInformation,insuranceCompaanyId,addons,total,user_id}=this.props
 var addons1=[]
 for(var i=0;i<addons.length;i++){
   addons1.push(addons[i].id)
 }
 
  var images=[]
  images.push({leftImage:leftImage});
  images.push({rightImage:rightImage});
  images.push({frontImage:frontImage});
  images.push({backImage:backImage});
  var image_test=''
  
  let apiUrl = 'https://bolisati.com/app/addorderimages';

  var formData = new FormData();
   // formData.append('rightImage', {
   //   right_uri,
   //   name: `rightImage.${fileType2}`,
   //   type: `image/${fileType2}`,
   // });
   // formData2.append('leftImage', {
   //   left_uri,
   //   name: `leftImage.${fileType}`,
   //   type: `image/${fileType}`,
   // });
   // this.setState({formData : formData2})
   // formData.append('frontImage', {
   //   front_uri,
   //   name: `frontImage.${fileType3}`,
   //   type: `image/${fileType3}`,
   // });
   // formData.append('backImage', {
   //   back_uri,
   //   name: `backImage.${fileType4}`,
   //   type: `image/${fileType4}`,
   // });

       formData.append('leftdate', this.state.leftDate)
       formData.append('rightdate', this.state.rightDate)
       formData.append('frontdate', this.state.frontDate)
       formData.append('backdate', this.state.backDate)
       formData.append('rightlatitude', this.state.rightlatitude)
       formData.append('rightlongitude', this.state.rightlongitude)
       formData.append('leftlatitude', this.state.leftlatitude)
       formData.append('leftlongitude', this.state.leftlongitude)
       formData.append('frontlatitude', this.state.frontlatitude)
       formData.append('frontlongitude', this.state.frontlongitude)
       formData.append('backlatitude', this.state.backlatitude)
       formData.append('backlongitude', this.state.backlongitude)


   formData.append("leftImage", {
     name: 'uiyutesttest5:30.jpg',
     type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
     uri:
       this.state.leftCarPic.replace("file://", "")
   });
   formData.append("rightImage", {
     name: 'uiyutesttest51:30.jpg',
     type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
     uri:
       this.state.rightCarPic.replace("file://", "")
   });
   formData.append("frontImage", {
     name: 'uiyutesttest52:30.jpg',
     type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
     uri:
       this.state.frontCarPic.replace("file://", "")
   });
   formData.append("backImage", {
     name: 'uiyutesttest53:30.jpg',
     type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
     uri:
       this.state.backCarPic.replace("file://", "")
   });
   formData.append("drivingLiceneseImage", {
    name: 'uiyutesttest54:30.jpg',
    type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
    uri:
      this.props.carInformation.drivingLiceneseImage.replace("file://", "")
  });
  formData.append("drivingLiceneseImageBack", {
    name: 'uiyutesttest55:30.jpg',
    type: Platform.OS=="ios"?"image/jpg":'image/jpeg',
    uri:
      this.props.carInformation.drivingLiceneseImageBack.replace("file://", "")
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
   })
   
  const data={
    full_name: carInformation.full_name,
    id_number: carInformation.id_number,
    insurance_type:carInformation.insurance_type,
    car_type: carInformation.car_type,
    vehicle_number:carInformation.vehicle_number,
    car_model:carInformation.car_model,
    manufacturing_year:carInformation.manufacturing_year,
    driver:carInformation.driver,
    fuel_type:carInformation.fuel_type,
    car_salary:carInformation.car_salary,
    start_date:carInformation.start_date,
    end_date:carInformation.end_date,
    car_category:carInformation.car_category,
    bolisa_number:carInformation.bolisa_number,
    company:carInformation.company,
    addons:addons1,
    insuranceCompaanyId:insuranceCompaanyId,
    old_price:this.props.companyOldPrice,
    dis_rate:this.props.companyDiscountRate,
    total:this.props.total_small,
    user_id:user_id,
    answer:carInformation.answer,
    beneficiary:carInformation.beneficiary,
    beneficiary_name:carInformation.beneficiary_name
  }
  this.props.sendOrder(data,this.props.full_name,this.props.addons,this.props.total,this.props.user_id)


}
gotToPayment2=(leftImage,rightImage,frontImage,backImage)=>{
  alert("hi",this.props.companyOldPrice,"+",this.props.companyDiscountRate)

  const {carInformation,insuranceCompaanyId,addons,total,user_id}=this.props
  var addons1=[]
  for(var i=0;i<addons.length;i++){
    addons1.push(addons[i].id)
  }
  
   var images=[]
   images.push({leftImage:leftImage});
   images.push({rightImage:rightImage});
   images.push({frontImage:frontImage});
   images.push({backImage:backImage});
   var image_test=''
   
   let apiUrl = 'https://bolisati.com/app/addorderimages';
 
   var formData = new FormData();

 
        formData.append('leftdate', this.state.leftDate)
        formData.append('rightdate', this.state.rightDate)
        formData.append('frontdate', this.state.frontDate)
        formData.append('backdate', this.state.backDate)
        formData.append('rightlatitude', this.state.rightlatitude)
        formData.append('rightlongitude', this.state.rightlongitude)
        formData.append('leftlatitude', this.state.leftlatitude)
        formData.append('leftlongitude', this.state.leftlongitude)
        formData.append('frontlatitude', this.state.frontlatitude)
        formData.append('frontlongitude', this.state.frontlongitude)
        formData.append('backlatitude', this.state.backlatitude)
        formData.append('backlongitude', this.state.backlongitude)
 
        let uriPartsLeft = this.state.leftCarPic.split('.');
        let uriLeft=this.state.leftCarPic
let fileTypeLeft = uriPartsLeft[uriPartsLeft.length - 1];

formData.append('leftImage', {
 uri:this.state.leftCarPic,
 name: `photo.${fileTypeLeft}`,
 type: `image/${fileTypeLeft}`,
});
let uriPartsRight = this.state.rightCarPic.split('.');
let fileTypeRight= uriPartsRight[uriPartsRight.length - 1];

formData.append('rightImage', {
  uri:this.state.rightCarPic,
name: `photo.${fileTypeRight}`,
type: `image/${fileTypeRight}`,
});

let uriPartsFront = this.state.frontCarPic.split('.');
let fileTypeFront= uriPartsFront[uriPartsFront.length - 1];

formData.append('frontImage', {
  uri:this.state.frontCarPic,
name: `photo.${fileTypeFront}`,
type: `image/${fileTypeFront}`,
});
let uriPartsBack = this.state.backCarPic.split('.');
let fileTypeBack= uriPartsBack[uriPartsBack.length - 1];

formData.append('backImage', {
  uri:this.state.backCarPic,
name: `photo.${fileTypeBack}`,
type: `image/${fileTypeBack}`,
});
let uriPartsDrivingLiceneseImage = this.props.carInformation.drivingLiceneseImage.split('.');
let urifileTypeDrivingLiceneseImage=this.props.carInformation.drivingLiceneseImage
let fileTypeDrivingLiceneseImage= uriPartsDrivingLiceneseImage[uriPartsDrivingLiceneseImage.length - 1];

formData.append('drivingLiceneseImage', {
  uri:this.props.carInformation.drivingLiceneseImage,
name: `photo.${fileTypeDrivingLiceneseImage}`,
type: `image/${fileTypeDrivingLiceneseImage}`,
});


let uriPartsDrivingLiceneseImageBack = this.props.carInformation.drivingLiceneseImageBack.split('.');
let uri=this.props.carInformation.drivingLiceneseImageBack
let fileTypeDrivingLiceneseImageBack= uriPartsDrivingLiceneseImageBack[uriPartsDrivingLiceneseImageBack.length - 1];

formData.append('drivingLiceneseImageBack', {
  uri:this.props.carInformation.drivingLiceneseImageBack,
name: `photo.${fileTypeDrivingLiceneseImageBack}`,
type: `image/${fileTypeDrivingLiceneseImageBack}`,
});
    let options = {
      method: 'POST',
      body: formData,
  //     headers: {
  //       Accept: 'application/x-www-from-urlencoded',
  //       'Content-Type': 'multipart/form-data',
  //       "consumer-device-id":deviceId,
  //       "consumer-key":"6df56cf915318431043dd7a75d",
  // "consumer-secret":"95032b42153184310488f5fb8f",
  // "consumer-nonce":"afczxcfasd"
  //     },
    };
    console.log("formDate",formData)
    fetch(apiUrl, options).then(res=>{
              console.log('response test',res)
    })
    
   const data={
     full_name: carInformation.full_name,
     id_number: carInformation.id_number,
     insurance_type:carInformation.insurance_type,
     car_type: carInformation.car_type,
     vehicle_number:carInformation.vehicle_number,
     car_model:carInformation.car_model,
     manufacturing_year:carInformation.manufacturing_year,
     driver:carInformation.driver,
     fuel_type:carInformation.fuel_type,
     car_salary:carInformation.car_salary,
     start_date:carInformation.start_date,
     end_date:carInformation.end_date,
     car_category:carInformation.car_category,
     bolisa_number:carInformation.bolisa_number,
     company:carInformation.company,
     addons:addons1,
     insuranceCompaanyId:insuranceCompaanyId,
     old_price:this.props.companyOldPrice,
     dis_rate:this.props.companyDiscountRate,
     total:this.props.total_small,
     user_id:user_id,
     answer:carInformation.answer,
     beneficiary:carInformation.beneficiary,
     beneficiary_name:carInformation.beneficiary_name
   }
   this.props.sendOrder(data,this.props.full_name,this.props.addons,this.props.total,this.props.user_id)
 
 
 }
async componentWillMount() {
  this.setState({ loading: false });
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
  const {loc}=await Permissions.askAsync(Permissions.LOCATION);
  this.setState({ hasLocationPermission: loc === 'granted' });
}


async componentDidMount() {
  const cameraPermission = await Permissions.getAsync(Permissions.CAMERA)
  const cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
const locationPermission=await Permissions.getAsync(Permissions.LOCATION)
  this.setState({
      cameraPermission: cameraPermission.status,
      cameraRollPermission: cameraRollPermission.status,
      locationPermission:locationPermission.loc
  })
}


    render(){
      let { leftCarPic } = this.state;
      let { rightCarPic } = this.state;
      let { frontCarPic } = this.state;
      let { backCarPic } = this.state;
console.log("this.props.carinformation99",this.props.carInformation)
      const{imageView,showCameraView,leftImage,rightImage,frontImage,backImage}=this.state
      const {lang}=this.props

        return(

            <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height:'100%'}}>

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
<Content>

<CardItem style={[sevicesCardItemStyle, {width: dimensions.width}]}>
      {lang=='ar'?
                <View style={{marginLeft:189}}>
                  <Text style={[servicesText,{lineHeight:40}]}>{strings('damagestep.Car_photos',lang)}</Text>
                </View>
                :
                <Left>
                <Text style={[servicesText,{lineHeight:40}]}>{strings('damagestep.Car_photos',lang)}</Text>
              </Left>
}
              </CardItem>
   
            <CardItem style={[transparentBackground,{marginTop:50}]}>
              <Left>
                {leftCarPic==null?
              <Button style={whiteBackground}
  onPress={()=>{ this._takePicture() } }                >
               
                   <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20}}>{strings('damagestep.left',lang)}</Text>
         
                   </Button> 
                   :
                   <TouchableOpacity style={{margin: 15, width:115,height:44,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}} onPress={()=>{ this._takePicture() } } > 
                   <Icon name='md-checkmark-circle' style={{color:'green'}}/> 
                   <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20,marginTop:5}}> {strings('damagestep.left',lang)}</Text>

</TouchableOpacity>
              }
              </Left>
              <Body style={[centerStyle,{marginRight:20}]}>
            {frontCarPic==null?
                 <Button style={[whiteBackground,{marginBottom:40,marginLeft:15,width:110}]}
                onPress={()=>{ this._takePictureF() } }     
                >
                                <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20}}>{strings('damagestep.front',lang)}</Text>

                   </Button>
                   :
                   <TouchableOpacity style={{margin: 15, width:115,height:44,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}      onPress={()=>{ this._takePictureF() } } > 
                                         <Icon name='md-checkmark-circle' style={{color:'green'}}/> 
                            <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20,marginTop:5}}> {strings('damagestep.front',lang)}</Text>

                   </TouchableOpacity>

  
              }
              <Image source={require("../assests/images/2.png")}
                         style={{height:142.6,width:120,resizeMode:"contain"}}
                   />
                
                {backCarPic==null?
                 <Button style={[whiteBackground,{marginTop:50,marginLeft:20}]} 
                 onPress={()=>{ this._takePictureB() } }     
                  >
             
                 <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20}}>{strings('damagestep.back',lang)}</Text>
             
                 </Button> 
                 :
                 <TouchableOpacity style={{margin: 15, width:115,height:44,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}    onPress={()=>{ this._takePictureB() } } > 
                 <Icon name='md-checkmark-circle' style={{color:'green'}}/> 
                 <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20,marginTop:5}}> {strings('damagestep.back',lang)}</Text>

</TouchableOpacity>
                }
              </Body>
              <Right>
                {rightCarPic==null?
              <Button style={[whiteBackground,{width:110}]} 
 onPress={()=>{ this._takePictureR() } }                       >
             
                  <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20}}>{strings('damagestep.right',lang)}</Text>
              
                  </Button>
                  :
                  <TouchableOpacity style={{margin: 15, width:100,height:44,backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}onPress={()=>{ this._takePictureR() } }    > 
                  <Icon name='md-checkmark-circle' style={{color:'green'}}/> 
                  <Text style={{color:'#003580',fontFamily:'TajawalRegular0',lineHeight:20,marginTop:5}}> {strings('damagestep.right',lang)}</Text>

</TouchableOpacity>
                }
              </Right>
              </CardItem>
              { (this.state.leftCarPic!=null) ||(this.state.rightCarPic!=null) ||(this.state.frontCarPic!=null) ||(this.state.backCarPic!=null) ?
              <CardItem style={{width: dimensions.width,backgroundColor:"#fff",height:120,marginTop:15,flexDirection:'row'}}>
            
            
            {leftCarPic &&
                <Image source={{ uri: leftCarPic }} style={{ width: 100, height: 100,  }} />}
                {rightCarPic &&
                <Image source={{ uri: rightCarPic }} style={{ width: 100, height: 100, }} />}
                {frontCarPic &&
                <Image source={{ uri: frontCarPic }} style={{ width: 100, height: 100,  }} />}
                {backCarPic &&
                <Image source={{ uri: backCarPic }} style={{ width: 100, height: 100,  }} />}
        
        
        
                    </CardItem>
      :null}
             { (this.state.leftCarPic!=null) &&(this.state.rightCarPic!=null) &&(this.state.frontCarPic!=null) &&(this.state.backCarPic) ?
             Platform.OS=="ios"?
             lang=="en"?
              <CardItem style={transparentBackground}>
                <Body style={centerStyle}>
  
                            <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
           onPress={() =>this.gotToPayment(leftImage,rightImage,frontImage,backImage)}>
                               <Text style={[buttonText,{marginBottom:Platform.OS=="android"?5:null}]}>{strings('drivinglicense.continue',lang)}
                   </Text>
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                   </TouchableOpacity>
                </Body>
            </CardItem>
            :
                    lang=="ar"?
                    <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
           onPress={() =>this.gotToPayment(leftImage,rightImage,frontImage,backImage)}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,
   
   marginEnd:7,
                            
                               resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
                    </Body>
                    </CardItem>
                    :null
                    :
                    lang=="en"?
                    <CardItem style={transparentBackground}>
                      <Body style={centerStyle}>
        
                                  <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
                 onPress={() =>this.gotToPayment2(leftImage,rightImage,frontImage,backImage)}>
                                     <Text style={[buttonText,{marginBottom:Platform.OS=="android"?5:null}]}>{strings('drivinglicense.continue',lang)}
                         </Text>
                         <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                         </TouchableOpacity>
                      </Body>
                  </CardItem>
                  :
                          lang=="ar"?
                          <CardItem style={transparentBackground}>
                          <Body style={centerStyle}>
                          <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
                 onPress={() =>this.gotToPayment2(leftImage,rightImage,frontImage,backImage)}>
                                   <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,
         
         marginEnd:7,
                                  
                                     resizeMode: 'contain'}}/>
         
                    <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
                  </TouchableOpacity>
                          </Body>
                          </CardItem>
                          :null 
             :null} 
</Content>



</Drawer>

           </ImageBackground>
        )
    }
    _checkCameraPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      this.setState({ status });
  }
  _checkLocationPermissions = async () => {
    const { loc } = await Permissions.getAsync(Permissions.LOCATION);
    this.setState({ loc });
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

  _pickImage = async () => {
      this._checkCameraRollPermissions();
      this._reqCameraRollPermissions();
      let result = await ImagePicker.launchImageLibraryAsync();

      console.log(result);
      if (!result.cancelled) {
          this.setState({ leftCarPic: result.uri });
      }
  };

  _takePicture = async () => {
      this._checkCameraPermissions();

      this._reqCameraPermissions();
this._checkLocationPermissions();
this._getLocationAsyncL();

      let result = await ImagePicker.launchCameraAsync();
//  console.log("result",result)
//  console.log("this.state.locationLeft",this.state.locationLeft)
      if (!result.cancelled) {
          this.setState({ leftCarPic: result.uri });
          this.setState({leftDate:Date()})
          if(this.state.locationLeft!=undefined&&this.state.locationLeft!=""){
          this.setState({leftlatitude:this.state.locationLeft.coords.latitude})
          this.setState({leftlongitude:this.state.locationLeft.coords.longitude})
          }
      }
  };



  _pickImageR = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ rightCarPic: result.uri });

    }
};

_takePictureR = async () => {
    this._checkCameraPermissions();
    this._reqCameraPermissions();
    this._getLocationAsyncR();
    let result = await ImagePicker.launchCameraAsync();
 console.log("result",result)
    if (!result.cancelled) {
        this.setState({ rightCarPic: result.uri });
        this.setState({rightDate: new Date()})
        if(this.state.locationRight!=undefined&&this.state.locationRight!=""){

        this.setState({rightlatitude:this.state.locationRight.coords.latitude})
        this.setState({rightlongitude:this.state.locationRight.coords.longitude})
        }
    }
    
};




_pickImageF = async () => {
  this._checkCameraRollPermissions();
  this._reqCameraRollPermissions();
  let result = await ImagePicker.launchImageLibraryAsync();

  if (!result.cancelled) {
      this.setState({ frontCarPic: result.uri });
  }
};

_takePictureF = async () => {
  this._checkCameraPermissions();
  this._reqCameraPermissions();
  this._getLocationAsyncF();

  let result = await ImagePicker.launchCameraAsync();
 
  if (!result.cancelled) {
      this.setState({ frontCarPic: result.uri });
      this.setState({frontDate:new Date()})
      if(this.state.locationFront!=undefined&&this.state.locationFront!=""){

      this.setState({frontlatitude:this.state.locationFront.coords.latitude})
      this.setState({frontlongitude:this.state.locationFront.coords.longitude})
      }
  }
};



_pickImageB= async () => {
  this._checkCameraRollPermissions();
  this._reqCameraRollPermissions();
  let result = await ImagePicker.launchImageLibraryAsync();


  if (!result.cancelled) {
      this.setState({ backCarPic: result.uri });
  }
};

_takePictureB = async () => {
  this._checkCameraPermissions();
  this._reqCameraPermissions();
  // this._getLocationAsyncB();

 
  let result = await ImagePicker.launchCameraAsync();

  if (!result.cancelled) {
      this.setState({ backCarPic: result.uri });
      this.setState({backDate:new Date()})
      if(this.state.locationBack!=undefined&&this.state.locationBack!=""){

      this.setState({backlatitude:this.state.locationBack.coords.latitude})
      this.setState({backlongitude:this.state.locationBack.coords.longitude})
      }
  }
};
}
// export default DamageStep;
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const { damage_step_msg} = state.damageStepReducer;
    return {damage_step_msg,lang};
}
// END MAP STATE TO PROPS


export default connect(mapStateToProps,damageStepAction)(DamageStep);