import React, { Component } from 'react';
import {ImageBackground,Dimensions,Modal,Platform,Keyboard,StatusBar,ScrollView,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text,Right,Left, Icon,View,Item, Content,Input,CheckBox,Label,ListItem,Picker,Drawer,Textarea} from 'native-base';
import {transparentBackground,sevicesCardItemStyle,servicesText,buttonText,transparentBorder,inputStyle,labelStyle,pickerStyle2,centerStyle,buttonStyle,phoneInputStyle,pickerStyle} from '../theme';
import PhoneInput from 'react-native-phone-input';

import { connect } from 'react-redux';
import * as paymentAction from '../actions/paymentAction';
const dimensions=Dimensions.get('window');
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
import { Actions } from 'react-native-router-flux';
import * as homeAction from "../actions/homeAction";

class Payment extends Component{
  state = {
    form_submitted: false,
    big_form_submitted:false,
    type:''

  };
  componentWillMount() {
    this.props.getCustomerInfo(this.props.user_id);

    this.props.getCities();

    if(this.props.insurance_type=="Travel Insurance"&&this.props.lang=='ar'){
      this.setState({type:"تأمين السفر"})
    }else if(this.props.insurance_type=="Travel Insurance"&&this.props.lang=='en'){

      this.setState({type:this.props.insurance_type})

    }
    else if (this.props.insurance_type=="Car Insurance"&&this.props.lang=='ar'){
      this.setState({type:"تأمين المركبات"})

    }
    else if(this.props.insurance_type=="Car Insurance"&&this.props.lang=='en'){

      this.setState({type:this.props.insurance_type})

    }
  }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  selectCountry(country){
    const country_code  = this.phone.getCountryCode();
    this.props.getPaymentTexts({prop:'phone_number',value:{
      code:country_code,
      number:''
    }});
   }
   changePhoneNumber(number)
   {
 
     const { phone_number } = this.props;
    if (this.phone.getISOCode()) {
      const country_code  = this.phone.getCountryCode();
  
      this.props.getPaymentTexts({prop:'phone_number',value:{
        code:country_code,
        number:phone_number.number
      }});
    }
    else {
      this.props.getPaymentTexts({prop:'phone_number',value:{
        code:'',
        number:phone_number.number
      }});
    }
const num = number;
    this.props.getPaymentTexts({prop:'phone_number',value:{
      code:phone_number.code,
      number:num
    }});

  };

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
    changePaymentOnline=(payment_online)=>{
        const {show_payment_online_modal,show_payment_upon_delivery_modal,payment_upon_delivery}=this.props
        this.props.getPaymentTexts({
          prop: "payment_online",
          value: !payment_online
        })
        this.props.getPaymentTexts({
          prop: "payment_upon_delivery",
          value: false
        })
                if(!payment_online)
                this.props.showPaymentOnlineModal(!show_payment_online_modal)
             
    }
    changePaymentUponDelivery=(payment_upon_delivery)=>{
        const {show_payment_upon_delivery_modal,payment_online}=this.props
        this.props.getPaymentTexts({
          prop: "payment_upon_delivery",
          value: !payment_upon_delivery
        })
        this.props.getPaymentTexts({
          prop: "payment_online",
          value: false
        })
       

             
    }
    payOnline=()=>{
      const {show_payment_online_modal}=this.props;
      this.setState({form_submitted:true})
      this.props.showPaymentOnlineModal(false)

    }
    payDelivery=()=>{

      const {show_payment_upon_delivery_modal,city,address,details,payment_upon_delivery}=this.props;
      console.log("kjfhjkh",city)
      this.setState({form_submitted:true})

    }
    goFromPayment = () => {
      var x=""
      var y=""
      const {show_payment_upon_delivery_modal,city,address,details,full_name,email,street_name,Bulding,floor,apartment_number,additional_description,phone_number,address_name,area,Bulding_type,customerInfo}=this.props;
this.setState({big_form_submitted:true})
var payment_status=""
if(this.props.payment_upon_delivery){
  payment_status="COD"
}
else if(this.props.payment_online){
payment_status="Visa"
}
      // this.props.showPaymentUponDeliveryModal(!show_payment_upon_delivery_modal)
      var type2=null
      if(this.state.type=="تأمين المركبات"||this.state.type=="Car Insurance"){
        type2=1
      }
      else if(this.state.type=="تأمين السفر"||this.state.type=="Travel Insurance"){
        type2=2
      }
      if(phone_number.number!=""&&customerInfo[0].customers_telephone==""){
        y=phone_number.number
      }
      else if(phone_number.number==""&&customerInfo[0].customers_telephone!=""){
y=customerInfo[0].customers_telephone
      }
      if(this.props.payment_upon_delivery){
        if(this.props.customerInfo[0].email==""&&email!="")
        {
          x=email
        }
        else if (this.props.customerInfo[0].email!=""&&email==""){
x=customerInfo[0].email
        }
      this.props.goFromPaymentUponDeliveryInformation(area,address,this.props.user_id,this.props.order_id,type2,this.props.company_name,this.props.company_name_ar,full_name,x,y,payment_status)
      this.props.resetTraveloCompletely()
      }
      else if(this.props.payment_online){
        console.log("erreeeeeee")
        if(this.props.customerInfo[0].email==""&&email!="")
        {
          x=email
        }
        else if (this.props.customerInfo[0].email!=""&&email==""){
x=customerInfo[0].email
        }
        // if(Actions.currentScene=="payment"){

        // Actions.DoneScreen({user_id:this.props.user_id})
        this.props.goFromPaymentUponDeliveryInformation(area,address,this.props.user_id,this.props.order_id,type2,this.props.company_name,this.props.company_name_ar,full_name,x,y,payment_status)

        // Actions.DoneScreen({user_id:this.props.user_id,order_id:this.props.order_id,company_name:this.props.company_name,company_name_ar:this.props.company_name_ar});

        this.props.resetTraveloCompletely()
        }
      // }
    }
  render(){
  const{payment_online,payment_upon_delivery,show_payment_online_modal,show_payment_upon_delivery_modal,data,months,payment_info_name,payment_info_credit_Card,payment_info_cvv,payment_info_ExMonth,payment_info_ExYear,lang,city,address,details,cities,customerInfo,email,street_name,Bulding,floor,apartment_number,additional_description,phone_number,address_name,area,Bulding_type}=this.props;
  const {form_submitted,big_form_submitted}=this.state
  console.log("cities",cities)
  console.log("this.props in payment",this.props)
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
        <Content disableKBDismissScroll={true}>

                <CardItem
              style={{
                width: dimensions.width,
                backgroundColor: "#fff",
                height: 66
              }}
            >
              {lang == "ar" ? (
                <View style={{marginLeft:280}}>
                  <Text style={{color:"#003580",fontSize:18,fontFamily:'TajawalBlack0',lineHeight:30}}>
                  {strings('payment.payment',lang)}
                  </Text>
                </View>
              ) : (
                <Left>
                  <Text style={{color:"#003580",fontSize:19,fontFamily:'TajawalBlack0',lineHeight:30}}>
                  {strings('payment.payment',lang)}
                  </Text>
                </Left>
              )}
            </CardItem>
   
   
             <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('payment.name_of_insured',lang)}{form_submitted && this.props.full_name == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                   <Input
                    disabled={true}
                     color="#fff"
                     value ={this.props.full_name}
                    //  placeholder ={strings('carInformation.id_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.props.full_name == ""? "red": "#171717",borderBottomWidth:form_submitted && this.props.full_name == "" ? 2 : 0}]}
                    //  onChangeText={value =>this.props.getCarInformationTexts({prop:"full_name",value})}
                   />
                   </View>
                 </Item>
               </CardItem>
       
               <CardItem style={transparentBackground} >
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('payment.insurance_type',lang)}</Label>
                   <Input
                    disabled={true}
                     color="#fff"
                     value ={this.state.type}
                    //  placeholder ={strings('carInformation.id_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}]}
                    //  onChangeText={value =>this.props.getCarInformationTexts({prop:"full_name",value})}
                   />
                   </View>
                 </Item>
               </CardItem>
               {this.props.addons!=undefined&&this.props.addons.length>0&&this.props.addons!=null?
        <View>
            <View style={{marginRight:lang=='ar'?15:null,marginLeft:lang=='en'?15:null,marginTop:20}}>
              <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.Additional_Services',lang)}</Text>     
            </View>
            {this.props.addons.map((addon, index) => {
                            


                      return (
       <View style={{marginRight:15,marginTop:15,marginLeft:lang=='en'?15:null}} key={addon.id}>
       {lang=='ar'?
          <Text style={{fontSize:14,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBold0'}}> {addon.addon_name_ar} {addon.price}</Text>
          :
          <Text style={{fontSize:14,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBold0'}}> {addon.addon_name} {addon.price}</Text>

                      }    
          </View> 
                      )
            })}
          
            </View>
            :null}
 
          <View  style={{borderWidth:1,borderColor:"#fff",marginTop:10}}></View>
               <View style={{marginRight:lang=='ar'?15:null,marginLeft:lang=='en'?15:null,marginTop:18}}>
              <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.contact_information',lang)}</Text>     
            </View>
{customerInfo[0].email!=""?
               <CardItem style={[transparentBackground,{marginTop:5}]}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('help.email',lang)}</Label>
                   <Input
                    disabled={true}
                     color="#fff"
                     value ={customerInfo[0].email}
                    //  placeholder ={strings('carInformation.id_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}]}
                    //  onChangeText={value =>this.props.getCarInformationTexts({prop:"full_name",value})}
                   />
                   </View>
                 </Item>
               </CardItem>
               :

               <CardItem style={[transparentBackground,{marginTop:20}]}>
               <Item style={transparentBorder}> 
               <View style={{flexDirection:'column',width:'100%'}}>
               <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('help.email',lang)}{big_form_submitted && email == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                 <Input
                   color="#fff"
                   value ={email}
                  //  placeholder ={strings('carInformation.id_number',lang)}
                   placeholderTextColor="#9B9B9B"
                   style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:big_form_submitted && email == ""? "red": "#171717",borderBottomWidth:big_form_submitted && email == ""?2:0}]}
                  //  onChangeText={value =>this.props.getCarInformationTexts({prop:"full_name",value})}
                  onChangeText={value =>
                    this.props.getPaymentTexts({
                      prop: "email",
                      value
                    })
                  }
                 />
                 </View>
               </Item>
             </CardItem>

          }
             
