
import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar,Alert,Image,ImageEditor,ImageStore,ActivityIndicator,TouchableOpacity,Platform} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Item,Input,Picker,Card,Label,Drawer,Left,Right} from 'native-base';
import {transparentBackground,transparentBorder,inputStyle,centerStyle,buttonStyle,buttonText,pickerStyle,labelStyle} from '../theme';
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';
import * as servantInsuranceAction from '../actions/servantInsuranceAction';
import {ImagePicker, Camera, Permissions, ImageManipulator, Audio} from "expo";
import {uploadButton,continueText,uploadLicenseText} from '../assests/styles/drivingLicenseStyles';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
import {scanned_passport_image} from "../App";
import Header2 from './headerWithoutArrow';
import {Actions} from "react-native-router-flux";

const dimensions=Dimensions.get('window');
class ServantInsuranceInformation extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false,
      type: Camera.Constants.Type.back,
      passportImage64:null,
      passportImage: null,
      x:false,
           cameraPermission: null,
           cameraRollPermission: null,
           full_name:"",
           passport_number:"",
           passport_image2:"",
           loading_pass:true


    }
  }
  
  async componentWillMount() {
    scanned_passport_image.full_name=scanned_passport_image.full_name.replace("الاسم","")
    this.props.getCountries();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted',
    full_name: scanned_passport_image.full_name,
    

    passport_number: scanned_passport_image.passport_number,
   passport_image2:scanned_passport_image.skip_passport_img,
   
  
})
  }
  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
console.log("zzz")
    this.setState({
        cameraPermission: cameraPermission.status,
        cameraRollPermission: cameraRollPermission.status,
 
        //   full_name: scanned_passport_image.full_name,
        //   passport_number: scanned_passport_image.passport_number,
        //  passport_image2:scanned_passport_image.skip_passport_img,
        
    })

}
    componentDidUpdate (){
        const { servant_insurance_msg} = this.props;
         if (servant_insurance_msg != null) {
           setTimeout(()=> this.props.resetServantInsuranceMessage(),300);
         }
      }

    //START DROPDOWN MESSAGES
  onError = (error) => {
    const {lang}=this.props
    if (error) {
    console.log("error",error)
    this.dropdown.alertWithType('error', strings('message.error',lang), error);
  }
}

  onSuccess = success => {
    const {lang}=this.props

    if (success) {
    this.dropdown.alertWithType('success', strings('message.success',lang), success);
  }
}
 
