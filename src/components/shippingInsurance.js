import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Item,Input,Picker,Card,Label,Drawer} from 'native-base';
import {transparentBackground,transparentBorder,inputStyle,centerStyle,buttonStyle,buttonText,pickerStyle,datePickerStyle,labelStyle} from '../theme';
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
const dimensions=Dimensions.get('window');
class ShippingInsurance extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false

    }
  }
  componentWillMount() {
    this.props.getWhatsToShipping();
    this.props.getCarrier();
    this.props.getCountries();

    
  }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
    componentDidUpdate (){
        const { shipping_insurance_msg} = this.props;
         if (shipping_insurance_msg != null) {
           setTimeout(()=> this.props.resetShippingInsuranceMessage(),300);
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
      const {shipping_insurance_msg} = this.props;
      if (shipping_insurance_msg != null) {
        if (shipping_insurance_msg.isError) {
          this.onError(shipping_insurance_msg.msg);
        } else if (shipping_insurance_msg.isSuccess) {
          this.onSuccess(shipping_insurance_msg.msg);
        } else {
          return;
        }
      }
    };
    goFromShippingInsurance=()=>{
      this.setState({form_submitted:true})
        const {name,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,user_id,lang} = this.props;
        this.props.goFromShippingInsurance(name,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,user_id,strings('message.fill_message',lang));
    
 
      }
    render(){
      const {name,lang,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,whats_to_shipping_array,carrier,countries}=this.props
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
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",lineHeight:20}]}>{strings('lifeinsurance.name',lang)}{form_submitted && name == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                   <Input
                     color="#fff"
                     value ={name}
                    //  placeholder ={strings('carInformation.full_name',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && name == ""? "red": "#171717",borderBottomWidth:form_submitted && name == ""?2:0}]}
                     onChangeText={value =>this.props.getShippingInsuranceTexts({prop:"name",value})}
                   />
                   </View>
                 </Item>
               </CardItem>
        
             
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('shippinginsurance.what_your_shipping',lang)}{form_submitted && what_your_shipping == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('shippinginsurance.what_your_shipping',lang)}
                      // placeholder={strings('shippinginsurance.what_your_shipping',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && what_your_shipping == ""? "red": "#171717",borderBottomWidth:form_submitted && what_your_shipping == ""?2:0}]}
                      selectedValue={what_your_shipping}
                      onValueChange={value =>
                        this.props.getShippingInsuranceTexts({
                          prop: "what_your_shipping",
                          value
                        })
                      }
                     >
                    {whats_to_shipping_array.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                </Item>
               </CardItem>
               <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}>
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('shippinginsurance.shipped_date',lang)}{form_submitted && shipped_date == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 <DatePicker
                 style={[datePickerStyle,{borderBottomColor:form_submitted && shipped_date == ""? "red": "#171717",borderBottomWidth:form_submitted && shipped_date == ""?2:0}]}
                 date={ shipped_date}
                 mode="date"
                 placeholder={strings('shippinginsurance.shipped_date',lang)}
                 format="YYYY-MM-DD"
                 minDate={new Date()}
                 maxDate="2029-12-31"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 customStyles={{
                 dateIcon: {
                 position: 'absolute',
                 left: 0,
                 top: 4,
                 marginLeft: 0
                 },
                 dateInput: {
                 marginLeft: 36
                 },
                 btnTextConfirm: {
                 height: 20
                 },
                 btnTextCancel: {
                 height: 20
                 }
     }}
     onDateChange={(value) => this.props.getShippingInsuranceTexts({prop:"shipped_date",value})}
    />
    </View>
                 </Item>
                 </CardItem>
                 <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('shippinginsurance.shipped_from',lang)}{form_submitted && shipped_from == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('shippinginsurance.shipped_from',lang)}
                      // placeholder={strings('shippinginsurance.shipped_from',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && shipped_from == ""? "red": "#171717",borderBottomWidth:form_submitted && shipped_from == ""?2:0}]}
                      selectedValue={shipped_from}
                      onValueChange={value =>
                        this.props.getShippingInsuranceTexts({
                          prop: "shipped_from",
                          value
                        })
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
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('shippinginsurance.shipped_to',lang)}{form_submitted && shipped_to == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('shippinginsurance.shipped_to',lang)}
                      // placeholder={strings('shippinginsurance.shipped_to',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && shipped_to == ""? "red": "#171717",borderBottomWidth:form_submitted && shipped_to == ""?2:0}]}
                      selectedValue={shipped_to}
                      onValueChange={value =>
                        this.props.getShippingInsuranceTexts({
                          prop: "shipped_to",
                          value
                        })
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
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('shippinginsurance.carrier_name',lang)}{form_submitted && carrier_name == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('shippinginsurance.carrier_name',lang)}
                      // placeholder={strings('shippinginsurance.carrier_name',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && carrier_name == ""? "red": "#171717",borderBottomWidth:form_submitted && carrier_name == ""?2:0}]}
                      selectedValue={carrier_name}
                      onValueChange={value =>
                        this.props.getShippingInsuranceTexts({
                          prop: "carrier_name",
                          value
                        })
                      }
                     >
               {carrier.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          label={item.carriers_name}
                          value={item.id}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                </Item>
               </CardItem>
         
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
               
                  <Button style={buttonStyle}  block onPress={this.goFromShippingInsurance}>
                  {lang=='ar'?
                    <Icon name='md-arrow-back' style={{color:'#fff'}}/>
                    :null}
                    <Text style={buttonText}>{strings('drivinglicense.continue',lang)}
                    {lang=='en'?
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                   :null}
                   </Text>
                  </Button>
                </Body>
            </CardItem>


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
    const { name,shipping_insurance_msg,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,whats_to_shipping_array,carrier,countries} = state.shippingInsuranceReducer;
    return {name,shipping_insurance_msg,lang,what_your_shipping,shipped_date,shipped_from,shipped_to,carrier_name,whats_to_shipping_array,carrier,countries};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,shippingInsuranceAction)(ShippingInsurance);