           {customerInfo[0].customers_telephone!=""?
               <CardItem style={{backgroundColor:"transparent"}}>
              <Item style={transparentBorder}>
              <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",lineHeight:20}]}>{strings('travelinsurance.phone_number',lang)}</Label>

<PhoneInput  ref={(ref) => { this.phone = ref; }}
block
                    initialCountry='jo'
                    style={phoneInputStyle}
                    value ={customerInfo[0].customers_telephone}
                    flagStyle={{marginLeft:10,height:30,width:40,flex:0.2}}
                    textStyle={{fontSize:18}}
                    onSelectCountry ={(country) => this.selectCountry(country)}
                    // onChangePhoneNumber= {(number)=> this.changePhoneNumber(number)}
                    isValidNumber
                    
                  /> 
</View>
              </Item>
            </CardItem>
            :
            <CardItem style={{backgroundColor:"transparent"}}>
            <Item style={transparentBorder}>
            <View style={{flexDirection:'column',width:'100%'}}>
               <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",lineHeight:20}]}>{strings('travelinsurance.phone_number',lang)}</Label>

<PhoneInput  ref={(ref) => { this.phone = ref; }}
block
                  initialCountry='jo'
                  style={phoneInputStyle}
                  value ={phone_number.number}
                  flagStyle={{marginLeft:10,height:30,width:40,flex:0.2}}
                  textStyle={{fontSize:18}}
                  onSelectCountry ={(country) => this.selectCountry(country)}
                  onChangePhoneNumber= {(number)=> this.changePhoneNumber(number)}
                  isValidNumber
                  
                /> 
</View>
            </Item>
          </CardItem>
          }
  
