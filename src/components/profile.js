import React,{Component} from 'react';
import  {Image,ImageBackground,Dimensions,Text,TouchableOpacity,TouchableWithoutFeedback,View,Modal,Keyboard,StatusBar} from 'react-native';
import {Body,CardItem,Button,Item,Input,Left,Right,ListItem,Content,Picker,Icon,Drawer} from 'native-base';
import {Spinner} from "./common/Spinner";
import PhoneInput from 'react-native-phone-input';
import DropdownAlert from 'react-native-dropdownalert';
import * as profileAction from "../actions/profileAction";
import { connect } from 'react-redux';
import {buttonStyle,buttonText,inputStyle,transparentBackground,transparentBorder,phoneInputStyle,centerStyle,touchableOpacityText,pickerStyle} from '../theme';
const dimensions=Dimensions.get('window');
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      hidePassword:true,
      hideConfirmPassword:true
    }

  }
  componentWillMount() {
    this.props.getProfileInfo();
  }

  componentDidUpdate(){
    const { profileInfo, profile_msg,customerInfo } = this.props;
    const { customers_firstname, customers_lastname, customers_telephone,customers_id } = profileInfo;
     if (profile_msg != null && !profile_msg.isChangePass) {
         this.props.resetProfileMessage();
     }
     if (Object.keys(profileInfo).length > 0) {
       var d={
         code:1,
         number:customerInfo[0].customers_telephone
       }
        this.props.getProfileText({prop:'first_name',value:customerInfo[0].customers_firstname});
        this.props.getProfileText({prop:'last_name',value:customerInfo[0].customers_lastname});
        this.props.getProfileText({prop:'email',value:customerInfo[0].email});
        this.props.getProfileText({prop:'user_id',value:customers_id});
        this.props.getProfileText({prop:'phone_number',value:d});
        this.props.getProfileText({prop:'profileInfo',value:{}});
     }
  }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
 //START UPDATE PROFILE INFORMATION
