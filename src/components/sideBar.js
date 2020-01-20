import React, { Component } from 'react';
import {ImageBackground,Dimensions,TouchableOpacity,View,Image,Platform} from 'react-native';
import {List,ListItem,Right,Text,Content, Card,CardItem,Body} from 'native-base';
import {transparentBackGround,transparentBorder} from '../theme';
import { signOut,isLoggIn } from "../actions/authAction";
import { connect } from 'react-redux';
import {profileNameText,homeCardItem,otherCardItemStyle,otherTextsStyle} from '../assests/styles/sideBarStyles';
import { Actions } from 'react-native-router-flux';
import {translate} from '../../Locales/i18n';
import * as sideBarAction from '../actions/sideBarAction';
import {strings} from '../../Locales/i18n';
import * as homeAction from '../actions/homeAction';
import * as privacyAction from '../actions/privacyAction'
import * as orderPageAction from '../actions/ordersPageAction';
import * as helpAction from '../actions/helpAction';

var arabic = /[\u0600-\u06FF]/;
const dimensions=Dimensions.get('window');
class SideBar extends Component{
  constructor(props){
    super(props);
    this.state ={
      lang:'',
    }

  }
 componentWillMount(){
  this.props.getInfo();

 }
  componentDidMount(){
    this.props.isLoggIn()
   
  }
  signOutHandler = () => {
    this.props.closeDrawer();
    this.props.signOut();
    Actions.firstpage()
  };
  goToSettingPage=()=>
  {
    const {user,customerInfo}=this.props;
    this.props.closeDrawer();
Actions.setting({user:user,customerInfo:customerInfo})
  }
  goToOrdersPage=()=>
  {
    const {user}=this.props;
    console.lo
    this.props.closeDrawer();
    if(user.data!=undefined){
      if(user.data[0].customers_id!=undefined){
Actions.orderspage({user_id:user.data[0].customers_id})
      }}
  }
  goToHelpPage=()=>
  {
    const {user}=this.props
    this.props.closeDrawer();
    if(user.data!=undefined){
      if(user.data[0].customers_id!=undefined){
Actions.help({user_id:user.data[0].customers_id})
      }}
  }
  goToHomePage=()=>
  {
    this.props.closeDrawer();
  this.props.resetLifeCompletely()
  this.props.resetTravelCompletely()
  this.props.resetHealthCompletely()
  this.props.resetServantCompletely()
  this.props.resetCancerCompletely()
  this.props.resetCarCompletely()
Actions.home()
  }
  goToNotificationScreen=()=>{
  const {user}=this.props;
  this.props.closeDrawer();
  if(user.data!=undefined){
    if(user.data[0].customers_id!=undefined){
Actions.NotificationScreen({user_id:user.data[0].customers_id})
    }
  }
// Actions.NotificationScreen()
  }
  //END SIGN OUT
  changelanguage=(language)=>{
    const {lang,user}=this.props
    if(language=='ar')
{

  this.setState({lang:'ar'})
 
  this.props.getLanguageText(language)
 
    this.props.closeDrawer();
      this.props.getCategories(4);
      this.props.getPrivacy(4);
      this.props.getUserAgreement(4);
      if(user.data!=undefined){
        if(user.data[0].customers_id!=undefined){
      this.props.getOrders(user.data[0].customers_id,4);
        }}

    
}
else if (language=='en'){
  // I18n.currentLocale('en');
this.setState({lang:'en'})
this.props.getLanguageText(language)

this.props.closeDrawer();
  this.props.getCategories(1);
  this.props.getPrivacy(1);
  this.props.getUserAgreement(1);
  if(user.data!=undefined){
    if(user.data[0].customers_id!=undefined){
  this.props.getOrders(user.data[0].customers_id,1);

    }}


// AsyncStorage.setItem("locale", this.state.lang);

}

translate(this.state.lang)
  }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
    render(){

      const {user,lang,customerInfo,info}=this.props;

      
        return(
            <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:300,height:'100%'}}>
                 <List>
               
                   <ListItem style={transparentBorder}></ListItem>
               
                   {customerInfo!=undefined?
                   customerInfo.length>0?
                   <View style={{backgroundColor:"transparent",borderColor:"transparent"}}>
                                      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                   <CardItem style={[transparentBackGround,{borderColor:"transparent",marginTop:40,justifyContent:'center',marginLeft:150,direction:lang=='ar'?'ltr':'rtl'}]}>
                     <Text style={{color:'#003580',fontSize:18,fontFamily:'TajawalRegular0'}}>{strings('header.hello',lang)}</Text>
                   </CardItem>
                   :

                   <CardItem style={[transparentBackGround,{borderColor:"transparent",marginTop:40,justifyContent:'center',marginLeft:150,flexDirection:"row-reverse"}]}>
                     <Text style={{color:'#003580',fontSize:18,fontFamily:'TajawalRegular0'}}>{strings('header.hello',lang)}</Text>
                   </CardItem>
                   
                                      }
                     
                      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                      customerInfo &&(!arabic.test(customerInfo[0].customers_firstname)&& !arabic.test(customerInfo[0].customers_lastname))?
                   <CardItem style={[transparentBackGround,{borderColor:"transparent", marginLeft:(customerInfo[0].customers_firstname+customerInfo[0].customers_lastname).length>=15?50:100,direction:lang=='ar'?'ltr':'rtl'}]}>