                      <View  style={{borderWidth:1,borderColor:"#fff"}}></View>

              <View style={{marginRight:lang=='ar'?15:null,marginLeft:lang=='en'?15:null,marginTop:18}}>
              <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.Delivery Address',lang)}</Text>     
            </View>
               {Platform.OS=="ios"?
               <CardItem style={[transparentBackground,{marginTop:5}]}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('payment.area',lang)}{big_form_submitted && area== ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('payment.area',lang)}
                      // placeholder={strings('travelinsurance.destination_from',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:big_form_submitted && area == ""? "red": "#171717",borderBottomWidth:big_form_submitted && area == ""?2:0}]}
                      selectedValue={area}
                      onValueChange={value =>
                        this.props.getPaymentTexts({prop:"area",value})
                      }
                     >
                          <Picker.Item
                        label={strings('payment.area',lang)}
                        value=""
                      />
                 {cities.map((item, index) => {
                      return (
                        <Picker.Item
                        key={item.zone_id}
                              label={item.zone_code}
                              value={item.zone_code}
                        />
                      );
                    })}
                    </Picker>
                    </View>
                </Item>
               </CardItem>
               :
               <CardItem style={transparentBackground}>
               <Item style={transparentBorder}>
               <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('payment.area',lang)}{big_form_submitted && area == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
      

<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
borderBottomColor:big_form_submitted && area == ""? "red": "#171717",borderBottomWidth:big_form_submitted && area == ""?2:0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={area}
                       onValueChange={value =>
                        this.props.getPaymentTexts({prop:"area",value})
                      }
                    
                       
                   >
                       <Picker.Item
                     label={strings('payment.area',lang)}
                     value=""
                   />
              {cities.map((item, index) => {
                   return (
                     <Picker.Item
                     key={item.zone_id}
                           label={item.zone_name}
                           value={item.zone_name}
                     />
                   );
                 })}
                 </Picker>
                 </View>
                 </View>
             </Item>
            </CardItem>
                  }
                         <CardItem style={[transparentBackground,{marginTop:20}]}>
               <Item style={transparentBorder}> 
               <View style={{flexDirection:'column',width:'100%'}}>
               <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('payment.address',lang)}{big_form_submitted && address == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
            
                   <Textarea  style={{height: 100,backgroundColor:"#fff", width:'100%',fontSize:18,fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:big_form_submitted && address == ""? "red": "#171717",borderBottomWidth:big_form_submitted && address == "" ? 2 : 0}}
                       value={address}
                       onChangeText={(value) => this.props.getPaymentTexts({prop:'address',value})}
                        autoCorrect={false}
                      />
                 </View>
               </Item>
             </CardItem>
            
         
                 <View  style={{borderWidth:1,borderColor:"#fff"}}></View>

                   <View style={{marginRight:lang=='ar'?15:null,marginLeft:lang=='en'?15:null,marginTop:18}}>
              <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.payment_method',lang)}</Text>     
            </View>
                       {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

            <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr",marginTop:5}]}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection: 'row',justifyContent: 'space-between',width:'100%',alignItems:'center'}}>
                 {Boolean(data.accept_visa)?

                 <View style={{flexDirection: 'row',width:'50%'}}>
                 <CheckBox
                        style={{marginRight:15,borderRadius:30,justifyContent:'center',alignItems:'center',paddingRight:4}}
                        checked={payment_online}
                        color="#003580"
                        onPress={() =>this.changePaymentOnline(payment_online)
                      
                    }
                      /> 
                      <Text style={{fontFamily:"TajawalMedium0",fontSize:12,marginTop:5}}>{strings('payment.Online_payment',lang)}</Text>
                 </View>
                 :null}
                 {Boolean(data.accept_cash)?

                 <View style={{flexDirection: 'row',width:'50%'}}>
                 <CheckBox
                        style={{marginRight:15,borderRadius:30,justifyContent:'center',alignItems:'center',paddingRight:4}}
                        checked={payment_upon_delivery}
                        color="#003580"
                        onPress={() =>this.changePaymentUponDelivery(payment_upon_delivery)
                
                          }
                      /> 
                       <Text style={{fontFamily:"TajawalMedium0",fontSize:12,marginTop:5}}>{strings('payment.Payment_upon_delivery',lang)}</Text>
          
                 </View>
                 :null}
                 </View>
         
                 </Item>
               </CardItem>
           :
           <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}>
           <Item style={transparentBorder}> 
           <View style={{flexDirection: 'row',justifyContent: 'space-between',width:'100%',alignItems:'center'}}>
           {Boolean(data.accept_cash)?

           <View style={{flexDirection: 'row',width:'50%',marginLeft:50}}>
           <Text style={{fontFamily:"TajawalMedium0",fontSize:12,marginTop:5}}>{strings('payment.Payment_upon_delivery',lang)}</Text>

           <CheckBox
                  style={{marginRight:15,borderRadius:30,justifyContent:'center',alignItems:'center',paddingRight:4}}
                  checked={payment_upon_delivery}
                  color="#003580"
                  onPress={() =>this.changePaymentUponDelivery(payment_upon_delivery)
          
                    }
                /> 
    
           </View>
           :null}
            {Boolean(data.accept_visa)?

           <View style={{flexDirection: 'row',width:'50%'}}>
           <Text style={{fontFamily:"TajawalMedium0",fontSize:12,marginTop:5}}>{strings('payment.Online_payment',lang)}</Text>

           <CheckBox
                  style={{marginRight:15,borderRadius:30,justifyContent:'center',alignItems:'center',paddingRight:4}}
                  checked={payment_online}
                  color="#003580"
                  onPress={() =>this.changePaymentOnline(payment_online)
                
              }
                /> 
           </View>
           :null}
       
           </View>
   
           </Item>
         </CardItem>
                       }
