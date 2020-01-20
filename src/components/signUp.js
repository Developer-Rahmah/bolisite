import React,{Component} from 'react';
import  {Image,ImageBackground,Dimensions,Text,TouchableOpacity,TouchableWithoutFeedback,View,Modal,Keyboard,StatusBar,WebView} from 'react-native';
import {Body,CardItem,Button,Item,Input,Left,Right,ListItem,Content,Picker,Icon,Drawer,Label} from 'native-base';
import {Spinner} from "./common/Spinner";
import PhoneInput from 'react-native-phone-input';
import DropdownAlert from 'react-native-dropdownalert';
import * as authAction from '../actions/authAction';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import {inputNameStyle} from '../assests/styles/signUpStyles';
import {blueBackgroundColor,buttonStyle,buttonText,cardItemWithMargin,inputStyle,transparentBackground,transparentBorder,phoneInputStyle,centerStyle,touchableOpacityText,pickerStyle,labelStyle} from '../theme';
const dimensions=Dimensions.get('window');
import {strings} from '../../Locales/i18n';
import Header from './AuthHeader'
import SideBar from "./sideBar";
class SignUp extends Component{
  constructor(props){
    super(props);
    this.state ={
      hidePassword:true,
      hideConfirmPassword:true,
      codeNumber:'',
      form_submitted:false
    }

  }
      componentDidUpdate() {
        const {signup_alert_message} = this.props;

        if (signup_alert_message != null) {
          setTimeout(() => this.props.resetAuthMessage(), 250);
        }
     

      }
    
      //START SIGN UP SUBMITTION
      handleSignUp = () => {
        
this.setState({form_submitted:true})
        const {first_name, last_name, password,phone_number,country,confirm_password,lang,email} = this.props;
        this.props.signupUser(first_name, last_name,  password,phone_number,confirm_password,email,strings('message.fill_message',lang),strings('login.confirm_message',lang),strings('message.email_not_valid',lang),strings('login.password message',lang));
      };
      //END SIGN UP SUBMITTION
    
      //START DROPDOWN MESSAGES
      onError = error => {
        const {lang}=this.props
        if (error) {

          
          this.dropdown.alertWithType("error", strings('message.error',lang), error);
        }
      };
    
      onSuccess = success => {
        const {lang}=this.props


        if (success) {
          this.dropdown.alertWithType("success", strings('message.success',lang), success);
        }
      };
      //END DROPDOWN MESSAGES
    