//END DROPDOWN MESSAGES
     //START SHOW ALERT FUNC
     showAlert = () => {
      const {servant_insurance_msg} = this.props;
      if (servant_insurance_msg != null) {
        if (servant_insurance_msg.isError) {
          this.onError(servant_insurance_msg.msg);
        } else if (servant_insurance_msg.isSuccess) {
          this.onSuccess(servant_insurance_msg.msg);
        } else {
          return;
        }
      }
    };
    closeDrawer = () => {
      this.drawer._root.close();
  
    };
  
    
  
    openDrawer = () => {
      
      this.drawer._root.open();
      setTimeout(() => Keyboard.dismiss());
    };
    goFromServantInsuranceInformation=()=>{
      this.setState({form_submitted:true})
        const {full_name, passport_number,nationality,user_id,lang} = this.props;
        if(full_name==""&&this.state.full_name!="")
        {
          // full_name1=this.state.full_name
          if(Actions.currentScene=="servantinsuranceinformation"){

          this.props.goFromServantInsuranceInformation(this.state.full_name, this.state.passport_number,nationality,user_id,strings('message.fill_message',lang),this.state.passport_image2);
          }
        }
        else if(passport_number!=""&&this.state.passport_number=="")
        {
        
          if(Actions.currentScene=="servantinsuranceinformation"){

          this.props.goFromServantInsuranceInformation(full_name, passport_number,nationality,user_id,strings('message.fill_message',lang),this.state.passportImage);
          }
        }
    
 
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
      _pickImage = async () => {
        this._checkCameraRollPermissions();
        this._reqCameraRollPermissions();
        let result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.cancelled) {
            this.setState({ passportImage: result.uri });
        }
    };

    capture = true;
    
    start() {
      this.setState({x:true})
     
    }
    start2=()=>{
      this.capture = true;
      setInterval(() => {
        if (this.capture) {
          this.takePicture();
        }
      }, 300);
    }
    _takePicture = async () => {
      this.start()
     
    };
    async takePicture() {
    
      if (this.camera && this.capture) {
        this.capture = false;
    
        const options = {quality: 1, base64: true};
        var cur = this;
        this.setState({loading_pass:false})
        this.camera.takePictureAsync(options).then(async data => {
          var d = await ImageManipulator.manipulateAsync(
            data.uri,
            [{resize: {width: 1200}}],
            {base64: true}
          );
         
          var yoffset = d.height / 2 - d.width * 0.95 * 2 / 6;
          var snappheight = d.width * 0.95 * 2 / 3;
          const cropData = {
            offset: {x: d.width * 0.05, y: yoffset},
            size: {width: d.width * 0.95, height: snappheight}
          };
          var cur = this;
          this.setState({passportImage: d.uri});
          cur.setState({x: false});
          cur.setState({loading_pass: true});

          // alert(data.width.toString() + "-" +data.height.toString()+"-"+data.pictureOrientation.toString())
     ImageEditor.cropImage(
            this.state.passportImage,
            cropData,
            uri => {
              ImageStore.getBase64ForTag(
                uri,
                base64data => {
         
                   this.setState({passportImage64: base64data});
    
                },
                err => {
                  //alert(JSON.stringify(err))
                }
              );
            },
            err => {
              //alert(JSON.stringify(err))
            }
          );
     
    
        });
    
      }
    }
    
    render(){
      const {full_name,passport_number,lang,nationality,countries}=this.props
      const {form_submitted,passportImage}=this.state
console.log("scammmmmmm un servent",scanned_passport_image)
console.log("this.state in servant",this.state)

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

{!this.state.x?
          <Header openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
:
          <Header2 openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
    }
 
            <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
         
{!this.state.x?
  <ScrollView ref={(ref)=> {this._scrollView = ref}}>

              <View style={{backgroundColor:'transparent',borderColor:'transparent'}}>
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",lineHeight:20}]}>{strings('lifeinsurance.name',lang)}{scanned_passport_image.scanned?form_submitted && this.state.full_name == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&full_name==""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 {scanned_passport_image.scanned ? (
                   <Input
                     color="#fff"
                     value ={this.state.full_name}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.full_name == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.full_name == ""?2:0}]}
                     onChangeText={value =>
                      this.setState({full_name:value})
                    }
                   />
                 ):
                    <Input
                     color="#fff"
                     value ={full_name}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && full_name == ""? "red": "#171717",borderBottomWidth:form_submitted && full_name == ""?2:0}]}
                     onChangeText={value =>this.props.getServantInsuranceTexts({prop:"full_name",value})}
                   />
                 }
                   </View>
                 </Item>
               </CardItem>
           
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.Passport_number',lang)}{scanned_passport_image.scanned?form_submitted && phone_number.number == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&passport_number==""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 {scanned_passport_image.scanned ? (
                   <Input
                     color="#fff"
                     value ={this.state.passport_number}
                    //  placeholder ={strings('travelinsurance.Passport_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.passport_number == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.passport_number == ""?2:0}]}
                     onChangeText={value =>
                      this.setState({passport_number:value})
                    }
                   />
                 ):
                 <Input
                 color="#fff"
                 value ={passport_number}
                //  placeholder ={strings('travelinsurance.Passport_number',lang)}
                 placeholderTextColor="#9B9B9B"
                 style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && passport_number == ""? "red": "#171717",borderBottomWidth:form_submitted && passport_number == ""?2:0}]}
                 onChangeText={value =>this.props.getServantInsuranceTexts({prop:"passport_number",value})}
               />
                 }
                   </View>
                 </Item>
               </CardItem>
     {Platform.OS=="ios"?
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('servant_insurance.nationality',lang)}{form_submitted && nationality == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('servant_insurance.nationality',lang)}
                      // placeholder={strings('travelinsurance.destination_from',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && nationality == ""? "red": "#171717",borderBottomWidth:form_submitted && nationality == ""?2:0}]}
                      selectedValue={nationality}
                      onValueChange={value =>
                        this.props.getServantInsuranceTexts({prop:"nationality",value})
                      }
                     >
                                                             <Picker.Item label={strings('servant_insurance.nationality',lang)}value="" />

                 {countries.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.countries_id}
                          label={item.countries_name}
                          value={item.countries_id}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                </Item>
               </CardItem>
               :
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('servant_insurance.nationality',lang)}{form_submitted && nationality == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                

<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
borderBottomColor:form_submitted && nationality == ""? "red": "#171717",borderBottomWidth:form_submitted && nationality == ""?2:0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={nationality}
                       onValueChange={value =>
                        this.props.getServantInsuranceTexts({prop:"nationality",value})
                      }
                    
                       
                   >
                                        <Picker.Item label={strings('servant_insurance.nationality',lang)}value="" />

                 {countries.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.countries_id}
                          label={item.countries_name}
                          value={item.countries_id}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                    </View>
                </Item>
               </CardItem>
                  }
               <CardItem style={transparentBackground}>

