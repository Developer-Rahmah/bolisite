
import React, { Component } from 'react';
import {ImageBackground,Dimensions,Keyboard,StatusBar} from 'react-native';
import {CardItem,Drawer} from 'native-base';
import { connect } from 'react-redux';
import Header from './header';
import SideBar from "./sideBar";
import {removeTags} from './common/removeTags'
import * as privacyAction from '../actions/privacyAction'
import { WebView } from 'react-native-webview';

const dimensions=Dimensions.get('window');
class UserAgreement extends Component{
  componentWillMount() {

    const {lang}=this.props;
    if(lang=='en'){
      this.props.getUserAgreement(1);
    }
    else if (lang=='ar'){
      this.props.getUserAgreement(4);

    }

      
    }
    closeDrawer = () => {
      this.drawer._root.close();
    };
  
    openDrawer = () => {
      
      this.drawer._root.open();
      setTimeout(() => Keyboard.dismiss());
    };

    render(){
      const {lang,userAgreement}=this.props


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

                      <WebView
        source={{uri: 'https://bolisati.com/user-agreement-m'}}
      />
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
  const {userAgreement}=state.privacyReducer;
  return {lang,userAgreement
  };
}
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,
    privacyAction)
    (UserAgreement);