<View style={{backgroundColor:"#fff",marginTop:20}}>
{Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

<CardItem style={[transparentBackground,{marginTop:10,direction:lang=='ar'?"rtl":"ltr"}]} >
  <Left>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.Premium',lang)}</Text>
  </Left>
  <Right>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{this.props.total} JOD</Text>
  </Right>
</CardItem>
:
<CardItem style={[transparentBackground,{marginTop:10,flexDirection:"row-reverse"}]} >
<Right>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.Premium',lang)}</Text>
</Right>
<Left>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{this.props.total} JOD</Text>
</Left>
</CardItem>
}
{Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

<CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]} >
  <Left>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.delivery',lang)}</Text>
  </Left>
  <Right>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>0 JOD</Text>
  </Right>
</CardItem>
:
<CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]} >
<Right>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.delivery',lang)}</Text>
</Right>
<Left>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>0 JOD</Text>
</Left>
</CardItem>
}
{Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

<CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]} >
  <Left>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.total',lang)}</Text>
  </Left>
  <Right>
     <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{this.props.total} JOD</Text>
  </Right>
</CardItem>
:
<CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]} >
<Right>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{strings('payment.total',lang)}</Text>
</Right>
<Left>
   <Text style={{fontSize:16,textAlign:lang=='ar'?"right":"left",color:"#171717",fontFamily:'TajawalBlack0',lineHeight:25}}>{this.props.total} JOD</Text>
