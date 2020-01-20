
import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Item,Picker,Card,Label,Drawer} from 'native-base';
import {transparentBackground,transparentBorder,centerStyle,buttonStyle,buttonText,pickerStyle,labelStyle} from '../theme';
import * as servantInsuranceAction from '../actions/servantInsuranceAction';
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';
import Header from './header';
import SideBar from "./sideBar";
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';

const dimensions=Dimensions.get('window');
class ServantInsurance extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false

    }
  }
  componentWillMount() {

    this.props.getCountries();

    
  }
    componentDidUpdate (){
        const { servant_insurance_msg} = this.props;
         if (servant_insurance_msg != null) {
           setTimeout(()=> this.props.resetServantInsuranceMessage(),300);
         }
      }

    //START DROPDOWN MESSAGES
  onError = (error) => {
    const {lang}=this.props
    if (error) {
    console.log("error",error)
    this.dropdown.alertWithType('error', strings('message.error',lang), error);
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
     showAlert = () => {
      const {servant_insurance_msg} = this.props;
      if (servant_insurance_msg != null) {
        if (servant_insurance_msg.isError) {
          this.onError(servant_insurance_msg.msg);
        } else if (servant_insurance_msg.isSuccess) {
          this.onSuccess(servant_insurance_msg.msg);
        } else {
          return;
        }
      }
    };
    goFromServantInsurance=()=>{
      this.setState({form_submitted:true})
        const {nationality,user_id,lang} = this.props;
        this.props.goFromServantlInsurance(nationality,user_id,strings('message.fill_message',lang));
    
 
      }
      closeDrawer = () => {
        this.drawer._root.close();
    
      };
    
      
    
      openDrawer = () => {
        
        this.drawer._root.open();
        setTimeout(() => Keyboard.dismiss());
      };
    render(){
      const {nationality,lang,countries}=this.props
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
                      <ScrollView ref={(ref)=> {this._scrollView = ref}}>

              <Card style={{backgroundColor:'transparent',borderColor:'transparent'}}>
       
  
     
     
   
              <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('servant_insurance.nationality',lang)}{form_submitted && nationality == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('servant_insurance.nationality',lang)}
                      // placeholder={strings('travelinsurance.destination_from',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && nationality == ""? "red": "#171717",borderBottomWidth:form_submitted && nationality == ""?2:0}]}
                      selectedValue={nationality}
                      onValueChange={value =>
                        this.props.getServantInsuranceTexts({prop:"nationality",value})
                      }
                     >
                 {countries.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.countries_id}
                          label={item.countries_name}
                          value={item.countries_id}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                </Item>
               </CardItem>
    {lang=="en"?
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
               
                  <Button style={buttonStyle}  block onPress={this.goFromServantInsurance}>
                 
                    <Text style={buttonText}>{strings('drivinglicense.continue',lang)}
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                   </Text>
                  </Button>
                </Body>
            </CardItem>
            :null}
            {lang=="ar"?
                <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromServantInsurance}>>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>
   
              <Text style={buttonText}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
                    </Body>
                    </CardItem>
                    :null}
            </Card>
           

            </ScrollView>
            <Text>{this.showAlert()}</Text>

<DropdownAlert ref={ref => (this.dropdown = ref)} style={{fontFamily:'TajawalRegular0',}} />
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
    const {countries} = state.shippingInsuranceReducer;

    const { nationality,servant_insurance_msg} = state.servantInsuranceReducer;
    return {nationality,servant_insurance_msg,countries,lang};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,{...servantInsuranceAction,...shippingInsuranceAction})
    (ServantInsurance);