                       <Text style={profileNameText}>{customerInfo[0].customers_firstname} {customerInfo[0].customers_lastname}</Text>
                  
                   </CardItem>
                   :null
                   :
                   customerInfo &&(!arabic.test(customerInfo[0].customers_firstname)&& !arabic.test(customerInfo[0].customers_lastname))?

                   <CardItem style={[transparentBackGround,{borderColor:"transparent", marginLeft:100,flexDirection:"row-reverse"}]}>

                   <Text style={profileNameText}>{customerInfo[0].customers_firstname} {customerInfo[0].customers_lastname}</Text>
              
               </CardItem>
               :null
                                    }
                      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                      customerInfo&&(arabic.test(customerInfo[0].customers_firstname)||arabic.test(customerInfo[0].customers_lastname))?
                   <CardItem style={[transparentBackGround,{borderColor:"transparent",justifyContent:'center',marginLeft:(customerInfo[0].customers_firstname+customerInfo[0].customers_lastname).length>=10?null:100,direction:lang=='ar'?'ltr':'rtl'}]}>
                     <Text style={profileNameText}>{customerInfo[0].customers_firstname} {customerInfo[0].customers_lastname}</Text>

                   </CardItem>
                   :null
                   :
                   customerInfo&&(arabic.test(customerInfo[0].customers_firstname)||arabic.test(customerInfo[0].customers_lastname))?

                   <CardItem style={[transparentBackGround,{borderColor:"transparent",justifyContent:'center',marginLeft:150,flexDirection:"row-reverse"}]}>
                   <Text style={profileNameText}>{customerInfo[0].customers_firstname} {customerInfo[0].customers_lastname}</Text>

                 </CardItem>
                 :null
                                  }
                   </View>
                   :null
                   :null}
                                    <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
                                    <View style={{backgroundColor:"#dedec8",width:'100%',height:dimensions.height}} opacity={0.8}> 
                                    {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                                     <TouchableOpacity onPress={this.goToHomePage}>
                   <CardItem style={[homeCardItem,{justifyContent:'center',marginLeft:lang=='ar'?50:40,direction:lang=='ar'?'ltr':'rtl'}]}>

                       <Text style={[otherTextsStyle,{lineHeight:30}]}>{strings('header.home',lang)} </Text>
                       <Image source={require('../assests/images/home.png')}
style={{width:20,height:20,marginTop:-10,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                   :
                   <TouchableOpacity onPress={this.goToHomePage}>
                   <CardItem style={[homeCardItem,{justifyContent:'center',marginLeft:lang=='ar'?50:40,flexDirection:"row-reverse"}]}>

                       <Text style={[otherTextsStyle,{lineHeight:30,marginLeft:5}]}>{strings('header.home',lang)} </Text>
                       <Image source={require('../assests/images/home.png')}
style={{width:20,height:20,marginTop:-2,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                      }
                   <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
                   {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                   <TouchableOpacity onPress={this.goToOrdersPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?140:80,direction:lang=='ar'?'ltr':'rtl'}]}>
                       <Text style={otherTextsStyle}>{strings('header.orders',lang)}</Text>
                       <Image source={require('../assests/images/order.png')}
style={{width:20,height:20,marginTop:-10,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                   :
                   <TouchableOpacity onPress={this.goToOrdersPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?140:80,flexDirection:"row-reverse"}]}>
                       <Text style={[otherTextsStyle,{marginLeft:5}]}>{strings('header.orders',lang)}</Text>
                       <Image source={require('../assests/images/order.png')}
style={{width:20,height:20,marginTop:-2,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                    }

                   <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
                   {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                   <TouchableOpacity onPress={this.goToHelpPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?100:50,direction:lang=='ar'?'ltr':'rtl'}]}>
                       <Text style={otherTextsStyle}>{strings('header.help',lang)}</Text>
                       <Image source={require('../assests/images/contact2.png')}
style={{width:20,height:20,marginTop:-10,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                   :

                   <TouchableOpacity onPress={this.goToHelpPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?100:50,flexDirection:"row-reverse"}]}>
                       <Text style={[otherTextsStyle,{marginLeft:5}]}>{strings('header.help',lang)}</Text>
                       <Image source={require('../assests/images/contact2.png')}
style={{width:20,height:20,marginTop:-2,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                  }
                   <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
                   {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                   <TouchableOpacity onPress={this.goToSettingPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?120:70,direction:lang=='ar'?'ltr':'rtl'}]}>
                       <Text style={otherTextsStyle}>{strings('header.setting',lang)}</Text>
                       <Image source={require('../assests/images/setting.png')}
style={{width:20,height:20,marginTop:-10,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                   :
                   <TouchableOpacity onPress={this.goToSettingPage}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?120:70,flexDirection:"row-reverse"}]}>
                       <Text style={[otherTextsStyle,{marginLeft:5}]}>{strings('header.setting',lang)}</Text>
                       <Image source={require('../assests/images/setting.png')}
style={{width:20,height:20,marginTop:-2,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                }
                   <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
                   {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='ar')?

                   <TouchableOpacity onPress={this.signOutHandler}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?80:70,direction:lang=='ar'?'ltr':'rtl'}]}>
                  
                       <Text style={otherTextsStyle}>{strings('header.logout',lang)}</Text>
                       <Image source={require('../assests/images/logout.png')}