</Left>
</CardItem>
}

    </View>                    
                        {payment_online||payment_upon_delivery?
                                  lang=="en"?
              <CardItem style={transparentBackground}>
                <Body style={centerStyle}>
                  {/* <Button style={buttonStyle} block onPress={() => Actions.insurancecompanies()}> */}
                  <Button
                    style={buttonStyle}
                    block
                    onPress={()=>this.goFromPayment()}
                  >
                 
                    <Text style={buttonText}>{strings('payment.confirm',lang)} 
                 
                  
                    </Text>
                  </Button>
                </Body>
              </CardItem>
              :
              lang=="ar"?
                 <CardItem style={transparentBackground}>
                 <Body style={centerStyle}>
                 <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
          onPress={()=>this.goFromPayment()}>
  

           <Text style={buttonText}>{strings('payment.send',lang)}</Text>
         </TouchableOpacity>
                 </Body>
                 </CardItem>
                 :null
         
    :null}
            <Modal
            visible={show_payment_online_modal}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showPaymentOnlineModal(!show_payment_online_modal)
            }
            supportedOrientations={[
              "portrait",
              "portrait-upside-down",
              "landscape",
              "landscape-left",
              "landscape-right"
            ]}
            transparent
          >
         <ScrollView
            ref={ref => {
              this._scrollView = ref;
            }}>
              <View style={{backgroundColor:'rgba(0,0,0,0.50)',position:'relative',flex:1,justifyContent:'center',marginTop:30}}>
                <View style={{  borderWidth:1,borderRadius:5,borderColor:'#e3e3e3',padding:0,backgroundColor:'#fff',marginLeft:15,marginRight:15}}>
                <CardItem>
                <Left>
                <Icon style={{color:'#003580',fontSize:25}} name="md-close"   onPress={() =>this.props.showPaymentOnlineModal(!show_payment_online_modal)} />
            </Left>
                </CardItem>
         
                               <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color:
                          form_submitted && payment_info_credit_Card == ""
                            ? "red"
                            : "#171717"                        }
                      ]}
                    >
                     {strings('payment.Card_Number',lang)}
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
                  <CardItem>
                  <Item regular>
                  <Input
                  style={{fontFamily:'TajawalRegular0',textAlign: lang == "ar" ? "right" : "left",
                }}
                    maxLength={16}
                    autoCorrect={false}
                    onChangeText={value =>
                      this.props.getPaymentTexts({
                        prop: "payment_info_credit_Card",
                        value
                      })
                    }
                    value={payment_info_credit_Card}
                    placeholder="1234   5678   3456   2456"
                    placeholderTextColor="gray"
                  />
                </Item>
                  </CardItem>
   
                                  <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:form_submitted && payment_info_name == ""? "red": "#171717"                        }
                      ]}
                    >
                     {strings('payment.CARDHOLDER_NAME',lang)}
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
                  <CardItem>
            <Item regular>
              <Input
              style={{fontFamily:'TajawalRegular0',textAlign: lang == "ar" ? "right" : "left"}}
                autoCorrect={false}
                onChangeText={value =>
                  this.props.getPaymentTexts({
                    prop: "payment_info_name",
                    value
                  })
                }
                value={payment_info_name}
                placeholder="e.g John Doe"
                placeholderTextColor="gray"
              />
            </Item>
                  </CardItem>

                                        <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:form_submitted &&payment_info_ExMonth== "" &&payment_info_ExYear==""? "red": "#171717"                        }
                      ]}
                    >
                     {strings('payment.EXPIRE_DATE',lang)}
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
              {Platform.OS=="ios"?
                  <CardItem>
                  <Item style={transparentBorder}>
                  {lang=='ar'?
                  <Right>

                  <Picker
                    mode="dropdown"
              
                    iosHeader={strings('payment.Expiry_Month',lang)}
                    placeholder={strings('payment.Expiry_Month',lang)}
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',width:170,height:45}}
                    selectedValue={payment_info_ExMonth}
                    placeholderTextColor={
                      form_submitted && payment_info_ExMonth == ""
                        ? "red"
                        : "gray"
                    }
                    onValueChange={value =>
                      this.props.getPaymentTexts({
                        prop: "payment_info_ExMonth",
                        value
                      })
                    }
                  >
                    {months.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          style={{fontFamily:'TajawalRegular0',}}
                          label={item.month}
                          value={item.value}
                        />
                      );
                    })}
                  </Picker>
                  </Right>
                  :
                  <Left>

