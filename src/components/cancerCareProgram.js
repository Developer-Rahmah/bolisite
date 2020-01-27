import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar,Alert,Image,ImageEditor,ImageStore,TouchableWithoutFeedback,ActivityIndicator,Platform,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Form,Item,Input,Picker,Card,Label,Drawer,CheckBox,Left,Right} from 'native-base';
import {transparentBackground,transparentBorder,inputStyle,centerStyle,buttonStyle,buttonText,pickerStyle,labelStyle} from '../theme';
import * as cancerCareProgramAction from '../actions/cancerCareProgramAction';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';
import { Audio } from 'expo-av';
import * as ImageManipulator from 'expo-image-manipulator';

import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import {uploadButton,continueText,uploadLicenseText} from '../assests/styles/drivingLicenseStyles';
import {scanned_id_image} from "../App";
import Header2 from './headerWithoutArrow';

const dimensions=Dimensions.get('window');
class CancerCareProgram extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false,
      x:false,
      x_id:false,
      passport_image64: null,
      id_image64:null,
      type: Camera.Constants.Type.back,
      passport_image: null,
      id_image:null,
      loading_id:true,
      loading_pass:true,
           cameraPermission: null,
           cameraRollPermission: null,
           full_name:"",
           id_number:"",
           id_image2:""


    
    }
  }
  async componentWillMount() {

    this.props.getCountries();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    
  }
  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    this.setState({
        cameraPermission: cameraPermission.status,
        cameraRollPermission: cameraRollPermission.status,
 
        full_name: scanned_id_image.full_name.replace("المملكة الأردنية الهاشمية"),
          id_number: scanned_id_image.id_number,
         id_image2:scanned_id_image.skip_id_img,
        
    })

}
    componentDidUpdate (){
        const { cancer_care_program_msg} = this.props;
         if (cancer_care_program_msg != null) {
           setTimeout(()=> this.props.resetCancerCareProgramMessage(),300);
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
      this.setState({ passport_image: result.uri });
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
      this.setState({passport_image: d.uri});
      cur.setState({x: false});
      cur.setState({loading_pass: true});

//  ImageEditor.cropImage(
//         this.state.passport_image,
//         cropData,
//         uri => {
//           ImageStore.getBase64ForTag(
//             uri,
//             base64data => {
     
//                this.setState({passport_image64: base64data});

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
  this.setState({x_id:true})
 
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
    console.log("hereeeeeeee",this.state.loading_id)
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
      this.setState({x_id: false});
      this.setState({loading_id: true});


    });

  }
}
 
