import React, { Component } from 'react';
import {Dimensions,Image,View,TouchableOpacity,Platform} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Title, Button, Text,Icon, CardItem } from 'native-base';
import { Actions} from "react-native-router-flux";
import { isLoggIn } from "../actions/authAction";
import {centerStyle,headerStyle,menuIcon,otherCardItemStyle} from '../theme';
import {translate} from '../../Locales/i18n';
import * as sideBarAction from '../actions/sideBarAction';
import {strings} from '../../Locales/i18n';
import * as homeAction from '../actions/homeAction';
import * as privacyAction from '../actions/privacyAction'
import * as orderPageAction from '../actions/ordersPageAction';
// import Icon from "react-native-vector-icons/FontAwesome";
const dimensions=Dimensions.get('window');
class AuthHeader extends Component {
  constructor(props){
    super(props);
    this.state ={
      lang:'',
    }

  }
  componentDidMount(){
    this.props.isLoggIn()
  }
  changelanguage=(language)=>{
    const {lang,user}=this.props
    if(language=='ar')
{

  this.setState({lang:'ar'})

  this.props.getLanguageText(language)
 
    this.props.closeDrawer();


}
else if (language=='en'){
this.setState({lang:'en'})
this.props.getLanguageText(language)

this.props.closeDrawer();


}

translate(this.state.lang)
  }
    render(){
      const {user,show_icon,lang}=this.props;

        return(
            
            <Header style={headerStyle}>
        <Left></Left>
        {Platform.OS=="ios"?
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            source={require("../assests/images/logo2.png")}
            style={{height: 150, width: 150}}
          />
        </Body>
        :
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 90,
            marginLeft:50
          }}
        >
          <Image
            source={require("../assests/images/logo2.png")}
            style={{height: 150, width: 150}}
          />
        </Body>
}
      
   <Right style={{marginLeft:20}}>

<View style={{flexDirection:'row',marginTop:Platform.OS=="android"?15:null
}}
>
     
           {lang=='en'?
                 <TouchableOpacity style={{marginLeft:30}}
            onPress={()=>this.changelanguage('ar')}
            >
           <CardItem style={{backgroundColor:"transparent",marginLeft:Platform.OS == "android"?80:60,marginBottom:10}}>
          <View style={{width:20}}/>
             <Right>
             <TouchableOpacity 
             onPress={()=>this.changelanguage('ar')}
             style={{width:45,height:35,backgroundColor:'#fff',borderColor:'#003580',borderRadius:3,paddingTop:3,alignItems:'center',justifyContent:'center',marginLeft:20}}>
               <Text style={{color:'#003580',fontSize:14,fontFamily:'TajawalBold0'}}>AR</Text>
               </TouchableOpacity>
             </Right>
           </CardItem>

           </TouchableOpacity>
           :null}
           {lang=='ar'?
           <TouchableOpacity 
            onPress={()=>this.changelanguage('en')}
            >
           <CardItem style={{backgroundColor:"transparent",marginRight:Platform.OS == "ios"?5:-5,marginBottom:10}}>
          <View style={{width:20}}/>
             <Right>
             <TouchableOpacity 
             onPress={()=>this.changelanguage('en')}
             style={{width:45,height:35,backgroundColor:'#fff',borderColor:'#003580',borderRadius:3,paddingTop:3,alignItems:'center',justifyContent:'center',marginLeft:20}}>
               <Text style={{color:'#003580',fontSize:14,fontFamily:'TajawalBold0'}}>EN</Text>
               </TouchableOpacity>
             </Right>
           </CardItem>

           </TouchableOpacity>
                          :null}

</View>

</Right>
          </Header>
        )
    }
}
// export default HeaderCustom;

const mapStateToProps = state =>
{
  const { categories,home_loading,customerInfo} = state.homeReducer;

  const { user } = state.authReducer;
  const { lang } = state.sideBarReducer;
  return { user,lang,categories,customerInfo};
}
export default connect(mapStateToProps,{isLoggIn,...sideBarAction,...homeAction,...privacyAction,...orderPageAction})(AuthHeader);