<Picker
                    mode="dropdown"
              
                    iosHeader={strings('payment.Expiry_Month',lang)}
                    placeholder={strings('payment.Expiry_Month',lang)}
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',width:180,height:45}}
                    selectedValue={payment_info_ExMonth}
                    placeholderTextColor={
                      form_submitted && payment_info_ExMonth == ""
                        ? "red"
                        : "gray"
                    }
                    onValueChange={value =>
                      this.props.getPaymentTexts({
                        prop: "payment_info_ExMonth",
                        value
                      })
                    }
                  >
                    {months.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          style={{fontFamily:'TajawalRegular0',}}
                          label={item.month}
                          value={item.value}
                        />
                      );
                    })}
                  </Picker>
                  </Left>
                  }
            </Item>
                  </CardItem>
                  :
                  <CardItem>
                  <Item style={transparentBorder}>
                  {lang=='ar'?
                  <Right>

                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0}}>
               
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:180}}
                       selectedValue={payment_info_ExMonth}
                       placeholder={strings('payment.Expiry_Month',lang)}

                       placeholderTextColor={
                        form_submitted && payment_info_ExMonth == ""
                          ? "red"
                          : "gray"
                      }
                       onValueChange={value =>
                        this.props.getPaymentTexts({
                          prop: "payment_info_ExMonth",
                          value
                        })
                      }
                    
                       
                   >
                    {months.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          style={{fontFamily:'TajawalRegular0',}}
                          label={item.month}
                          value={item.value}
                        />
                      );
                    })}
                  </Picker>
                  </View>
                  </Right>
                  :
                  <Left>