{!scanned_passport_image.scanned ? 
                 <Body style={[centerStyle,{borderBottomColor:form_submitted && passportImage == null? "red": "#171717",borderBottomWidth:form_submitted && passportImage == null?2:0}]}>
              <Button style={uploadButton} block 
                  
                  onPress={() => {
                     Alert.alert(
                       `${strings('add_photo.add_phot_title',lang)}`,
                         "",
                         [
                             { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                             { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePicture() } },
                             { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImage},
 
                         ],
                         { cancelable: false }
                     )
                 }}
 
 
 
 
                    >
                    {passportImage != null ? (
                       <Icon
                         name="md-checkmark-circle"
                         style={{color: "green"}}
                       />
                     ) : (
                      <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_passport',lang)}</Text>
                     )}
                    </Button>
                   
                 </Body>
              :null }
               </CardItem> 
               {lang=="en"?
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
           
                  {Actions.currentScene=="servantinsuranceinformation"?
                                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromServantInsuranceInformation}>
                   <Text style={[buttonText,{marginBottom:Platform.OS=="android"?5:null}]}>{strings('drivinglicense.continue',lang)}
                   </Text>
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                   </TouchableOpacity>
                   :null}
                </Body>
            </CardItem>
            :null}
            {lang=="ar"?
                <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                    {Actions.currentScene=="servantinsuranceinformation"?
                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromServantInsuranceInformation}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
            :null}
                    </Body>
                    </CardItem>
                    :null}

            </View>
            </ScrollView>
           :null}
            {this.state.x?  <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: "black",
                  width: dimensions.width,
                  height: dimensions.height
                }}
              >
                <Camera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                  type={Camera.Constants.Type.back}
                  flashMode={Camera.Constants.FlashMode.off}
                  permissionDialogTitle={"Permission to use camera"}
                  permissionDialogMessage={
                    "We need your permission to use your camera phone"
                  }
                >
                  <View
                    style={{
                      backgroundColor: "rgba(1,1,1,0.6)",
                      flex: 1,
                      width: "100%",
                      margin: 0
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: Dimensions.get("window").width * 0.95 * 2 / 3
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "rgba(1,1,1,0.6)",
                        height: Dimensions.get("window").width * 0.95 * 2 / 3,
                        width: "2.5%",
                        margin: 0
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#fcfcfc",
                        borderWidth: 1,
                        borderRadius: 2,
                        margin: 0,
                        width: "95%",
                        height: Dimensions.get("window").width * 0.95 * 2 / 3,
                        minWidth: 200,
                        minHeight: 100
                      }}
                    >
                      {this.state.loading ? (
                        <ActivityIndicator size="large" color="#fcfcfc" />
                      ) : null}
                      <Image
                        source={this.state.doneimg}
                        style={{width: 128, height: 128}}
                      />
            
                    </View>
                    <View
                      style={{
                        backgroundColor: "rgba(1,1,1,0.6)",
                        height: Dimensions.get("window").width * 0.95 * 2 / 3,
                        width: "2.5%",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 0
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: "rgba(1,1,1,0.6)",
                      flex: 1,
                      width: "100%",
                      margin: 0,
                      paddingTop: 20,
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
              
                 {this.state.loading_pass? 
      //         <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
      //               <Left>
      //                 <Body>
      //               <Button onPress={()=>this.start2()} style={{marginLeft:70}}>
      //                 <Text style={{fontFamily: "TajawalBold0"}}>Capture</Text>
      //               </Button>
      //               </Body>
      //               </Left>
      //               <Right>
      //                 <Body>
      //               <Button onPress={()=>this.setState({x:false})} style={{marginRight:60}}>
      //   <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      // </Button>
      // </Body>
      //               </Right>
      //               </CardItem>
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',height:60}}>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.start2()}  >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>{strings('drivinglicense.capture',lang)}</Text>
      </Button>
      <Text>   </Text>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.setState({x:false})} >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>{strings('drivinglicense.cancel',lang)}</Text>
      </Button>
    
    </View>
                   :
                   <ActivityIndicator size="large" color="#fcfcfc" />
                 }
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}
                  />
                </Camera>

     

        
              </View>
:null}
            <Text>{this.showAlert()}</Text>

{/* <DropdownAlert ref={ref => (this.dropdown = ref)} style={{fontFamily:'TajawalRegular0',}} /> */}
            <DropdownAlert replaceEnabled={true}  titleStyle={{textAlign:lang=='ar'? 'right':'left',fontFamily:'TajawalBold0',color:"#fff"}} messageStyle={{textAlign:lang=='ar'?'right':'left',fontFamily:'TajawalBold0',color:"#fff"}}imageStyle={{direction:'rtl'}} ref={(ref) => this.dropdown = ref}  />    

</Drawer>
            </ImageBackground>

            

        )
    }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default LifeInsurance;
const mapStateToProps = state => {
    const { lang } = state.sideBarReducer;
    const {countries} = state.shippingInsuranceReducer;

    const { full_name,passport_number,servant_insurance_msg,nationality} = state.servantInsuranceReducer;
    return {full_name,passport_number,servant_insurance_msg,lang,nationality,countries};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,{
    ...servantInsuranceAction,
    ...shippingInsuranceAction})
    (ServantInsuranceInformation);