updateProfileInfomation = ()=>
{
  const { first_name, last_name, user_id,email } = this.props;
 const data = {
    'customers_firstname': first_name,
    'customers_lastname': last_name,
    'customers_id':user_id,
    "email":email
    // 'customers_telephone': phone_number.number
  };

  this.props.updateProfileInfo(data);
}
//END UPDATE PROFILE INFORMATION
    
      //START DROPDOWN MESSAGES
      onError = error => {
        if (error) {

          
          this.dropdown.alertWithType("error", "Error", error);
        }
      };
    
      onSuccess = success => {

        if (success) {
          this.dropdown.alertWithType("success", "Success", success);
        }
      };
      //END DROPDOWN MESSAGES
    
 //START SHOW ALERT FUNC
 showAlert = () =>
   {
       const { profile_msg } = this.props;
        if (profile_msg != null && !profile_msg.isChangePass) {
          if (profile_msg.isError) {
            this.onError(profile_msg.msg);
          }
          else if(profile_msg.isSuccess)
          {
            this.onSuccess(profile_msg.msg);
          }
          else {
            return ;
          }
        }
     }

 //END SHOW ALERT FUNC
 managePasswordVisibility=()=>{
  this.setState({hidePassword: !this.state.hidePassword});
}
manageConfirmPasswordVisibility=()=>{
  this.setState({hideConfirmPassword: !this.state.hideConfirmPassword});
}
    
    
      //START RENDER SUBMIT BUTTON
      showSubmitButton() {
        const { start_loading_of,lang } = this.props;

        if (start_loading_of.update_profile_Btn) {
         return <Button block style={{backgroundColor: '#003580'}} >
           <Spinner size="large" />
         </Button>
        }

        return (
          
          <Button style={buttonStyle} block  onPress={this.updateProfileInfomation}>
          <Text style={buttonText}>{strings('profile.save_changes',lang)}</Text>
        
        </Button>
       
        
        );
      }
      //END RENDER SUBMIT BUTTON

        // START SELECT A PHONE COUNTRY
     selectCountry(country){
      const country_code  = this.phone.getCountryCode();
      this.props.getProfileText({prop:'phone_number',value:{
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
   
       this.props.getProfileText({prop:'phone_number',value:{
         code:country_code,
         number:phone_number.number
       }});
     }
     else {
       this.props.getProfileText({prop:'phone_number',value:{
         code:'',
         number:phone_number.number
       }});
     }
 const num = number;
     this.props.getProfileText({prop:'phone_number',value:{
       code:phone_number.code,
       number:num
     }});
 
   };
 //START ERROR MESSAGE
renderErrorMsg = ()=>
{
  const { profile_msg } = this.props;

   if (profile_msg != null) {
     if (profile_msg.isError) {
       return <View style={{padding:10,height:'auto',backgroundColor:'#FF3333',borderRadius:5,borderWidth:1,borderColor:'red',flexDirection:'row'}}>
         <Icon name="md-alert" style={{color:'#fff',fontSize:30,flex:1}} />
         <Text style={{color:'#fff',fontWeight:'bold',justifyContent:'flex-start',textAlign:'left',marginLeft:0,flex:5}}>{profile_msg.msg}</Text>
       </View>
     }
     else {
       return <View style={{padding:5,paddingRight:10,paddingLeft:10,height:'auto',backgroundColor:'green',borderRadius:5,flexDirection:'row'}}>
         <Icon name="md-checkmark-circle" style={{color:'#fff',fontSize:30,flex:1}} />
         <Text style={{color:'#fff',fontWeight:'bold',justifyContent:'flex-start',textAlign:'left',marginLeft:0,flex:5}}>{profile_msg.msg}</Text>
       </View>
     }
   }
    return null;
}
//END ERROR MESSAGES
 //START CHANGE PASSWORD BUTTON
renderChangePassBtn = ()=>
{
  const { start_loading_of,user_id,lang } = this.props;
  const { currentPassword, newPassword, confirmPassword,phone_number } = this.props;
  if (start_loading_of.reset_pass_btn) {
    return <Button block style={{backgroundColor:"#003580"}} >
      <Spinner size="large" />
    </Button>
  }
  return  <Button block style={{backgroundColor:"#003580"}} onPress={()=> this.props.changePassword(currentPassword,newPassword,confirmPassword,user_id,phone_number.number,strings('message.fill_message',lang),strings('login.confirm_message',lang),strings('login.password message',lang))}>
    <Text style={buttonText}>
{strings('profile.confirm_password',lang)}    </Text>
  </Button>

}
//END CHANGE PASSWORD BUTTON
//START CHANGE PASSWORD MODAL
openChangePasswordModal = ()=>
{
  const { modalShow, currentPassword, newPassword, confirmPassword } = this.props;
  if (currentPassword != '' && newPassword != '' && confirmPassword != '') {
   this.props.getProfileText({prop:'currentPassword',value:''});
   this.props.getProfileText({prop:'newPassword',value:''});
   this.props.getProfileText({prop:'confirmPassword',value:''});
  }
  this.props.showResetPasswordModal(!modalShow);
}
//END CHANGE PASSWORD MODAL
    render(){
      const { first_name, last_name, phone_number,currentPassword,newPassword,confirmPassword,modalShow,lang,email} = this.props;




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
  >
    <CardItem style={transparentBackground}>
              <Item style={transparentBorder}> 
              <Input 
              value={first_name} onChangeText={(value)=>this.props.getProfileText({prop:'first_name',value})}  placeholder ={strings('signup.first_name',lang)} placeholderTextColor="#9B9B9B" style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}autoCorrect={false} />          
              </Item>
              </CardItem>
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}> 
              <Input value={last_name} onChangeText={(value)=>this.props.getProfileText({prop:'last_name',value})}  placeholder ={strings('signup.last_name',lang)} placeholderTextColor="#9B9B9B" style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}autoCorrect={false} />      
              </Item>
            </CardItem>
         
            <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
              <PhoneInput  ref={(ref) => { this.phone = ref; }}
                    initialCountry="jo"
                    style={phoneInputStyle}
                    value ={phone_number.number}
                    flagStyle={{marginLeft:10,height:30,width:40,flex:0.2}}
                    textStyle={{fontSize:18}}
                    onSelectCountry ={(country) => this.selectCountry(country)}
                    onChangePhoneNumber= {(number)=> this.changePhoneNumber(number)}
                    isValidNumber
                    
                  /> 
        
              </Item>
            </CardItem>

            <CardItem style={transparentBackground}>
         <Item style={transparentBorder}> 
                 <Input
           color="#fff"
           value ={email}
           placeholder ={strings('help.email',lang)}
           placeholderTextColor="#9B9B9B"
           style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}]}
           onChangeText={value =>this.props.getProfileText({prop:"email",value})}
          />
         </Item>
        </CardItem>

            <CardItem style={transparentBackground}>
         <Body style={centerStyle}>
         {this.showSubmitButton()}

         </Body>
            </CardItem> 
        
            <View style={{marginRight:30}}>
