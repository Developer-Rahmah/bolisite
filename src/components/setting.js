import React,{Component} from 'react';
import {ImageBackground,Dimensions,TouchableOpacity,Keyboard,StatusBar,Platform} from 'react-native';
import {CardItem,Text,Right,Left, Content,Drawer} from 'native-base';
import {transparentBackground} from '../theme';
import { Actions } from 'react-native-router-flux';
const dimensions=Dimensions.get('window');
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import * as profileAction from "../actions/profileAction";
import Header from './header';
import SideBar from "./sideBar";
class Setting extends Component{
   closeDrawer = () => {
      this.drawer._root.close();
  
    };
    openDrawer = () => {
      
      this.drawer._root.open();
      setTimeout(() => Keyboard.dismiss());
    };
    render(){
        const {user,lang}=this.props;
return(
    <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height: "100%"}}>
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
    {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

    <TouchableOpacity onPress={()=>Actions.profile()}>
    {this.props.customerInfo.length>0?
  <CardItem style={{height:70,direction:lang=='ar'?"rtl":"ltr",borderColor:"#003580"}} bordered>
              <Left>
                 <Text style={{fontSize:16,textAlign:"right",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.profile',lang)}</Text>
              </Left>
              <Right>
                 <Text style={{fontSize:16,textAlign:"right",color:"#gray",fontFamily:'TajawalRegular0'}}>{this.props.customerInfo[0].customers_firstname} {this.props.customerInfo[0].customers_lastname}</Text>
              </Right>
            </CardItem>
            :null}
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>Actions.profile()}>
            {this.props.customerInfo.length>0?
          <CardItem style={{height:70,flexDirection:"row-reverse",borderColor:"#003580"}} bordered>
                      <Right>
                         <Text style={{fontSize:16,textAlign:"right",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.profile',lang)}</Text>
                      </Right>
                      <Left>
                         <Text style={{fontSize:16,textAlign:"right",color:"#gray",fontFamily:'TajawalRegular0'}}>{this.props.customerInfo[0].customers_firstname} {this.props.customerInfo[0].customers_lastname}</Text>
                      </Left>
                    </CardItem>
                    :null}
                    </TouchableOpacity>
    }
        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

            <TouchableOpacity onPress={()=>Actions.privacy()}>

            <CardItem style={{transparentBackground,height:70,direction:lang=='ar'?"rtl":"ltr",borderColor:"#003580"}} bordered>
              <Left>
                 <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.privacy',lang)}</Text>
              </Left>

            </CardItem>
            </TouchableOpacity>
            :

<TouchableOpacity onPress={()=>Actions.privacy()}>

<CardItem style={{transparentBackground,height:70,flexDirection:"row-reverse",borderColor:"#003580"}} bordered>
  <Right>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.privacy',lang)}</Text>
  </Right>

</CardItem>
</TouchableOpacity>
}
        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

<TouchableOpacity onPress={()=>Actions.useragreemnet()}>

            <CardItem style={{transparentBackground,height:70,direction:lang=='ar'?"rtl":"ltr",borderColor:"#003580"}} bordered>
              <Left>
                 <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.user_agreement',lang)}</Text>
              </Left>

            </CardItem>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>Actions.useragreemnet()}>

            <CardItem style={{transparentBackground,height:70,flexDirection:"row-reverse",borderColor:"#003580"}} bordered>
              <Right>
                 <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#003580",fontFamily:'TajawalBold0'}}>{strings('setting.user_agreement',lang)}</Text>
              </Right>

            </CardItem>
            </TouchableOpacity>
}
            </Content>
            </Drawer>
    </ImageBackground>

)
    }
}
const drawerStyles = {
   drawer: {shadowOpacity: 0, elevation: 0},
   main: {shadowOpacity: 0, elevation: 0}
 };
const mapStateToProps = state => {
   const { lang } = state.sideBarReducer;
   return {lang};
 };
 // END MAP STATE TO PROPS
 
 export default connect(mapStateToProps, profileAction)(Setting);