<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       placeholder={strings('payment.Expiry_Month',lang)}

                       placeholderTextColor={
                        form_submitted && payment_info_ExMonth == ""
                          ? "red"
                          : "gray"
                      }
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:180}}
                       selectedValue={payment_info_ExMonth}
                       onValueChange={value =>
                        this.props.getPaymentTexts({
                          prop: "payment_info_ExMonth",
                          value
                        })
                      }
                    
                       
                   >
                    {months.map((item, index) => {
                      return (
                        <Picker.Item
                          key={item.id}
                          style={{fontFamily:'TajawalRegular0',}}
                          label={item.month}
                          value={item.value}
                        />
                      );
                    })}
                  </Picker>
                  </View>
                  </Left>
                  }
            </Item>
                  </CardItem>
                }
                  <CardItem>
            <Item regular>
            <Input
                  style={{fontFamily:'TajawalRegular0',textAlign: lang == "ar" ? "right" : "left"}}
                    maxLength={4}
                    autoCorrect={false}
                    placeholder={strings('payment.Expiry_Year',lang)}
                    placeholderTextColor={
                      form_submitted && payment_info_ExYear == ""
                        ? "red"
                        : "gray"
                    }
                    onChangeText={value =>
                      this.props.getPaymentTexts({
                        prop: "payment_info_ExYear",
                        value
                      })
                    }
                    value={payment_info_ExYear}
                  />
            </Item>
                  </CardItem>

     
                                          <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:form_submitted &&payment_info_cvv==""? "red": "#171717"                        }
                      ]}
                    >
                    CVV
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
             <CardItem>
                 <Item regular>
                 <Input
                 style={{fontFamily:'TajawalRegular0',textAlign: lang == "ar" ? "right" : "left"}}
                    maxLength={3}
                    placeholder="e.g 123"
                    placeholderTextColor={
                      form_submitted && payment_info_cvv == ""
                        ? "red"
                        : "gray"
                    }
                    autoCorrect={false}
                    onChangeText={value =>
                      this.props.getPaymentTexts({
                        prop: "payment_info_cvv",
                        value
                      })
                    }
                    value={payment_info_cvv}
                  />
                 </Item>
             </CardItem>
             <CardItem>
               {lang=='en'?
                    <Left>
                    <CheckBox
                        style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4}}
                        checked={false}
                        color="#003580"
                    
                      />
                    <Text style={{fontFamily:"TajawalRegular0"}}>{strings('payment.SAVEـCARD',lang)}</Text>
                    </Left>
                    :
                    <Left style={{marginLeft:180}}>
                    <Text style={{fontFamily:"TajawalRegular0"}}>{strings('payment.SAVEـCARD',lang)}</Text>
                    <CheckBox
                        style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4}}
                        checked={false}
                        color="#003580"
                    
                      />
                    </Left>
               }
                  </CardItem>

              
                        <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
                    <Button style={{backgroundColor:"#003580"}}block onPress={this.payOnline}>
                      <Text style={buttonText}>{strings('payment.Pay_now',lang)}</Text>
                    </Button>
                    </Body>
                  </ListItem>
                </View>
              </View>
              </ScrollView>
          </Modal>
          {/* ***************** */}
          <Modal
            visible={show_payment_upon_delivery_modal}
            animationType={"slide"}
            onRequestClose={() =>
              this.props.showPaymentUponDeliveryModal(!show_payment_upon_delivery_modal)
            }
            supportedOrientations={[
              "portrait",
              "portrait-upside-down",
              "landscape",
              "landscape-left",
              "landscape-right"
            ]}
            transparent
          >
         
           <ScrollView
            ref={ref => {
              this._scrollView = ref;
            }}
            height="100%"
          > 
              <View style={{backgroundColor:'rgba(0,0,0,0.50)',position:'relative',flex:1,justifyContent:'center',marginTop:Platform.OS=="ios"?60:30}}>
                <View style={{  borderWidth:1,borderRadius:5,borderColor:'#e3e3e3',padding:0,backgroundColor:'#fff',marginLeft:15,marginRight:15}}>
                <CardItem>
                <Left>
                <Icon style={{color:'#003580',fontSize:25}} name="md-close"  onPress={() => this.props.showPaymentUponDeliveryModal(!show_payment_upon_delivery_modal)} />
            </Left>
                </CardItem>
   
                                            <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:"#171717"                        }
                      ]}
                    >
                    {strings('payment.city',lang)}{form_submitted && city == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
              {Platform.OS=="ios"?
            
                  <CardItem>
                  <Item regular>
       
                  <Picker
                        mode="dropdown"
                        iosHeader={strings('payment.city',lang)}
                        // placeholder={strings('carInformation.car_type',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={
                          {
                            borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:45,width:"65%",

                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && city == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && city == "" ? 2 : 0
                          }
                        }
                        selectedValue={city}
                        onValueChange={value =>
                          this.props.getPaymentTexts({
                            prop: "city",
                            value
                          })
                        }
                      >
                        {cities.map((item, index) => {
                          return (
                            <Picker.Item
                              key={item.zone_id}
                              label={item.zone_name}
                              value={item.zone_name}
                            />
                          );
                        })}
                      </Picker>
                </Item>
                  </CardItem>
                  :
                         
                  <CardItem>
                  <Item regular>
    

<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
 borderBottomColor:
 form_submitted && city == ""
   ? "red"
   : "#171717",
borderBottomWidth:
 form_submitted && city == "" ? 2: 0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:290}}
                       selectedValue={city}
                       onValueChange={value =>
                        this.props.getPaymentTexts({
                          prop: "city",
                          value
                        })
                      }
                    
                       
                   >
                        {cities.map((item, index) => {
                          return (
                            <Picker.Item
                              key={item.zone_id}
                              label={item.zone_name}
                              value={item.zone_name}
                            />
                          );
                        })}
                      </Picker>
                      </View>
                </Item>
                  </CardItem>
                      }
                 
                                                  <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:"#171717"                        }
                      ]}
                    >
                    {strings('payment.address',lang)} {form_submitted && address == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
      
                  </View>
                </Item>
              </CardItem>
                  <CardItem>
                  <Item regular>
                  <Input
                  style={{fontFamily:'TajawalRegular0',textAlign:lang=="ar"?"right":"left",borderBottomColor:form_submitted && address == ""? "red": "#171717",borderBottomWidth:form_submitted && address == "" ? 2 : 0}}
                    maxLength={16}
                    autoCorrect={false}
                    onChangeText={value =>
                      this.props.getPaymentTexts({
                        prop: "address",
                        value
                      })
                    }
                    value={address}
                    // placeholder="Address"
                    placeholderTextColor="gray"
                  />
                </Item>
                  </CardItem>
       
                                                    <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,{textAlign: lang == "ar" ? "right" : "left",color:"#171717"                        }
                      ]}
                    >
                    {strings('payment.details',lang)}   {form_submitted && details == ""?<Text style={{color:"red"}}>*</Text>:null}                 </Label>
      
                  </View>
                </Item>
              </CardItem>
                  <CardItem>
                  <Item regular>

                  <Textarea  style={{height: 100, width:'100%',fontSize:18,fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && details == ""? "red": "#171717",borderBottomWidth:form_submitted && details == "" ? 2 : 0}}
                       value={details}
                       onChangeText={(value) => this.props.getPaymentTexts({prop:'details',value})}
                        autoCorrect={false}
                      />
                      </Item>
                  </CardItem>
                  <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
                    <Button style={{backgroundColor:"#003580"}}block onPress={this.payDelivery}>
                      <Text style={buttonText}>{strings('drivinglicense.continue',lang)}</Text>
                    </Button>
                    </Body>
                  </ListItem>
                </View>
              </View>
  
              </ScrollView>
          </Modal>
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
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const {customerInfo}=state.homeReducer;

    const { payment_online,payment_upon_delivery,show_payment_online_modal,show_payment_upon_delivery_modal,months,payment_info_name,payment_info_credit_Card,payment_info_cvv,payment_info_ExMonth,payment_info_ExYear,address,city,details,cities,email,area,Bulding_type,street_name,Bulding,floor,apartment_number,additional_description,phone_number,address_name} = state.paymentReducer;
    return {  payment_online,payment_upon_delivery,show_payment_online_modal,show_payment_upon_delivery_modal,months,payment_info_name,payment_info_credit_Card,payment_info_cvv,payment_info_ExMonth,payment_info_ExYear,lang,address,city,details,cities,customerInfo,email,street_name,Bulding,floor,apartment_number,additional_description,phone_number,address_name,area,Bulding_type};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,{...paymentAction,...homeAction})(Payment);