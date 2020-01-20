import React, {Component} from "react";
import {Scene, Router} from "react-native-router-flux";
import FirstPage from './components/firstPage';
import SplashScreen from "./components/splashScreen";
import {isLoggIn} from "./actions/authAction";
import SignUp from './components/signUp';
import Login from './components/login';
import Home from './components/home';
import DrivingLicense from "./components/drivingLicense";
import DrivingLicense2 from "./components/drivingLicense2";

import CarInformation from "./components/carInformation";
import CarInformation2 from "./components/carInformation2"

import InsuranceCompanies from './components/insuranceCompanies';
import InsuranceCompanies2 from './components/insuranceCompanies2';

import Payment from './components/payment';
import Setting from './components/setting';
import Profile from './components/profile';
import {connect} from "react-redux";
import {AsyncStorage} from 'react-native';
import DamageStep from "./components/damageStep";
import LifeInsurance from "./components/lifeInsurance";
import TravelInsurance from './components/travelInsurance';
import CancerCareProgram from './components/cancerCareProgram';
import ShippingInsurance from './components/shippingInsurance';
import OrdersPage from './components/ordersPage';
import DoneScreen from './components/DoneScreen';
import DoneScreen2 from './components/DoneScreen2';
import DoneScreen3 from './components/DoneScreen3';
import DoneScreen4 from './components/DoneScreen4';

import UploadID from './components/UploadID';
import Uploadpassport from './components/Uploadpassport';
import Help from './components/help';
import {View} from 'react-native';
import {Actions} from "react-native-router-flux";
import TravelInsuranceInformation from './components/travelInsuranceInformation';
import ResturantsInsurance from './components/resturantsInsurance'
import ShippingInsuranceInformation from './components/shippingInsuranceInformation'
import ServantIncurance from './components/servantInsurance'
import {getShowIconText,getCustomerInfo} from "./actions/homeAction";
import ServantIncuranceInformation from './components/servantInsuranceInformation'
import LifeInsuranceQuestion from './components/lifeInsuranceQuestion'
import HealthInsurance from './components/healthInsurance';
import Privacy from './components/privacy';
import UserAgreement from './components/userAgreement';
import HealthInsuranceQuestion from './components/healthInsuranceQuestion';
import client from './constants';


