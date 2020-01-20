import React,{Component} from 'react';
import  {ImageBackground,Dimensions,Text,StyleSheet,Image,Keyboard,StatusBar,ScrollView} from 'react-native';
import {Body,CardItem,Button,Drawer} from 'native-base';
import * as authAction from '../actions/authAction';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";
import {strings} from '../../Locales/i18n';
import Header from './headerWithoutArrow';
import SideBar from "./sideBar";
import {continueText,skipButton,continueButton} from '../assests/styles/drivingLicenseStyles';

import {transparentBackground,centerStyle} from '../theme';
const dimensions=Dimensions.get('window');
class DoneScreen extends Component{
  closeDrawer = () => {
    this.drawer._root.close();

  };


  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };

    render(){
      const {lang}=this.props
return(
 
  <ImageBackground
  source={require("../assests/images/splash–1.png")}
  style={{width: dimensions.width, height: "100%"}}
>
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
            <ScrollView
            ref={ref => {
              this._scrollView = ref;
            }}
          >
  <CardItem style={{marginTop:100,backgroundColor:"transparent"}}>
  <Body style={centerStyle}>
<Image source={require('../assests/images/Artboard–1.png')}
style={{width:100,height:100,paddinTop:100}}
/>

</Body>
</CardItem>
<CardItem style={transparentBackground}>
  <Body style={centerStyle}>
    <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings('Done_screen.add_order_message',lang)}</Text>
    

    </Body>
</CardItem>

{lang=="en"?
<CardItem style={transparentBackground}>
  <Body style={centerStyle}>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>Your order #{this.props.order_id} has been confirmed </Text>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}> to {this.props.company_name}. </Text>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>Your policy will be issued within 48 hours</Text>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>Thank you for choosing Bolisati</Text>

  </Body>
</CardItem>
:
<CardItem style={transparentBackground}>
  <Body style={centerStyle}>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>طلبك {this.props.order_id} تم تقديمه إلى {this.props.company_name_ar}. </Text>
    
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>سوف يتم إصدار بوليصة التأمين </Text>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>الخاصة بك خلال 48 ساعة</Text>

    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>شكرا لإختياركم بوليصتي/Bolisati</Text>

  </Body>
</CardItem>
} 

             <CardItem style={[transparentBackground,{marginTop:30}]}>
                 <Button style={continueButton} onPress={() => Actions.home()}>
              
                   <Text style={[continueText,{lineHeight:25}]}>{strings('header.home',lang)}</Text>
               
                   </Button>
                 <Button style={skipButton}onPress={() =>Actions.orderspage({user_id:this.props.user_id})}>
                   <Text style={{color:"#003580",fontSize:16,fontFamily:'TajawalBold0',textAlign:'center',marginTop:7,lineHeight:25}}>{strings('header.orders',lang)}</Text>
                 </Button>
               </CardItem>
               </ScrollView>
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
    return { lang};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,authAction)(DoneScreen);