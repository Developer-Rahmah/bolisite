
import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar,Image,ImageEditor,ImageStore,Alert,TouchableWithoutFeedback,TouchableOpacity,ActivityIndicator,Platform} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Form,Item,Input,Picker,Card,Label,Drawer,CheckBox, Left, Right} from 'native-base';
import {transparentBackground,transparentBorder,inputStyle,centerStyle,buttonStyle,buttonText,pickerStyle,datePickerStyle,labelStyle,phoneInputStyle} from '../theme';
import * as healthInsuranceAction from '../actions/healthInsuranceAction';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import DatePicker from 'react-native-datepicker';
import Header from './header';
import Header2 from './headerWithoutArrow';

import SideBar from "./sideBar";
import * as ImageManipulator from 'expo-image-manipulator';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import {uploadButton,continueText,uploadLicenseText} from '../assests/styles/drivingLicenseStyles';
import {scanned_id_image} from "../App";
const dimensions=Dimensions.get('window');
class HealthInsurance extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false,
      x:false,
      id_image64:null,
      type: Camera.Constants.Type.back,
      id_image:null,
      loading_id:true,
           cameraPermission: null,
           cameraRollPermission: null,
           full_name:"",
           id_number:"",
           id_image2:"",
           date_of_birth:""


    }
  }
  async componentWillMount() {
  
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
  }
    async componentDidMount() {
      const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
      const cameraRollPermission = await Permissions.getAsync(
        Permissions.CAMERA_ROLL
      );
  
  
      this.setState({
      //   full_name: scanned_id_image.full_name,
      //   id_number: scanned_id_image.id_number,
      //  id_image2:scanned_id_image.skip_id_img,
      //  date_of_birth:scanned_id_image.date_of_birth,
      full_name: scanned_id_image.full_name.replace("المملكة الأردنية الهاشمية"),
      id_number: scanned_id_image.id_number,
      id_image2: scanned_id_image.skip_id_img,
      date_of_birth:scanned_id_image.date_of_birth.replace("تاريخ الودة"),
        cameraPermission: cameraPermission.status,
        cameraRollPermission: cameraRollPermission.status
      });
    }
    componentDidUpdate (){
        const { health_insurance_msg} = this.props;
         if (health_insurance_msg != null) {
           setTimeout(()=> this.props.resetHealthInsuranceMessage(),300);
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
    this.dropdown.alertWithType('success', '', success);
  }
}
countYes=(value)=>{
  const {Do_you_have_any_diseases_no}=this.props
  this.props.getHealthInsuranceTexts({
    prop: "Do_you_have_any_diseases_yes",
    value: !value
  })
  this.props.getHealthInsuranceTexts({
    prop: "Do_you_have_any_diseases_no",
    value: false
  })

  
    }
    countNo=(value)=>{
      const {Do_you_have_any_diseases_yes}=this.props
      this.props.getHealthInsuranceTexts({
        prop: "Do_you_have_any_diseases_no",
        value: !value
      })
      this.props.getHealthInsuranceTexts({
        prop: "Do_you_have_any_diseases_yes",
        value: false
      })
      
  
    }