//END DROPDOWN MESSAGES
     //START SHOW ALERT FUNC
     showAlert = () => {
      const {cancer_care_program_msg} = this.props;
      if (cancer_care_program_msg != null) {
        if (cancer_care_program_msg.isError) {
          this.onError(cancer_care_program_msg.msg);
        } else if (cancer_care_program_msg.isSuccess) {
          this.onSuccess(cancer_care_program_msg.msg);
        } else {
          return;
        }
      }
    };
    goFromCancerCareProgram=()=>{
      this.setState({form_submitted:true})
        const {full_name, id_number,coverage,passport_number,are_you_jordanian_no,nationality,are_you_jordanian_yes,user_id,lang} = this.props;
        var are_you_jordanian=null
        if(are_you_jordanian_no==true){
          are_you_jordanian=0
        }
        else if(are_you_jordanian_yes==true){
          are_you_jordanian=1
        }
    

        if(full_name==""&&this.state.full_name!="")
        {
       
  
          if(are_you_jordanian==1){
            if (this.state.id_number == '' ||this.state.id_image2=="") {
              this.dropdown.alertWithType('error', strings('message.error',lang), strings('message.fill_message',lang))
            } 
            else{
              this.props.goFromCancerCareProgram(this.state.full_name, this.state.id_number,coverage,passport_number,nationality,are_you_jordanian,user_id,strings('message.fill_message',lang),this.state.id_image2,this.state.passport_image);

            }
          } 
          else if(are_you_jordanian==0){
            if (passport_number == ''||nationality=='' ||this.state.passport_image==null) {
              this.dropdown.alertWithType('error', strings('message.error',lang), strings('message.fill_message',lang));

            } 
            else{
              this.props.goFromCancerCareProgram(this.state.full_name, this.state.id_number,coverage,passport_number,nationality,are_you_jordanian,user_id,strings('message.fill_message',lang),this.state.id_image2,this.state.passport_image);

            }
          }

        }
        else if(full_name!=""&&this.state.full_name=="")
        {
          if(are_you_jordanian==1){
            if (full_name== '' ||this.state.id_image==null) {
              this.dropdown.alertWithType('error', strings('message.error',lang), strings('message.fill_message',lang))
            } 
            else{
              this.props.goFromCancerCareProgram(full_name, id_number,coverage,passport_number,nationality,are_you_jordanian,user_id,strings('message.fill_message',lang),this.state.id_image,this.state.passport_image);
              }
          } 
          else if(are_you_jordanian==0){
            if (passport_number == ''||nationality=='' ||this.state.passport_image==null) {
              this.dropdown.alertWithType('error', strings('message.error',lang), strings('message.fill_message',lang));

            } 
            else{
              this.props.goFromCancerCareProgram(full_name, id_number,coverage,passport_number,nationality,are_you_jordanian,user_id,strings('message.fill_message',lang),this.state.id_image,this.state.passport_image);
              }
          }
          // id_number1=id_number
       
        }
 
      }
      closeDrawer = () => {
        this.drawer._root.close();
    
      };
    
      
    
      openDrawer = () => {
        
        this.drawer._root.open();
        setTimeout(() => Keyboard.dismiss());
      };
      countYes=(value)=>{
        const {are_you_jordanian_no}=this.props
        this.props.getCancerCareProgramTexts({
          prop: "are_you_jordanian_yes",
          value: !value
        })
        this.props.getCancerCareProgramTexts({
          prop: "are_you_jordanian_no",
          value: false
        })
      
        
          }
          countNo=(value)=>{
            const {are_you_jordanian_yes}=this.props
            this.props.getCancerCareProgramTexts({
              prop: "are_you_jordanian_no",
              value: !value
            })
            this.props.getCancerCareProgramTexts({
              prop: "are_you_jordanian_yes",
              value: false
            })
            
        
          }
    render(){
      const {full_name,id_number,coverage,lang,are_you_jordanian_no,are_you_jordanian_yes,passport_number,nationality,countries}=this.props

      const {form_submitted,passport_image,id_image}=this.state


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
{!this.state.x&&!this.state.x_id?
  <ScrollView ref={(ref)=> {this._scrollView = ref}}>

              <View style={{backgroundColor:'transparent',borderColor:'transparent'}}>
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717",lineHeight:20}]}>{strings('lifeinsurance.name',lang)}{scanned_id_image.scanned?form_submitted && this.state.full_name == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted && full_name == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 {scanned_id_image.scanned ? (
                   <Input
                     color="#fff"
                     value ={this.state.full_name}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.full_name == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.full_name == ""?2:0}]}
                     onChangeText={value =>
                      // this.props.getCancerCareProgramTexts({prop:"full_name",value})
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
                 onChangeText={value =>this.props.getCancerCareProgramTexts({prop:"full_name",value})}
               />
                 }
                   </View>
                 </Item>
               </CardItem>
               <View style={{marginRight:lang=='ar'?20:null,marginLeft:lang=='en'?20:null,marginTop:10}}>
          
          <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:this.state.form_submitted==true&&are_you_jordanian_yes==false&&are_you_jordanian_no==false?"red":  "#171717"}]}>{strings('cancer_care_program.are_you_jordanian',lang)}</Label>
 </View>
 {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

 <TouchableWithoutFeedback  onPress={() =>this.countYes(are_you_jordanian_yes)}>
          <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]}  >
          
        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
               <CheckBox
            
            style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
            checked={are_you_jordanian_yes}
            color="#003580"
            onPress={() =>this.countYes(are_you_jordanian_yes)
          
            }
          />
 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.yes',lang)}</Label>

               </View>
              
             </CardItem>
             </TouchableWithoutFeedback>
             :
