import React,{Component} from 'react';
import  {ImageBackground,Dimensions,Text,StyleSheet,TouchableOpacity,View,Modal,TouchableWithoutFeedback,Keyboard,Image,StatusBar,Platform,AsyncStorage} from 'react-native';
import {Body,CardItem,Item,Button,Input,Content,List,
  ListItem,Icon,Toast,Left,Drawer,  Label,
} from 'native-base';
import {Spinner} from "./common/Spinner";
import DropdownAlert from 'react-native-dropdownalert';
import PhoneInput from 'react-native-phone-input';
import * as authAction from '../actions/authAction';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import {strings} from '../../Locales/i18n';
import Header from './AuthHeader'
import SideBar from "./sideBar";
import {blueBackgroundColor,buttonText,inputStyle,transparentBackground,transparentBorder,phoneInputStyle,centerStyle,touchableOpacityText,labelStyle} from '../theme';
const dimensions=Dimensions.get('window');
import { Constants } from 'expo';

class Login extends Component{
  constructor(props){
    super(props);
    this.state ={
      hidePassword:true ,
      form_submitted:false,
      deviceToken:"",
      devicePlatform:"",
    }

  }
  async componentWillMount(){
    const token = await AsyncStorage.getItem("deviceToken");
    console.log("token in login",token)
    const platform = await AsyncStorage.getItem("devicePlatform");
    console.log("platform in login",platform)

    if(token !=null){
        this.setState({deviceToken:token,devicePlatform:platform})
    }
}
    componentDidUpdate (){
        const { signin_alert_message} = this.props;
         if (signin_alert_message != null) {
           setTimeout(()=> this.props.resetAuthMessage(),250);
         }
      }
        //START DROPDOWN MESSAGES
 onError = (error) => {
   const {lang}=this.props
    if (error) {
      console.log("error",error)
      this.dropdown.alertWithType('error',strings('message.error',lang), error);
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
 showAlert = () =>
   {
       const { signin_alert_message} = this.props;
        if (signin_alert_message != null) {

          if (signin_alert_message.isError) {
         
            this.onError(signin_alert_message.msg);
            
          }
          else if(signin_alert_message.isSuccess)
          {
            this.onSuccess(signin_alert_message.msg);

          }
          else {
            return ;
          }
        }
     }

 //END SHOW ALERT FUNC

   //START SHOW TOAST
   showToast = () => {
    const {recover_password_msg} = this.props;
    if (recover_password_msg != null) {
      if (recover_password_msg.isSuccess) {
        setTimeout(
          () =>
            Toast.show({
              text: recover_password_msg.msg,
              buttonText: "Okay",
              position: "bottom",
              type: "success"
            }),
          500
        );
      }
    }
  };
  //END SHOW TOAST

//START SIGNIN HANDLER
  signInHandler = ()=>
  {
    const device_id=Constants.deviceId;
    let platform=Platform.OS

    this.setState({form_submitted:true})
    const { phone_number,password,lang} = this.props;
        this.props.loginUser(phone_number,password,this.state.deviceToken,this.state.devicePlatform,strings('message.fill_message',lang));

  
    
  }
//END SIGNIN HANDLER



//START SHOW SUBMIT BUTTON
  showSubmitButton = ()=>
  {
    const { start_loading_of ,lang} = this.props;

      if (start_loading_of.signin_loading) {
        return (
          <Button
            block
            style={blueBackgroundColor}>
            <Spinner size="large" />
          </Button>
        );
      }

    return (
   
    <Button style={{backgroundColor:'#003580',justifyContent:'center',marginTop:10}}block onPress={this.signInHandler}>
{/* <Button style={buttonStyle} block onPress={() => Actions.home()}> */}
       <Text style={buttonText}> {strings('login.login_button',lang)}</Text>
     </Button>

    )
  }
  //END SHOW SUBMIT BUTTON

  //START FORGET PASSWORD MODAL
  openForgetPasswordModal = () => {
    const {show_modal} = this.props;

    this.props.showRecoverPasswordModal(!show_modal);
    this.props.resetAuthMessage();
    this.props.getUserText({prop: "recover_password_email", value: ""});
  };
  //END FORGET PASSWORD MODAL

    //START RECOVER PASSWORD BUTTON
    renderRecoverPasswordBtn = () => {
      const {start_loading_of,lang} = this.props;
      if (start_loading_of.recover_loading) {
        return (
          <Button block style={[blueBackgroundColor,{fontFamily:'TajawalMedium0',}]}>
            <Spinner size="large" />
          </Button>
        );
      }
      return (
        <Button
          block
          style={[blueBackgroundColor,{fontFamily:'TajawalMedium0',}]}
          onPress={this.recoverPassword}
        >
          <Text style={{color: "#fff",textAlign:"center",fontFamily:'TajawalMedium0',}}>
{strings('signin.recover_password',lang)}          </Text>
        </Button>
      );
    };
    //END RECOVER PASSOWRD BUTTON

      //START RECOVER PASSWORD
  recoverPassword = () => {
    const {phone_number} = this.props;
    this.props.recoverPassword(phone_number);
  };
  //END RECOVER PASSWORD

     // START SELECT A PHONE COUNTRY
     selectCountry(country){
      const country_code  = this.phone.getCountryCode();
      this.props.getUserText({prop:'phone_number',value:{
        code:country_code,
        number:''
      }});
     }
  
  // END SELECT A PHONE COUNTRY

    // START CHANGING A PHONE NUMBER FUNC
    changePhoneNumber(number)
    {
  
      const { phone_number } = this.props;
     if (this.phone.getISOCode()) {
       const country_code  = this.phone.getCountryCode();
   
       this.props.getUserText({prop:'phone_number',value:{
         code:country_code,
         number:phone_number.number
       }});
     }
     else {
       this.props.getUserText({prop:'phone_number',value:{
         code:'',
         number:phone_number.number
       }});
     }
 const num = number;
     this.props.getUserText({prop:'phone_number',value:{
       code:phone_number.code,
       number:num
     }});
 
   };
    // END CHANGING A PHONE NUMBER FUNC
    managePasswordVisibility=()=>{
      this.setState({hidePassword: !this.state.hidePassword});
    }
    verificationInputsHandler2 = (value, key) => {

      if (key === "first") {
        this.props.getMobileAuthTextsValue({prop: "firstInput", value});
        if (value !== "") {
          this._secondVI._root.focus();
        }
      } else if (key === "second") {
        this.props.getMobileAuthTextsValue({prop: "secondInput", value});
        if (value !== "") {
          this._thirdVI._root.focus();
        }
      } else if (key === "third") {
        this.props.getMobileAuthTextsValue({prop: "thirdInput", value});
        if (value !== "") {
          this._fourthVI._root.focus();
        }
      } else if (key === "fourth") {
        this.props.getMobileAuthTextsValue({prop: "fourthInput", value});
      }
    };
      //START VERVICATION INPUT
  verificationInputsHandler = (value, key) => {

    if (key === "first") {
      this.props.getMobileAuthTextsValueRecoverPassword({prop: "firstInputRecover", value});
      if (value !== "") {
        this._secondVI._root.focus();
      }
    } else if (key === "second") {
      this.props.getMobileAuthTextsValueRecoverPassword({prop: "secondInputRecover", value});
      if (value !== "") {
        this._thirdVI._root.focus();
      }
    } else if (key === "third") {
      this.props.getMobileAuthTextsValueRecoverPassword({prop: "thirdInputRecover", value});
      if (value !== "") {
        this._fourthVI._root.focus();
      }
    } else if (key === "fourth") {
      this.props.getMobileAuthTextsValueRecoverPassword({prop: "fourthInputRecover", value});
    }
  };
  //END VERVICATION INPUT
   //START ERROR MESSAGE
renderErrorMsg = ()=>
{
  const { recover_msg } = this.props;

   if (recover_msg != null) {
     if (recover_msg.isError) {
       return <View style={{padding:10,height:'auto',backgroundColor:'#FF3333',borderRadius:5,borderWidth:1,borderColor:'red',flexDirection:'row'}}>
         <Icon name="md-alert" style={{color:'#fff',fontSize:30,flex:1}} />
         <Text style={{color:'#fff',fontWeight:'bold',justifyContent:'flex-start',textAlign:'left',marginLeft:0,flex:5}}>{recover_msg.msg}</Text>
       </View>
     }
     else if(recover_msg.isSuccess) {
       return <View style={{padding:5,paddingRight:10,paddingLeft:10,height:'auto',backgroundColor:'green',borderRadius:5,flexDirection:'row'}}>
         <Icon name="md-checkmark-circle" style={{color:'#fff',fontSize:30,flex:1}} />
         <Text style={{color:'#fff',fontWeight:'bold',justifyContent:'flex-start',textAlign:'left',marginLeft:0,flex:5}}>{recover_msg.msg}</Text>
       </View>
     }
   }
    return null;
}
//END ERROR MESSAGES
  confirmCodeHandler = () => {
    const {
      codeInput,
      mobile_auth_message,
      mobile_auth_loading,
      confirmResult,
      firstInputRecover,
      secondInputRecover,
      thirdInputRecover,
      fourthInputRecover,
      phone_number
    } = this.props;
    let code = '';
    Keyboard.dismiss();
    code =
      firstInputRecover +
      secondInputRecover +
      thirdInputRecover +
      fourthInputRecover ;
    // this.props.getMobileAuthTextsValue({prop: "codeInput", value: code});
    this.setState({codeNumber:code})
this.props.forgetverify(phone_number,code)
  };
     //START CONFIRM CODE HANDLER
     confirmCodeHandler2 = () => {
      const {
        codeInput,
        mobile_auth_message,
        mobile_auth_loading,
        confirmResult,
        firstInput,
        secondInput,
        thirdInput,
        fourthInput,
        phone_number
      } = this.props;
      let code = '';
      Keyboard.dismiss();
      code =
        firstInput +
        secondInput +
        thirdInput +
        fourthInput ;
      // this.props.getMobileAuthTextsValue({prop: "codeInput", value: code});
      this.setState({codeNumber:code})
  this.props.mobileAuthentication(phone_number,code)
    };
  renderRevoverPassBtn = ()=>
{
  const { lang,phone_number } = this.props;
  const { recover_password, confirm_recover_password } = this.props;

  return  <Button block style={{backgroundColor:"#003580"}} onPress={()=> this.props.recoverPasswordFunc(recover_password,confirm_recover_password,phone_number.number,strings('message.fill_message',lang),strings('login.confirm_message',lang),strings('login.password message',lang))}>
    <Text style={buttonText}>
{strings('profile.confirm_password',lang)}    </Text>
  </Button>

}
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
    render(){
        const { phone_number, password,show_modal,recover_password_email,recover_password_msg,signin_alert_message,lang,show_mobile_modal_recover_password,recover_password,confirm_recover_password,show_modal_recover,show_mobile_modal} = this.props;
        const {form_submitted}=this.state
return(
  <ImageBackground source={require('../assests/images/splash–1.png')} style={{width: dimensions.width, height: "100%"}}>
  
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
  <Content
    ref={ref => {
      this._Content = ref;
    }}
  >


<CardItem style={[transparentBackground,{marginTop:20}]}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                    {strings('travelinsurance.phone_number',lang)} {form_submitted && phone_number.number == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <PhoneInput  ref={(ref) => { this.phone = ref; }}
block
                    initialCountry='jo'
                    style={[phoneInputStyle,{borderBottomColor:form_submitted && phone_number.number == ""? "red": "#171717",borderBottomWidth:form_submitted && phone_number.number== "" ? 2 : 0}]}
                    value ={phone_number.number}
                    flagStyle={{marginLeft:10,height:30,width:40,flex:0.2}}
                    textStyle={{fontSize:18}}
                    onSelectCountry ={(country) => this.selectCountry(country)}
                    onChangePhoneNumber= {(number)=> this.changePhoneNumber(number)}
                    isValidNumber
                    
                  /> 
                  </View>
                </Item>
              </CardItem>




            <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings('signin.password',lang)}{form_submitted && password == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <Input
                  color="#fff"
                  onChangeText={value =>this.props.getUserText({prop:'password',value})}
                  value ={password}
                  placeholderTextColor="gray"
                  // placeholder ={strings('signin.password',lang)}
                  placeholderStyle={{fontFamily:'TajawalRegular0',fontSize:30}}
                  secureTextEntry={this.state.hidePassword}
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign: lang == "ar" ? "right" : "left",borderBottomColor:form_submitted && password == ""? "red": "#171717",borderBottomWidth:form_submitted && password== "" ? 2 : 0}]}
                />
                       <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute',height: 40,width: 35,padding: 5,marginTop:40,marginLeft:lang=='en'?300:null}} onPress={this.managePasswordVisibility}>
                  <Image source={(this.state.hidePassword) ? require('../assests/images/hideeye.png') : require('../assests/images/eye.png')} style={{resizeMode:'contain',height: '70%',width: '70%'}} />
                </TouchableOpacity>
                  </View>
                </Item>
              </CardItem>


          
            <View style={{marginRight:lang=='ar'?30:null,marginLeft:lang=='en'?30:null}}>
          
<TouchableOpacity onPress={this.openForgetPasswordModal}>
                <Text style={{fontSize:13,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBold0'}}> {strings('signin.forget_password',lang)}</Text>
                </TouchableOpacity>
            </View>
            <CardItem style={transparentBackground}>
         <Body style={centerStyle}>
         { this.showSubmitButton() }
         </Body>
            </CardItem>
            <CardItem style={transparentBackground}>
                <Body style={centerStyle}>
                    <Text style={{fontSize:15,fontFamily:'TajawalMedium0',lineHeight:20}}>{strings('login.or',lang)}</Text>
                </Body>
            </CardItem>
            <CardItem style={transparentBackground}>
         <Body style={centerStyle}>
         <TouchableOpacity onPress={() => Actions.signup()}>
         
            <Text style={[touchableOpacityText,{lineHeight:20}]}>{strings('login.signup_button_new',lang)}</Text>
         
          </TouchableOpacity> 

        
           </Body>
                           
        </CardItem>
        <Modal
            visible={show_modal}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showRecoverPasswordModal(!show_modal)
            }
            supportedOrientations={[
              "portrait",
              "portrait-upside-down",
              "landscape",
              "landscape-left",
              "landscape-right"
            ]}
            transparent
          >
        
              <View style={{backgroundColor:'rgba(0,0,0,0.50)',position:'relative',flex:1,justifyContent:'center'}}>
                <View style={{  borderWidth:1,borderRadius:5,borderColor:'#e3e3e3',padding:0,backgroundColor:'#F7F9F9',marginLeft:15,marginRight:15}}>
                <TouchableWithoutFeedback onPress={() => this.props.showRecoverPasswordModal(!show_modal)}>
                <CardItem>
                <Left>
                <Icon style={{color:'#003580',fontSize:25}} name="md-close"  onPress={() => this.props.showRecoverPasswordModal(!show_modal)} />
            </Left>
                </CardItem>
                </TouchableWithoutFeedback>
                  <ListItem style={{marginTop:10,alignSelf:"center",borderBottomWidth: 0}}>
                    <Text style={{color:"#25579A",fontSize:22,fontFamily:'TajawalMedium0',}}>
                  {strings('signin.recover_password',lang)}
                  </Text>
                  </ListItem>
                  <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
        
              <Item style={transparentBorder}>
           

<PhoneInput  ref={(ref) => { this.phone = ref; }}
                    style={{borderRadius:5,marginBottom:5,backgroundColor:"#fff",textAlign:"right",width:300,height:45}}
                    initialCountry='jo'
                    value ={phone_number.number}
                    flagStyle={{marginLeft:10,height:30,width:40,flex:0.2}}
                    textStyle={{fontSize:18}}
                    onSelectCountry ={(country) => this.selectCountry(country)}
                    onChangePhoneNumber= {(number)=> this.changePhoneNumber(number)}
                    isValidNumber
                    
                  /> 

              </Item>
                      {recover_password_msg ? (
                        recover_password_msg.isError ? (
                          <Item error>
                            {/* <Icon name="close-circle" style={{fontSize: 20}} /> */}
                            <Text style={{color: "red", fontSize: 15,fontFamily:'TajawalMedium0',}}>
                              <Text style={{fontFamily:'TajawalMedium0',}}>{recover_password_msg.msg}</Text>
                            </Text>
                          </Item>
                        ) : null
                      ) : null}
                    </Body>
                  </ListItem>

                  <ListItem style={{borderBottomWidth: 0}}>
                    <Body>{this.renderRecoverPasswordBtn()}</Body>
                  </ListItem>
                </View>
              </View>
          </Modal>
          <Modal
            visible={show_mobile_modal_recover_password}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showMobileCodeModalRecoverPassword(!show_mobile_modal_recover_password)
            }
            supportedOrientations={[
              "portrait",
              "portrait-upside-down",
              "landscape",
              "landscape-left",
              "landscape-right"
            ]}
            transparent
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.showMobileCodeModalRecoverPassword(!show_mobile_modal_recover_password)}
            >
              <View style={{backgroundColor:'rgba(0,0,0,0.50)',position:'relative',flex:1,justifyContent:'center'}}>
                <View style={{  borderWidth:1,borderRadius:5,borderColor:'#e3e3e3',padding:0,backgroundColor:'#F7F9F9',marginLeft:15,marginRight:15}}>
                  <ListItem style={{marginTop:10,alignSelf:"center",borderBottomWidth: 0}}>
                  <Text style={{color:"#003580"}}>Enter Your SMS One Time Password (OTP)</Text>
                  </ListItem>
                  <CardItem style={{backgroundColor:"#fff",alignSelf:"center"}}>
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0', borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._firstVI = ref}}onChangeText ={(value) => this.verificationInputsHandler(value,'first')} />
              <Input keyboardType='numeric' style={{ fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._secondVI = ref}} onChangeText ={(value) => this.verificationInputsHandler(value,'second')}/>
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._thirdVI = ref}}  onChangeText ={(value) => this.verificationInputsHandler(value,'third')}  />
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1}  ref={(ref)=>{this._fourthVI = ref}} onChangeText ={(value) => this.verificationInputsHandler(value,'fourth')}/>
            </CardItem>
            <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
                    <Button
          block
          style={blueBackgroundColor}
          onPress={this.confirmCodeHandler}
        >
          <Text style={{color: "#fff",textAlign:"center"}}>
{strings('signup.verify',lang)}          </Text>
        </Button>
                    </Body>
                  </ListItem>
                  
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
          animationType={"slide"}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          transparent={false}
          visible={show_modal_recover}
          onRequestClose={() =>this.props.recoverPasswordModal(!show_modal_recover)}>
              <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height:'100%'}}>

          <Content>
            <View style={{  marginTop: 22,flex: 1,padding: 10,backgroundColor: "transparent",justifyContent:'space-between',flexDirection:'column'}}>
            <TouchableWithoutFeedback onPress={() =>this.props.recoverPasswordModal(!show_modal_recover)}>
              <View style={{marginLeft:10}}>
                <Icon style={{color: '#003580',fontSize:25,alignSelf:'flex-start'}} onPress={() =>this.props.recoverPasswordModal(!show_modal_recover)} name="md-close" />
              </View>
              </TouchableWithoutFeedback>
              <CardItem style={{marginTop:50,alignSelf:"center",backgroundColor:"transparent"}}>
                <Text style={{  color:"#003580",fontSize:22,fontFamily:'TajawalBold0'}}>{strings('profile.reset_password',lang)}</Text>
              </CardItem>


              <CardItem style={transparentBackground}>
                <Item>
                  <Input
                    color="#fff"
                    onChangeText={value =>this.props.getUserText({prop:'recover_password',value})}
                    value ={recover_password}
                    placeholder ={strings('profile.new_password',lang)}
                    placeholderTextColor="#9B9B9B"
                    secureTextEntry
                    style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}
                  />
                </Item>
              </CardItem>
              <CardItem style={transparentBackground}>
                <Item>
                  <Input
                    color="#fff"
                    onChangeText={value =>this.props.getUserText({prop:'confirm_recover_password',value})}
                    value ={confirm_recover_password}
                    placeholder ={strings('profile.confirm_password_new',lang)}
                    placeholderTextColor="#9B9B9B"
                    secureTextEntry
                    style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}
                  />
                  
                </Item>
              </CardItem>
              <CardItem style={transparentBackground}>
                <Body>
                  {this.renderRevoverPassBtn()}
                </Body>
              </CardItem>

              <CardItem style={{alignSelf:"center",backgroundColor:"transparent"}}>
                {this.renderErrorMsg()}
              </CardItem>
            </View>
          </Content>
          </ImageBackground>
        </Modal>
        <Modal
            visible={show_mobile_modal}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showMobileCodeModal(!show_mobile_modal)
            }
            supportedOrientations={[
              "portrait",
              "portrait-upside-down",
              "landscape",
              "landscape-left",
              "landscape-right"
            ]}
            transparent
          >
            {/* <TouchableWithoutFeedback
              onPress={() => this.props.showMobileCodeModal(!show_mobile_modal)}
            > */}
             
              <View style={{backgroundColor:'rgba(0,0,0,0.50)',position:'relative',flex:1,justifyContent:'center'}}>
                <View style={{  borderWidth:1,borderRadius:5,borderColor:'#e3e3e3',padding:0,backgroundColor:'#F7F9F9',marginLeft:15,marginRight:15}}>
                <View style={{marginLeft: 10}}>
                      <Icon
                        style={{
                          color: "#003580",
                          fontSize: 25,
                          alignSelf: "flex-start"
                        }}
                        onPress={() => this.props.showMobileCodeModal(!show_mobile_modal)}
                        name="md-close"
                      />
                    </View>
                  <ListItem style={{marginTop:10,alignSelf:"center",borderBottomWidth: 0}}>
                  <Text style={{color:"#003580"}}>Enter Your SMS One Time Password (OTP)</Text>
                  </ListItem>
                  <CardItem style={{backgroundColor:"#fff",alignSelf:"center"}}>
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0', borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._firstVI = ref}}onChangeText ={(value) => this.verificationInputsHandler2(value,'first')} />
              <Input keyboardType='numeric' style={{ fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._secondVI = ref}} onChangeText ={(value) => this.verificationInputsHandler2(value,'second')}/>
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1} ref={(ref)=>{this._thirdVI = ref}}  onChangeText ={(value) => this.verificationInputsHandler2(value,'third')}  />
              <Input keyboardType='numeric' style={{fontFamily:'TajawalRegular0',borderBottomWidth:1,borderColor:'#003580',marginRight:10,marginLeft:10,color:'#003580',textAlign:'center',fontWeight:'bold',fontSize:22}} maxLength={1}  ref={(ref)=>{this._fourthVI = ref}} onChangeText ={(value) => this.verificationInputsHandler2(value,'fourth')}/>
            </CardItem>
            <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
                    <Button
          block
          style={blueBackgroundColor}
          onPress={this.confirmCodeHandler2}
        >
          <Text style={{color: "#fff",textAlign:"center"}}>
{strings('signup.verify',lang)}          </Text>
        </Button>
                    </Body>
                  </ListItem>
                  
                </View>
              </View>
            {/* </TouchableWithoutFeedback> */}
          </Modal>
       </Content>

       <Text>{this.showAlert()}</Text>
  
       <DropdownAlert replaceEnabled={true}  titleStyle={{textAlign:lang=='ar'? 'right':'left',fontFamily:'TajawalBold0',color:"#fff"}} messageStyle={{textAlign:lang=='ar'?'right':'left',fontFamily:'TajawalBold0',color:"#fff"}}imageStyle={{direction:'rtl'}} ref={(ref) => this.dropdown = ref}  />    
        </Drawer>
</ImageBackground>

)
    }
}
const styles = StyleSheet.create({
    ImageBackgroundStyle: {
        width:dimensions.width,
        height:dimensions.height
    }
  });

  const drawerStyles = {
    drawer: {shadowOpacity: 0, elevation: 0},
    main: {shadowOpacity: 0, elevation: 0}
  };
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
    const { password, phone_number, start_loading_of, signin_alert_message,show_modal,recover_password_email,recover_password_msg,show_mobile_modal_recover_password, firstInputRecover,secondInputRecover,thirdInputRecover,fourthInputRecover,recover_password,confirm_recover_password,show_modal_recover,recover_msg,show_mobile_modal} = state.authReducer;
    return { password, phone_number, start_loading_of, signin_alert_message,show_modal,recover_password_email,recover_password_msg,lang,show_mobile_modal_recover_password, firstInputRecover,secondInputRecover,thirdInputRecover,fourthInputRecover,recover_password,confirm_recover_password,show_modal_recover,recover_msg,show_mobile_modal};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,authAction)(Login);