style={{width:20,height:20,marginTop:-10,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
                   :
                   <TouchableOpacity onPress={this.signOutHandler}>
                   <CardItem style={[otherCardItemStyle,{justifyContent:'center',marginLeft:lang=='ar'?80:70,flexDirection:"row-reverse"}]}>
                  
                       <Text style={[otherTextsStyle,{marginLeft:5}]}>{strings('header.logout',lang)}</Text>
                       <Image source={require('../assests/images/logout.png')}
style={{width:20,height:20,marginTop:-2,marginLeft:20}}
/>
                   </CardItem>
                   </TouchableOpacity>
              }
                   <View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>

<View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginEnd:lang=='ar'?30:90}}>
{lang=='en'?
                     <TouchableOpacity onPress={()=>this.changelanguage('ar')}>
                   <CardItem style={[otherCardItemStyle,{marginRight:30}]}>
                  <View style={{width:30,marginLeft:20}}/>
                     <Right>
                     <TouchableOpacity 
                     onPress={()=>this.changelanguage('ar')}
                     style={{width:55,height:35,backgroundColor:'#003580',borderColor:'#003580',borderRadius:3,paddingTop:3,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{color:"#fff",fontSize:14,fontFamily:'TajawalBold0'}}>{strings('header.Arabic',lang)}</Text>
                       </TouchableOpacity>
                     </Right>
                   </CardItem>

                   </TouchableOpacity>
                   :null}
                   {lang=='ar'?
                   <TouchableOpacity onPress={()=>this.changelanguage('en')}>
                   <CardItem style={[otherCardItemStyle,{marginRight:30}]}>
                  <View style={{width:30}}/>
                     <Right>
                     <TouchableOpacity 
                     onPress={()=>this.changelanguage('en')}
                     style={{width:55,height:35,backgroundColor:'#003580',borderColor:'#003580',borderRadius:3,paddingTop:3,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{color:"#fff",fontSize:14,fontFamily:'TajawalBold0'}}>{strings('header.english',lang)}</Text>
                       </TouchableOpacity>
                     </Right>
                   </CardItem>

                   </TouchableOpacity>
                   :null}
</View>
<View style={{width:'100%',height:1,backgroundColor:'#003580'}}></View>
{/* <CardItem style={[otherCardItemStyle,{marginRight:30}]}>
  <Body style={{justifyContent:"center",alignItems:"center"}}>
<Text style={{fontFamily:'TajawalMedium0',color:'#003580',fontSize:12}}>Version {info.version}</Text>
  </Body>

</CardItem> */}
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:"100%"}}>
{lang=='en'?
                 
                   <CardItem style={{backgroundColor:'transparent'}}>
                     <Body style={{justifyContent:"center",alignItems:"center"}}>
                     
                     <Text style={{fontFamily:'TajawalMedium0',color:'#003580',fontSize:12,textAlign:"center"}}>Version {info.version}</Text>
                     </Body>
                   </CardItem>

                   :null}
                   {lang=='ar'?
                   <CardItem style={{backgroundColor:'transparent'}}>
                  <View/>
                  <Body style={{justifyContent:"center",alignItems:"center"}}>
                     
                     <Text style={{fontFamily:'TajawalMedium0',color:'#003580',fontSize:12}}>Version {info.version}</Text>
                     </Body>
                   </CardItem>

                   :null}
</View>

                   </View>
                 </List>
           </ImageBackground>
        )
    }
}
const mapStateToProps = state =>
{
  const { categories,home_loading,customerInfo} = state.homeReducer;
  const { info } = state.helpReducer;

  const { user } = state.authReducer;
  const { lang } = state.sideBarReducer;
  return { user,lang,categories,customerInfo,info};
}
export default connect(mapStateToProps,{signOut,isLoggIn,...sideBarAction,...homeAction,...privacyAction,...orderPageAction,...helpAction})(SideBar);