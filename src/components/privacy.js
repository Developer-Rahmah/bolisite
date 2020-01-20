
import React, { Component } from 'react';
import {ImageBackground,Dimensions,Keyboard,StatusBar,WebView} from 'react-native';
import {Drawer} from 'native-base';
import * as privacyAction from '../actions/privacyAction'
import { connect } from 'react-redux';
import Header from './header';
import SideBar from "./sideBar";


const dimensions=Dimensions.get('window');
class Privacy extends Component{
  componentWillMount() {

    const {lang}=this.props;
    if(lang=='en'){
      this.props.getPrivacy(1);
    }
    else if (lang=='ar'){
      this.props.getPrivacy(4);

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
      const {privacy,lang}=this.props

    

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
        source={{uri: 'https://bolisati.com/privacy-policy-m'}}
        // style={{marginTop: 20}}
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
    const {privacy}=state.privacyReducer;
    return {lang,privacy
    };
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,
    privacyAction)
    (Privacy);