//END DROPDOWN MESSAGES
     //START SHOW ALERT FUNC
     showAlert = () => {
      const {health_insurance_msg} = this.props;
      if (health_insurance_msg != null) {
        if (health_insurance_msg.isError) {
          this.onError(health_insurance_msg.msg);
        } else if (health_insurance_msg.isSuccess) {
          this.onSuccess(health_insurance_msg.msg);
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
    goFromHealthInsurance=()=>{
      this.setState({form_submitted:true})
      var Do_you_have_any_diseases=''
      if(this.props.Do_you_have_any_diseases_yes==true)
      {
        Do_you_have_any_diseases="1"
      }
      else if(this.props.Do_you_have_any_diseases_no==true){
        Do_you_have_any_diseases="0"

      }
        const {full_name, id_number,age,user_id,lang,Do_you_have_any_diseases_yes} = this.props;
        if(full_name==""&&this.state.full_name!="")
        {
          // full_name1=this.state.full_name
          this.props.goFromHealthInsurance(this.state.full_name, this.state.id_number,this.state.date_of_birth,Do_you_have_any_diseases,user_id,strings('message.fill_message',lang),this.state.id_image2);

        }
        else if(id_number!=""&&this.state.id_number=="")
        {
          // id_number1=id_number
          this.props.goFromHealthInsurance(full_name, id_number,age,Do_you_have_any_diseases,user_id,strings('message.fill_message',lang),this.state.id_image);

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
      _pickImageId = async () => {
        this._checkCameraRollPermissions();
        this._reqCameraRollPermissions();
        let result = await ImagePicker.launchImageLibraryAsync();
      
        if (!result.cancelled) {
            this.setState({ id_image: result.uri });
        }
      };
      
   
      capture2 = true;
      
      startId() {
        this.setState({x:true})
       
      }
      start2Id=()=>{
        this.capture2 = true;
        setInterval(() => {
          if (this.capture2) {
            this.takePictureId();
          }
        }, 300);
      }
      _takePictureId = async () => {
        this.startId()
       
      };
      async takePictureId() {
      
        if (this.camera && this.capture2) {
          this.capture2 = false;
      
          const options = {quality: 1, base64: true};
          var cur = this;
          this.setState({loading_id:false})
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
            this.setState({id_image: d.uri});
            cur.setState({x: false});
            cur.setState({loading_id: true});

      //  ImageEditor.cropImage(
      //         this.state.id_image,
      //         cropData,
      //         uri => {
      //           ImageStore.getBase64ForTag(
      //             uri,
      //             base64data => {
           
      //                this.setState({id_image64: base64data});
      
      //             },
      //             err => {
      //             }
      //           );
      //         },
      //         err => {
      //         }
      //       );
       
      
          });
      
        }
      }
  
    render(){
      const {full_name,id_number,age,lang,Do_you_have_any_diseases_yes,Do_you_have_any_diseases_no}=this.props
      const {form_submitted}=this.state


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
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",lineHeight:20}]}>{strings('lifeinsurance.name',lang)}{scanned_id_image.scanned?form_submitted && this.state.full_name == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&full_name==""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 {scanned_id_image.scanned ? (

                   <Input
                     color="#fff"
                     value ={this.state.full_name}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.full_name == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.full_name == ""?2:0}]}
                     onChangeText={value =>
                      // this.props.getHealthInsuranceTexts({prop:"full_name",value})
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
                 onChangeText={value =>this.props.getHealthInsuranceTexts({prop:"full_name",value})}
               />
                 }
                </View>
                 </Item>
               </CardItem>
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('carInformation.id_number',lang)}{scanned_id_image.scanned?form_submitted && this.state.id_number == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&id_number==""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 {scanned_id_image.scanned ? (

                   <Input
                    keyboardType="numeric"
                    returnKeyType='done'

                     color="#fff"
                     value ={this.state.id_number}
                    //  placeholder ={strings('carInformation.id_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.id_number == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.id_number == ""?2:0}]}
                     onChangeText={value =>
                      // this.props.getHealthInsuranceTexts({prop:"id_number",value})
                      this.setState({id_number:value})
                    }
                   />
                 ):
                 <Input
                 keyboardType="numeric"
                 returnKeyType='done'

                  color="#fff"
                  value ={id_number}
                 //  placeholder ={strings('carInformation.id_number',lang)}
                  placeholderTextColor="#9B9B9B"
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && id_number == ""? "red": "#171717",borderBottomWidth:form_submitted && id_number == ""?2:0}]}
                  onChangeText={value =>this.props.getHealthInsuranceTexts({prop:"id_number",value})}
                />
                 }
                   </View>
                 </Item>
               </CardItem>
     
                  <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717"}]}>{strings('lifeinsurance.birthday',lang)}{scanned_id_image.scanned?form_submitted && this.state.date_of_birth == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&age==""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                
                        {scanned_id_image.scanned ? (

<Input
  color="#fff"
  value ={this.state.date_of_birth}
 //  placeholder ={strings('carInformation.full_name',lang)}
  placeholderTextColor="#9B9B9B"
  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.date_of_birth == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.date_of_birth == ""?2:0}]}
  onChangeText={value =>
    // this.props.getHealthInsuranceTexts({prop:"full_name",value})
    this.setState({date_of_birth:value})
    }