      //START SHOW ALERT FUNC
      showAlert = () => {
        const {signup_alert_message} = this.props;
        if (signup_alert_message != null) {
          if (signup_alert_message.isError) {
            this.onError(signup_alert_message.msg);
          } else if (signup_alert_message.isSuccess) {
            this.onSuccess(signup_alert_message.msg);
          } else {
            return;
          }
        }
      };
      //END SHOW ALERT FUNC
    
    
      //START VERVICATION INPUT
  verificationInputsHandler = (value, key) => {

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
  //END VERVICATION INPUT
      //START RENDER SUBMIT BUTTON
      showSubmitButton() {
        const {start_loading_of,lang}=this.props;
        if (start_loading_of.signup_loading) {
          return (
          
                <Button block style={blueBackgroundColor}>
                  <Spinner size="large" />
                </Button>
           
          );
        }

        return (
          
          <Button style={buttonStyle} block onPress={this.handleSignUp}>
          <Text style={buttonText}>{strings('login.signup_button',lang)}</Text>
        
        </Button>
       
        
        );
      }
      //END RENDER SUBMIT BUTTON

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
     //START CONFIRM CODE HANDLER
  confirmCodeHandler = () => {
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
  //END CONFIRM CODE HANDLER
    // END CHANGING A PHONE NUMBER FUNC
    managePasswordVisibility=()=>{
      this.setState({hidePassword: !this.state.hidePassword});
    }
    manageConfirmPasswordVisibility=()=>{
      this.setState({hideConfirmPassword: !this.state.hideConfirmPassword});
    }
    closeDrawer = () => {
      this.drawer._root.close();
  
    };
    resendCode = () => {
      const {phone_number} = this.props;
      this.props.resendCode(phone_number);
    };
    renderResendCodeBtn = () => {
      const {start_loading_of,lang} = this.props;
      // if (start_loading_of.recover_loading) {
      //   return (
      //     <Button block style={[blueBackgroundColor,{fontFamily:'TajawalMedium0',}]}>
      //       <Spinner size="large" />
      //     </Button>
      //   );
      // }
      return (
        <Button
          block
          style={[blueBackgroundColor,{fontFamily:'TajawalMedium0',}]}
          onPress={this.resendCode}
        >
          <Text style={{color: "#fff",textAlign:"center",fontFamily:'TajawalMedium0',}}>
{strings('payment.send',lang)}          </Text>
        </Button>
      );
    };
  
    openDrawer = () => {
      
      this.drawer._root.open();
      setTimeout(() => Keyboard.dismiss());
    };
    render(){
      const {password, first_name, last_name,phone_number,country,confirm_password,show_mobile_modal,lang,email,show_resend_code} = this.props;
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

           <Header
                       openDrawer={this.openDrawer}
                       closeDrawer={this.closeDrawer}
           /> 
 
            <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
      <Content
    ref={ref => {
      this._Content = ref;
    }}
    disableKBDismissScroll={true}
  >
    <CardItem style={{  backgroundColor:"transparent",marginTop:15}}>
    {lang=='ar'?
  
  
              <Item style={{borderColor: "transparent",display:'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
             
           


<View style={{flexDirection: "column", width: "50%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                 {strings('signup.last_name',lang)}{form_submitted && last_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <Input
                  color="#000"
                  // placeholder={strings('signup.last_name',lang)}
                  onChangeText={value =>
                    this.props.getUserText({prop: "last_name", value})
                  }
                  placeholderTextColor="gray"
              
                  value={last_name}
                  style={[inputNameStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && last_name == ""? "red": "#171717",borderBottomWidth:form_submitted && last_name== "" ? 2 : 0}]}
                />
                  </View>

         


<View style={{flexDirection: "column", width: "50%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                {strings('signup.first_name',lang)}{form_submitted && first_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <Input
                  color="#000"
                  // placeholder={strings('signup.first_name',lang)}
                  onChangeText={value =>
                    this.props.getUserText({prop: "first_name", value})
                  }
                  placeholderTextColor="gray"
  
                  value={first_name}
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left",borderBottomColor:form_submitted && first_name == ""? "red": "#171717",borderBottomWidth:form_submitted && first_name== "" ? 2 : 0}]}
                />
                  </View>
              </Item>
             :
             <Item style={{borderColor: "transparent",display:'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
             
           
  
             
             <View style={{flexDirection: "column", width: "47%"}}>
                                 <Label
                                   style={[
                                     labelStyle,
                                     {
                                       textAlign: lang == "ar" ? "right" : "left",
                                       color: "#171717"
                                     }
                                   ]}
                                 >
                             {strings('signup.first_name',lang)}{form_submitted && first_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                                 </Label>
                                 <Input
                               color="#000"
                               // placeholder={strings('signup.first_name',lang)}
                               onChangeText={value =>
                                 this.props.getUserText({prop: "first_name", value})
                               }
                               placeholderTextColor="gray"
               
                               value={first_name}
                               style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left",borderBottomColor:form_submitted && first_name == ""? "red": "#171717",borderBottomWidth:form_submitted && first_name== "" ? 2 : 0}]}
                             />
                               </View>

             <View style={{flexDirection: "column", width: "52%",marginLeft:10}}>
                                 <Label
                                   style={[
                                     labelStyle,
                                     {
                                       textAlign: lang == "ar" ? "right" : "left",
                                       color: "#171717"
                                     }
                                   ]}
                                 >
                              {strings('signup.last_name',lang)}{form_submitted && last_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                                 </Label>
                                 <Input
                               color="#000"
                               // placeholder={strings('signup.last_name',lang)}
                               onChangeText={value =>
                                 this.props.getUserText({prop: "last_name", value})
                               }
                               placeholderTextColor="gray"
                           
                               value={last_name}
                               style={[inputNameStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && last_name == ""? "red": "#171717",borderBottomWidth:form_submitted && last_name== "" ? 2 : 0}]}
                             />
                               </View>
             
                      
           
                           </Item>
                }
            </CardItem>
            <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('help.email',lang)}</Label>
                   <Input
                     color="#fff"
                     value ={email}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}]}
                     onChangeText={value =>this.props.getUserText({prop:"email",value})}
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
                     {strings('signup.choose_country',lang)}
                    </Label>
                    <Picker
                      mode="dropdown"
                      // iosHeader={strings('signup.choose_country',lang)}
                      // placeholder={strings('signup.choose_country',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={
                        form_submitted && country == ""
                          ? "red"
                          : "gray"
                      }
                      style={[pickerStyle,{direction: lang == "ar" ? "rtl" : "ltr",}]}
                      selectedValue={country}
                      default="الاردن"
                      onValueChange={value =>
                        this.props.getUserText({
                          prop: "country",
                          value
                        })
                      }
                     >
                     <Picker.Item label={strings('signup.jordan',lang)} value="1" style={{fontFamily:'TajawalRegular0'}} />
                     <Picker.Item label={strings('signup.sudia',lang)} value="2" style={{fontFamily:'TajawalRegular0'}} />
                     <Picker.Item label={strings('signup.uae',lang)} value="3" style={{fontFamily:'TajawalRegular0'}}/>
                     <Picker.Item label={strings('signup.qatar',lang)}value="4" style={{fontFamily:'TajawalRegular0'}} />
                    </Picker>
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
                    {strings('travelinsurance.phone_number',lang)} {form_submitted && phone_number.number == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <PhoneInput  ref={(ref) => { this.phone = ref; }}
                    initialCountry="jo"
                    style={[phoneInputStyle,{borderBottomColor:form_submitted && phone_number.number == ""? "red": "#171717",borderBottomWidth:form_submitted && phone_number.number== "" ? 2 : 0}]}
                    value =""
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
                  onChangeText={value =>
                    this.props.getUserText({prop: "password", value})
                  }
                  value ={password}
                  placeholderTextColor= "gray"
                  
                  // placeholder ={strings('signin.password',lang)}
                  secureTextEntry={this.state.hidePassword}
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left",borderBottomColor:form_submitted && password == ""? "red": "#171717",borderBottomWidth:form_submitted && password== "" ? 2 : 0}]}
                />
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute',height: 40,width: 35,padding: 5,marginTop:43,marginLeft:lang=='en'?300:null}} onPress={this.managePasswordVisibility}>
                  <Image source={(this.state.hidePassword) ? require('../assests/images/hideeye.png') : require('../assests/images/eye.png')} style={{resizeMode:'contain',height: '70%',width: '70%'}} />
                </TouchableOpacity>
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
                    {strings('signup.confirm_password',lang)}{form_submitted && confirm_password == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                    <Input
                  color="#fff"
                  onChangeText={value =>
                    this.props.getUserText({prop: "confirm_password", value})
                  }
                  placeholderTextColor= "gray"
                  
                  value ={confirm_password}
                  // placeholder ={strings('signup.confirm_password',lang)}
                  secureTextEntry={this.state.hideConfirmPassword}
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left",borderBottomColor:form_submitted && confirm_password == ""? "red": "#171717",borderBottomWidth:form_submitted && confirm_password== "" ? 2 : 0}]}
                />
                                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute',height: 40,width: 35,padding: 5,marginTop:43,marginLeft:lang=='en'?300:null}} onPress={this.manageConfirmPasswordVisibility}>
                  <Image source={(this.state.hideConfirmPassword) ? require('../assests/images/hideeye.png') : require('../assests/images/eye.png')} style={{resizeMode:'contain',height: '70%',width: '70%'}} />
                </TouchableOpacity>
                  </View>
                </Item>
              </CardItem>

            <CardItem style={transparentBackground}>
 
           {lang=="ar"?
           <Text style={{textAlign:"right"}}>
                            <Text style={{
                                fontFamily: 'TajawalMedium0', fontSize: 14,
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>بالضغط على زر انشاء حساب أوافق على </Text>
                            <Text onPress={()=>Actions.useragreemnet()} style={{
                                color: "#003580", textDecorationLine: 'underline', fontFamily: 'TajawalMedium0', fontSize: 14,
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>اتفاقية المستخدم </Text>
                             <Text style={{
                                fontFamily: 'TajawalMedium0', fontSize: 14,
                          
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>و </Text>
   <Text  onPress={()=>Actions.privacy()}  style={{
                                color: "#003580", textDecorationLine: 'underline', fontFamily: 'TajawalMedium0', fontSize: 14,
                                textAlign:"right",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>سياسة الخصوصية</Text>
                        </Text>
    :
    <Text>
    <Text style={{
        fontFamily: 'TajawalMedium0', fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0,
    }}>By clicking the Sign Up button I agree </Text>
    <Text onPress={()=>Actions.useragreemnet()} style={{
        color: "#003580", textDecorationLine: 'underline', fontFamily: 'TajawalMedium0', fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0,
    }}>the User Agreement </Text>
     <Text style={{
        fontFamily: 'TajawalMedium0', fontSize: 14,
  
        lineHeight: 17,
        letterSpacing: 0,
    }}>and </Text>
<Text  onPress={()=>Actions.privacy()}  style={{
        color: "#003580", textDecorationLine: 'underline', fontFamily: 'TajawalMedium0', fontSize: 14,
     
        lineHeight: 17,
        letterSpacing: 0,
    }}>Privacy Policy</Text>
</Text>
    }
           </CardItem>
    
            <CardItem style={transparentBackground}>
         <Body style={centerStyle}>
         {this.showSubmitButton()}

         </Body>
            </CardItem>
            <CardItem style={transparentBackground}>
         <Body style={centerStyle}>
         <TouchableOpacity onPress={() => Actions.login()}>
         
            <Text style={touchableOpacityText}>{strings('signup.have_account',lang)}</Text>
         
          </TouchableOpacity> 
           </Body>
        </CardItem>
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
            {/* </TouchableWithoutFeedback> */}
          </Modal>
          <Modal
            visible={show_resend_code}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showResendCodeModal(!show_resend_code)
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
                <TouchableWithoutFeedback onPress={() => this.props.showResendCodeModal(!show_resend_code)}>
                <CardItem>
                <Left>
                <Icon style={{color:'#003580',fontSize:25}} name="md-close"  onPress={() => this.props.showResendCodeModal(!show_resend_code)} />
            </Left>
                </CardItem>
                </TouchableWithoutFeedback>
                  <ListItem style={{marginTop:10,alignSelf:"center",borderBottomWidth: 0}}>
                    <Text style={{color:"#25579A",fontSize:22,fontFamily:'TajawalMedium0',}}>
                  {strings('payment.send',lang)}
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
     
                    </Body>
                  </ListItem>

                  <ListItem style={{borderBottomWidth: 0}}>
                    <Body>{this.renderResendCodeBtn()}</Body>
                  </ListItem>
                </View>
              </View>
          </Modal>
          </Content>
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
//START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;

  const {
    password,
    start_loading_of,
    first_name,
    last_name,
    phone_number,
    confirm_password,
    country,
    signup_alert_message,firstInput,secondInput,thirdInput,fourthInput,mobile_auth_message,codeInput,
    mobile_auth_loading,
    show_mobile_modal,email,show_resend_code  } = state.authReducer;
  return {

    password,
    start_loading_of,
    first_name,
    last_name,
    phone_number,
    confirm_password,
    country,
    signup_alert_message,
    show_mobile_modal,
    lang,firstInput,secondInput,thirdInput,fourthInput,mobile_auth_message,codeInput,
    mobile_auth_loading,email,show_resend_code
  };
};
//END MAP STATE TO PROPS

export default connect(mapStateToProps, authAction)(SignUp);