<TouchableOpacity onPress={this.openChangePasswordModal}>
                <Text style={{fontSize:10,textAlign:"right",color:"#171717",fontFamily:'TajawalBold0'}}>{strings('profile.change_password',lang)}</Text>
                </TouchableOpacity>
            </View>
            <Modal
          animationType={"slide"}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          transparent={false}
          visible={modalShow}
          onRequestClose={() =>this.props.showResetPasswordModal(!modalShow)}>
              <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height:'100%'}}>

          <Content>
            <View style={{  marginTop: 22,flex: 1,padding: 10,backgroundColor: "transparent",justifyContent:'space-between',flexDirection:'column'}}>
            <TouchableWithoutFeedback onPress={() =>this.props.showResetPasswordModal(!modalShow)}>
              <View style={{marginLeft:10}}>
                <Icon style={{color: '#003580',fontSize:25,alignSelf:'flex-start'}} onPress={() =>this.props.showResetPasswordModal(!modalShow)} name="md-close" />
              </View>
              </TouchableWithoutFeedback>
              <CardItem style={{marginTop:50,alignSelf:"center",backgroundColor:"transparent"}}>
                <Text style={{  color:"#003580",fontSize:22,fontFamily:'TajawalBold0'}}>{strings('profile.reset_password',lang)}</Text>
              </CardItem>


              <CardItem style={{marginTop:10,backgroundColor:"transparent"}}>
                <Item >
                  <Input
                    color="#fff"
                    onChangeText={value =>this.props.getProfileText({prop:'currentPassword',value})}
                    value ={currentPassword}
                    placeholder ={strings('profile.current_password',lang)}
                    placeholderTextColor="#9B9B9B"
                    style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}
                  />
                </Item>
              </CardItem>

              <CardItem style={transparentBackground}>
                <Item>
                  <Input
                    color="#fff"
                    onChangeText={value =>this.props.getProfileText({prop:'newPassword',value})}
                    value ={newPassword}
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
                    onChangeText={value =>this.props.getProfileText({prop:'confirmPassword',value})}
                    value ={confirmPassword}
                    placeholder ={strings('profile.confirm_password',lang)}
                    placeholderTextColor="#9B9B9B"
                    secureTextEntry
                    style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left"}]}
                  />
                  
                </Item>
              </CardItem>
      
         
              <CardItem style={transparentBackground}>
                <Body>
                  {this.renderChangePassBtn()}
                </Body>
              </CardItem>

              <CardItem style={{alignSelf:"center",backgroundColor:"transparent"}}>
                {this.renderErrorMsg()}
              </CardItem>
            </View>
          </Content>
          </ImageBackground>
        </Modal>
          </Content>
        <Text>{this.showAlert()}</Text>

        <DropdownAlert ref={ref => (this.dropdown = ref)} style={{fontFamily:'TajawalRegular0'}}/>
</Drawer>
    </ImageBackground>

)
    }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const {customerInfo}=state.homeReducer;
  const { profileInfo, first_name, last_name, email, phone_number,user_id, profile_msg, start_loading_of,currentPassword,newPassword,confirmPassword,modalShow } = state.profileReducer;
  return { profileInfo, first_name, last_name, email, phone_number,user_id, profile_msg, start_loading_of,currentPassword,newPassword,confirmPassword,modalShow,lang,customerInfo};
};
// END MAP STATE TO PROPS

export default connect(mapStateToProps, profileAction)(Profile);