<TouchableWithoutFeedback  onPress={() =>this.countYes(are_you_jordanian_yes)}>
          <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
          
        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
        <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",marginBottom:15}]}>{strings('health_insurance.yes',lang)}</Label>

               <CheckBox
            
            style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
            checked={are_you_jordanian_yes}
            color="#003580"
            onPress={() =>this.countYes(are_you_jordanian_yes)
          
            }
          />

               </View>
              
             </CardItem>
             </TouchableWithoutFeedback>
          }
           {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

             <TouchableWithoutFeedback    onPress={() =>this.countNo(are_you_jordanian_no)}>
             <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr",marginTop:-25}]}  >
           
           <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
            
   
            
                    <CheckBox
               
               style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
               checked={are_you_jordanian_no}
               color="#003580"
               onPress={() =>this.countNo(are_you_jordanian_no)
             
               }
             />
    <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.no',lang)}</Label> 
  
 
                  </View>
                 
        
                </CardItem>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback    onPress={() =>this.countNo(are_you_jordanian_no)}>
                <CardItem style={[transparentBackground,{flexDirection:"row-reverse",marginTop:-25}]}  >
              
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
               
              <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",marginBottom:10}]}>{strings('health_insurance.no',lang)}</Label> 

               
                       <CheckBox
                  
                  style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
                  checked={are_you_jordanian_no}
                  color="#003580"
                  onPress={() =>this.countNo(are_you_jordanian_no)
                
                  }
                />
     
    
                     </View>
                    
           
                   </CardItem>
                   </TouchableWithoutFeedback>
              }
                {are_you_jordanian_yes==true?
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
                      // this.props.getCancerCareProgramTexts({prop:"id_number",value})
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
onChangeText={value =>this.props.getCancerCareProgramTexts({prop:"id_number",value})}
/>
                 }
                   </View>
                 </Item>
               </CardItem>
               :
               are_you_jordanian_no==true?
               <View>
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.Passport_number',lang)}{form_submitted && passport_number == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                   <Input
                     color="#fff"
                     value ={passport_number}
                    //  placeholder ={strings('travelinsurance.Passport_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && passport_number == ""? "red": "#171717",borderBottomWidth:form_submitted && passport_number == ""?2:0}]}
                     onChangeText={value =>this.props.getCancerCareProgramTexts({prop:"passport_number",value})}
                   />
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
                        this.props.getCancerCareProgramTexts({prop:"nationality",value})
                      }
                     >
                 <Picker.Item label={strings('servant_insurance.nationality',lang)} value="" />

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
                        this.props.getCancerCareProgramTexts({prop:"nationality",value})
                      }
              
                       
                   >
                                    <Picker.Item label={strings('servant_insurance.nationality',lang)} value="" />

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
               </View>
               :null}
               
               {are_you_jordanian_no||are_you_jordanian_yes?
               Platform.OS=="ios"?
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('cancer_care_program.coverage',lang)}{form_submitted && coverage == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('cancer_care_program.coverage',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && coverage == ""? "red": "#171717",borderBottomWidth:form_submitted && coverage == ""?2:0}]}
                      selectedValue={coverage}
                      onValueChange={value =>
                        this.props.getCancerCareProgramTexts({prop:"coverage",value})
                      }
                     >
                    <Picker.Item label={strings('cancer_care_program.choose_coverage',lang)} value="" />
                     <Picker.Item label="JOD 10,000" value="10000" />
                     <Picker.Item label="JOD 15,000" value="15000" />
                     <Picker.Item label="JOD 20,000" value="20000" />
                     <Picker.Item label="JOD 30,000" value="30000" />

                    </Picker>
                    </View>
                </Item>
               </CardItem>
               :
               <CardItem style={transparentBackground}>
               <Item style={transparentBorder}>
               <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('cancer_care_program.coverage',lang)}{form_submitted && coverage == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
         
                  <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                  borderBottomColor:form_submitted && coverage == ""? "red": "#171717",borderBottomWidth:form_submitted && coverage == ""?2:0
                }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={coverage}
                       onValueChange={value =>
                        this.props.getCancerCareProgramTexts({prop:"coverage",value})
                      }
              
                       
                   >
                 <Picker.Item label={strings('cancer_care_program.choose_coverage',lang)} value="" />
                  <Picker.Item label="10000" value="10000" />
                  <Picker.Item label="15000" value="15000" />
                  <Picker.Item label="20000" value="20000" />
                  <Picker.Item label="30000" value="30000" />

                 </Picker>
                 </View>
                 </View>
             </Item>
            </CardItem>
               
:null}
  