// const RouterController = props => {
  class RouterController extends Component{
    state = {
      isUserLogin: false
    }
    componentDidMount() {
       AsyncStorage.getItem('user', (err, result) => {

         result=JSON.parse(result)
         console.log("result",result)
         if(result!=null&&result!=undefined){
          if (result[0].customers_id!=null&&result[0].customers_id!=undefined) {
            this.setState({ isUserLogin: true });
          }
          else{
            this.setState({ isUserLogin: false })
          }
        
       
     
          }
          else{
            this.setState({ isUserLogin: false });

          }
      });
    }
  //   componentDidMount() {
  //     AsyncStorage.getItem('user', (err, result) => {
  //       result=JSON.parse(result)
  //       if(result!=null){
  //         console.log("resukt")
  //       client.post(`customerinfo?id=${result[0].customers_id}`).then((response) => {
  //        console.log("response of customer  in router",response)
  //        if (response.data.data.length>0) {
  //          this.setState({ isUserLogin: true });
  //        }
  //        else{
  //          this.setState({ isUserLogin: false })
  //        }
       
  //          })
    
  //        }
  //    });
  //  }
    authenticate = () => {
      this.state.isUserLogin ? true : false
    }
    render(){
      return (
        <Router
        navigationBarStyle={{backgroundColor: "#fff"}}
      >
        <Scene key="root" hideNavBar="hideNavBar" >
          <Scene key="Bolisati">
          <Scene 
              key="Launch" 
              component="Launch"
              initial
              on={this.authenticate}
              success="Home"
              failure="FirstPage"
            />
            <Scene
              key="firstpage"
              component={FirstPage}
              title=""
              hideNavBar
              initial={!this.state.isUserLogin}
            />
           
            <Scene
              key="splashscreen"
              component={SplashScreen}
              title=""
              hideNavBar
              
            />
             <Scene
              key="login"
              component={Login}
              title=""
              hideNavBar
            />
            <Scene
              key="signup"
              component={SignUp}
              title=""
              hideNavBar
            />
            <Scene
              key="home"
              component={Home}
              title=""
              hideNavBar
              onEnter={() => props.getShowIconText(false)}
              initial={this.state.isUserLogin}

            />
            <Scene
              key="drivinglicense"
              component={DrivingLicense}
              title=""
              hideNavBar 
              onEnter={() => props.getShowIconText(true)}
            />
                   <Scene
              key="drivinglicense2"
              component={DrivingLicense2}
              title=""
              hideNavBar 
              onEnter={() => props.getShowIconText(true)}
            />
            <Scene
              key="carinformation"
              component={CarInformation}
              title=""
              hideNavBar 
            />
              <Scene
              key="carinformation2"
              component={CarInformation2}
              title=""
              hideNavBar 
            />
            <Scene
              key="insurancecompanies"
              component={InsuranceCompanies}
              title=""
              hideNavBar 
            />
                 <Scene
              key="insurancecompanies2"
              component={InsuranceCompanies2}
              title=""
              hideNavBar 
            />
             <Scene
              key="damagestep"
              component={DamageStep}
              title=""
              hideNavBar 
            />
              <Scene
              key="payment"
              component={Payment}
              title=""
              hideNavBar 
            />
              <Scene
              key="setting"
              component={Setting}
              title=""
              hideNavBar 
            />
            <Scene
              key="profile"
              component={Profile}
              title=""
              hideNavBar 
            />
              <Scene
              key="lifeinsurance"
              component={LifeInsurance}
              title=""
              hideNavBar 
            />
              <Scene
              key="travelinsurance"
              component={TravelInsurance}
              title=""
              hideNavBar 
            />
              <Scene
              key="cancercareprogram"
              component={CancerCareProgram}
              title=""
              hideNavBar 
            />
             <Scene
              key="shippinginsurance"
              component={ShippingInsurance}
              title=""
              hideNavBar 
            />
            
              <Scene
              key="orderspage"
              component={OrdersPage}
              title=""
              hideNavBar 
            />
             <Scene
              key="DoneScreen"
              component={DoneScreen}
              title=""
              hideNavBar 
            />
             <Scene
              key="DoneScreen2"
              component={DoneScreen2}
              title=""
              hideNavBar 
            />
              <Scene
              key="DoneScreen3"
              component={DoneScreen3}
              title=""
              hideNavBar 
            />
              <Scene
              key="DoneScreen4"
              component={DoneScreen4}
              title=""
              hideNavBar 
            />
              <Scene
              key="UploadID"
              component={UploadID}
              title=""
              hideNavBar 
            />
         
         <Scene
              key="Uploadpassport"
              component={Uploadpassport}
              title=""
              hideNavBar 
            />
                   <Scene
              key="help"
              component={Help}
              title=""
              hideNavBar 
            />
                     <Scene
              key="travelinsuranceinformation"
              component={TravelInsuranceInformation}
              title=""
              hideNavBar 
            />
            <Scene
              key="resturantsinsurance"
              component={ResturantsInsurance}
              title=""
              hideNavBar 
            />
              <Scene
              key="shippinginsuranceinformation"
              component={ShippingInsuranceInformation}
              title=""
              hideNavBar 
            />
                 <Scene
              key="servantinsurance"
              component={ServantIncurance}
              title=""
              hideNavBar 
            />
                     <Scene
              key="servantinsuranceinformation"
              component={ServantIncuranceInformation}
              title=""
              hideNavBar 
            />
                       <Scene
              key="lifeinsurancequestion"
              component={LifeInsuranceQuestion}
              title=""
              hideNavBar 
            />
                <Scene
              key="healthinsurance"
              component={HealthInsurance}
              title=""
              hideNavBar 
            />
               <Scene
              key="privacy"
              component={Privacy}
              title=""
              hideNavBar 
            />
            <Scene
              key="useragreemnet"
              component={UserAgreement}
              title=""
              hideNavBar 
            />
                <Scene
              key="healthinsurancequestion"
              component={HealthInsuranceQuestion}
              title=""
              hideNavBar 
            />
            {/* <Scene
              key="NotificationScreen"
              component={NotificationScreen}
              title=""
              hideNavBar 
            /> */}
          </Scene>

          
          
        </Scene>
      </Router>
    );
}
  };
  
  // export default RouterController;
  
  export default connect(null, {
 
    getShowIconText,getCustomerInfo
  })(RouterController);