/>
):
                     <DatePicker
                 style={[datePickerStyle,{borderBottomColor:form_submitted && age == ""? "red": "#171717",borderBottomWidth:form_submitted && age == ""?2:0}]}
                 date={ age}
                 mode="date"
                 placeholder={strings('lifeinsurance.birthday',lang)}
                 format="YYYY-MM-DD"
                 maxDate={new Date()}
                 minDate="1945-12-31"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 customStyles={{
                 dateIcon: {
                 position: 'absolute',
                 left: 0,
                 top: 4,
                 marginLeft: 0
                 },
                 dateInput: {
                 marginLeft: 36
                 },
                 btnTextConfirm: {
                 height: 20
                 },
                 btnTextCancel: {
                 height: 20
                 }
     }}
     onDateChange={(value) => 
      this.props.getHealthInsuranceTexts({prop:"age",value})
      // ttis.setState({date_of_birth:value})
    }
    />
                        }
                    </View>
                </Item>
               </CardItem>
           

               <View style={{marginRight:lang=='ar'?20:null,marginLeft:lang=='en'?20:null,marginTop:10}}>
          
               <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:this.state.form_submitted==true&&Do_you_have_any_diseases_no==false&&Do_you_have_any_diseases_yes==false?"red":  "#171717"}]}>{strings('health_insurance.Do_you_have_any_diseases',lang)}</Label>
      </View>
      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

      <TouchableWithoutFeedback   onPress={() =>this.countYes(Do_you_have_any_diseases_yes)}>
               <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]}  >
               
             <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
                    <CheckBox
                 
                 style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
                 checked={Do_you_have_any_diseases_yes}
                 color="#003580"
                 onPress={() =>this.countYes(Do_you_have_any_diseases_yes)
               
                 }
               />
      <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.yes',lang)}</Label>

                    </View>
                   
                  </CardItem>
                  </TouchableWithoutFeedback>
                  :

                  <TouchableWithoutFeedback   onPress={() =>this.countYes(Do_you_have_any_diseases_yes)}>
                  <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
                  
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
                <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.yes',lang)}</Label>

                       <CheckBox
                    
                    style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :10}}
                    checked={Do_you_have_any_diseases_yes}
                    color="#003580"
                    onPress={() =>this.countYes(Do_you_have_any_diseases_yes)
                  
                    }
                  />
   
                       </View>
                      
                     </CardItem>
                     </TouchableWithoutFeedback>

                }
                      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                  <TouchableWithoutFeedback onPress={() =>this.countNo(Do_you_have_any_diseases_no)}>

                  <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr",marginTop:-25}]}  >
                
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
                 
        
                 
                         <CheckBox
                    
                    style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
                    checked={Do_you_have_any_diseases_no}
                    color="#003580"
                    onPress={() =>this.countNo(Do_you_have_any_diseases_no)
                  
                    }
                  />
         <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.no',lang)}</Label> 
       
      
                       </View>
                      
             
                     </CardItem>
  </TouchableWithoutFeedback>
  :
  <TouchableWithoutFeedback onPress={() =>this.countNo(Do_you_have_any_diseases_no)}>

  <CardItem style={[transparentBackground,{flexDirection:"row-reverse",marginTop:-25}]}  >

<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
<Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.no',lang)}</Label> 


 
         <CheckBox
    
    style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :10}}
    checked={Do_you_have_any_diseases_no}
    color="#003580"
    onPress={() =>this.countNo(Do_you_have_any_diseases_no)
  
    }
  />


       </View>
      

     </CardItem>
</TouchableWithoutFeedback>

                  }
                     <CardItem style={transparentBackground}>

{!scanned_id_image.scanned?
<Body style={[centerStyle,{borderBottomColor:form_submitted && this.state.id_image == null? "red": "#171717",borderBottomWidth:form_submitted && this.state.id_image == null?2:0}]}>

<Button style={uploadButton} block 
onPress={() => {
   Alert.alert(
     `${strings('add_photo.add_phot_title',lang)}`,
       "",
       [
           { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
           { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureId() } },
           { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageId},

       ],
       { cancelable: false }
   )
}}




  >
  {this.state.id_image != null ? (
     <Icon
       name="md-checkmark-circle"
       style={{color: "green"}}
     />
   ) : (
    <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_id',lang)}</Text>
   )}
  </Button>
  </Body>

                :null }
               </CardItem> 
    {lang=="en"?
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
               
                <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
           onPress={this.goFromHealthInsurance}>               
                    <Text style={[buttonText,{marginBottom:Platform.OS=="android"?5:null}]}>{strings('drivinglicense.continue',lang)}
                   </Text>
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 

                  </TouchableOpacity>
                </Body>
            </CardItem>
            :null}
            {lang=="ar"?
                    <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
           onPress={this.goFromHealthInsurance}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,
   
   marginEnd:7,
                            
                               resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
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
                margin:0
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
                  {this.state.loading_id?
              
      //             <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
      //               <Left>
      //                 <Body>
      //               <Button onPress={()=>this.start2Id()} style={{marginLeft:70}}>
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
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.start2Id()} >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>{strings('drivinglicense.capture',lang)}</Text>
      </Button>
      <Text>   </Text>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.setState({x:false})}>
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

    const { full_name,health_insurance_msg,id_number,age,Do_you_have_any_diseases_yes,Do_you_have_any_diseases_no} = state.healthInsuranceReducer;
    return {full_name,id_number,age,health_insurance_msg,lang,Do_you_have_any_diseases_yes,Do_you_have_any_diseases_no};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,
    healthInsuranceAction)
    (HealthInsurance);