{are_you_jordanian_no?
         <CardItem style={transparentBackground}>

                 <Body style={[centerStyle,{borderBottomColor:form_submitted && passport_image == null? "red": "#171717",borderBottomWidth:form_submitted && passport_image == null?2:0}]}>
                   <Button style={uploadButton} block 
           

                onPress={() => {
                  Alert.alert(
                      `${strings('add_photo.add_phot_title',lang)}`,
                      "",
                      [
                          { text:   `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                          { text:   `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePicture() } },
                          { text:   `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImage},
               
                      ],
                      { cancelable: false }
                  )
               }}
               


                   >
                   {passport_image != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                     <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_passport',lang)}</Text>
                    )}
                   </Button>
                   
                 </Body>
         {/* } */}
               </CardItem> 

               :null}
     
{are_you_jordanian_yes?
         <CardItem style={transparentBackground}>

  
{!scanned_id_image.scanned ? 
<Body style={[centerStyle,{borderBottomColor:form_submitted && id_image == null? "red": "#171717",borderBottomWidth:form_submitted && id_image == null?2:0}]}>

<Button style={uploadButton} block 
onPress={() => {
   Alert.alert(
       `${strings('add_photo.add_phot_title',lang)}`,
       "",
       [
           { text:   `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
           { text:   `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureId() } },
           { text:   `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageId},

       ],
       { cancelable: false }
   )
}}




  >
  {id_image != null ? (
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
               :null}
{lang=="en"?
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
     
                               <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
         onPress={this.goFromCancerCareProgram}>
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
         onPress={this.goFromCancerCareProgram}>
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
            {this.state.x_id?  <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: "black",
                  width: dimensions.width,
                  height: "100%"
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
              
                  
                 {this.state.loading_id?
      //         <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
      //               <Left>
      //                 <Body>
      //               <Button onPress={()=>this.start2Id()} style={{marginLeft:70}}>
      //                 <Text style={{fontFamily: "TajawalBold0"}}>capture</Text>
      //               </Button>
      //               </Body>
      //               </Left>
      //               <Right>
      //                 <Body>
      //               <Button onPress={()=>this.setState({x_id:false})} style={{marginRight:60}}>
      //   <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      // </Button>
      // </Body>
      //               </Right>
      //               </CardItem>
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',height:60}}>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.start2Id()}>
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:16}}>{strings('drivinglicense.capture',lang)}</Text>
      </Button>
      <Text>   </Text>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.setState({x_id:false})}  >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:16}}>{strings('drivinglicense.cancel',lang)}</Text>
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
{this.state.x?  <View
  style={{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    width: dimensions.width,
    height: dimensions.height / 1.2
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
    {/* <View
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

  <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
                    <Left>
                      <Body>
                    <Button onPress={()=>this.start2()} style={{marginLeft:70}}>
                      <Text style={{fontFamily: "TajawalBold0"}}>capture</Text>
                    </Button>
                    </Body>
                    </Left>
                    <Right>
                      <Body>
                    <Button onPress={()=>this.setState({x:false})} style={{marginRight:60}}>
        <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      </Button>
      </Body>
                    </Right>
                    </CardItem> 
              
                    :
                    <ActivityIndicator size="large" color="#fcfcfc" />

                    }
     
    </View> */}
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
      //               <Button onPress={()=>this.start2Id()} style={{marginLeft:70}}>
      //                 <Text style={{fontFamily: "TajawalBold0"}}>capture</Text>
      //               </Button>
      //               </Body>
      //               </Left>
      //               <Right>
      //                 <Body>
      //               <Button onPress={()=>this.setState({x_id:false})} style={{marginRight:60}}>
      //   <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      // </Button>
      // </Body>
      //               </Right>
      //               </CardItem>
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',height:60}}>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.start2()}>
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>Capture</Text>
      </Button>
      <Text>   </Text>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.setState({x:false})}  >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>Cancel</Text>
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
    const { full_name,id_number,coverage,cancer_care_program_msg,are_you_jordanian_no,are_you_jordanian_yes,passport_number,nationality} = state.cancerCareProgramReducer;
    return {full_name,id_number,coverage,cancer_care_program_msg,lang,are_you_jordanian_no,are_you_jordanian_yes,countries,passport_number,nationality};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,{...cancerCareProgramAction,...shippingInsuranceAction})(CancerCareProgram);