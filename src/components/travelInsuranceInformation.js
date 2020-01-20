
import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Keyboard,StatusBar,TouchableOpacity,Platform} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Item,Input,Picker,Card,Label,Drawer} from 'native-base';
import {transparentBackground,transparentBorder,inputStyle,centerStyle,buttonStyle,buttonText,pickerStyle,labelStyle} from '../theme';
import * as travelInsuranceAction from '../actions/travelInsuranceAction';
import * as shippingInsuranceAction from '../actions/shippingInsuranceAction';

import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import DatePicker from 'react-native-datepicker';
import Header from './header';
import SideBar from "./sideBar";
const dimensions=Dimensions.get('window');
class TravelInsuranceInformation extends Component{
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
        const { travel_insurance_msg} = this.props;
         if (travel_insurance_msg != null) {
           setTimeout(()=> this.props.resetTravelInsuranceMessage(),300);
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
      const {travel_insurance_msg} = this.props;
      if (travel_insurance_msg != null) {
        if (travel_insurance_msg.isError) {
          this.onError(travel_insurance_msg.msg);
        } else if (travel_insurance_msg.isSuccess) {
          this.onSuccess(travel_insurance_msg.msg);
        } else {
          return;
        }
      }
    };
    goFromTravelInsurance=()=>{
      this.setState({form_submitted:true})
        const {from,to,days_to_stay,age,user_id,lang,category_id} = this.props;
        this.props.goFromTravelInsurance(from,to,days_to_stay,age,user_id,category_id,strings('message.fill_message',lang));
    
 
      }
      closeDrawer = () => {
        this.drawer._root.close();
    
      };
    
      
    
      openDrawer = () => {
        
        this.drawer._root.open();
        setTimeout(() => Keyboard.dismiss());
      };
    render(){
      const {from,to,lang,days_to_stay,countries,age}=this.props
      const {form_submitted}=this.state
let a=''
if(lang=='ar'){
  a="الأردن"
}
else {
  a="Jordan"
}

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

              <View style={{backgroundColor:'transparent',borderColor:'transparent'}}>
  
                    <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.destination_from',lang)}{form_submitted && from == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                   <Input
                   disabled={true}
                     color="#fff"
                     value ={a}
                    //  placeholder ={strings('carInformation.id_number',lang)}
                     placeholderTextColor="#9B9B9B"
                     style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && from == ""? "red": "#171717",borderBottomWidth:form_submitted && from == ""?2:0}]}
                     onChangeText={value =>this.props.getTravelInsuranceTexts({prop:"from",value})}
                   />
                   </View>
                 </Item>
               </CardItem>
          {Platform.OS=="ios"?
                        <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.destination_to',lang)}{form_submitted && to == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('travelinsurance.destination_to',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && to == ""? "red": "#171717",borderBottomWidth:form_submitted && to == ""?2:0}]}
                      selectedValue={to}
                      onValueChange={value =>
                        this.props.getTravelInsuranceTexts({prop:"to",value})
                      }
                     >
                     <Picker.Item label={strings('travelinsurance.choose_to',lang)} value="" />
                     {/* <Picker.Item label={strings('travelinsurance.usa',lang)} value="1" /> */}
                     <Picker.Item label={strings('travelinsurance.europe',lang)}value="2" />
                     {/* <Picker.Item label={strings('travelinsurance.uk',lang)}value="3" /> */}
                     <Picker.Item label={strings('travelinsurance.world_wide',lang)} value="4" />

                    </Picker>
                    </View>
                </Item>
               </CardItem>
:
<CardItem style={transparentBackground}>
<Item style={transparentBorder}>
<View style={{flexDirection:'column',width:'100%'}}>
<Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.destination_to',lang)}{form_submitted && to == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>


<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
borderBottomColor:form_submitted && to == ""? "red": "#171717",borderBottomWidth:form_submitted && to == ""?2:0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={to}
                       onValueChange={value =>
                        this.props.getTravelInsuranceTexts({prop:"to",value})
                      }
                    
                       
                   >
   <Picker.Item label={strings('travelinsurance.choose_to',lang)} value="" />
   {/* <Picker.Item label={strings('travelinsurance.usa',lang)} value="1" /> */}
   <Picker.Item label={strings('travelinsurance.europe',lang)}value="2" />
   {/* <Picker.Item label={strings('travelinsurance.uk',lang)}value="3" /> */}
   <Picker.Item label={strings('travelinsurance.world_wide',lang)} value="4" />

  </Picker>
  </View>
  </View>
</Item>
</CardItem>
                    }
                    {Platform.OS=="ios"?
                 <CardItem style={transparentBackground}>
                 <Item style={transparentBorder}> 
                 <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.days_to_stay',lang)}{form_submitted && days_to_stay == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
               
                          <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('travelinsurance.days_to_stay',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && days_to_stay == ""? "red": "#171717",borderBottomWidth:form_submitted && days_to_stay == ""?2:0}]}
                      selectedValue={days_to_stay}
                      onValueChange={value =>
                        this.props.getTravelInsuranceTexts({prop:"days_to_stay",value})
                      }
                     >
                    <Picker.Item label={strings('travelinsurance.days_to_stay_choose',lang)}value="" />
                     <Picker.Item label={strings('travelinsurance.7days',lang)}value="1" />
                     <Picker.Item label={strings('travelinsurance.14days',lang)}value="2" />
                     <Picker.Item label={strings('travelinsurance.21days',lang)} value="3" />
                     <Picker.Item label={strings('travelinsurance.31days',lang)}value="4" />
                     <Picker.Item label={strings('travelinsurance.62days',lang)} value="5" />
                     <Picker.Item label={strings('travelinsurance.92days',lang)} value="6" />
                     <Picker.Item label={strings('travelinsurance.6month',lang)} value="7" />
                     <Picker.Item label={strings('travelinsurance.1year',lang)}value="8" />
                     <Picker.Item label={strings('travelinsurance.2year',lang)} value="9" />
                     <Picker.Item label={strings('travelinsurance.3year',lang)}value="10" />
                     <Picker.Item label={strings('travelinsurance.4year',lang)} value="11" />
                     <Picker.Item label={strings('travelinsurance.5year',lang)} value="12" />

                    </Picker>
                   </View>
                 </Item>
               </CardItem>
:
<CardItem style={transparentBackground}>
<Item style={transparentBorder}> 
<View style={{flexDirection:'column',width:'100%'}}>
<Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('travelinsurance.days_to_stay',lang)}{form_submitted && days_to_stay == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>


<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
borderBottomColor:form_submitted && days_to_stay == ""? "red": "#171717",borderBottomWidth:form_submitted && days_to_stay == ""?2:0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={days_to_stay}
                       onValueChange={value =>
                        this.props.getTravelInsuranceTexts({prop:"days_to_stay",value})
                      }
                    
                       
                   >
   <Picker.Item label={strings('travelinsurance.days_to_stay_choose',lang)}value="" />
    <Picker.Item label={strings('travelinsurance.7days',lang)}value="1" />
    <Picker.Item label={strings('travelinsurance.14days',lang)}value="2" />
    <Picker.Item label={strings('travelinsurance.21days',lang)} value="3" />
    <Picker.Item label={strings('travelinsurance.31days',lang)}value="4" />
    <Picker.Item label={strings('travelinsurance.62days',lang)} value="5" />
    <Picker.Item label={strings('travelinsurance.92days',lang)} value="6" />
    <Picker.Item label={strings('travelinsurance.6month',lang)} value="7" />
    <Picker.Item label={strings('travelinsurance.1year',lang)}value="8" />
    <Picker.Item label={strings('travelinsurance.2year',lang)} value="9" />
    <Picker.Item label={strings('travelinsurance.3year',lang)}value="10" />
    <Picker.Item label={strings('travelinsurance.4year',lang)} value="11" />
    <Picker.Item label={strings('travelinsurance.5year',lang)} value="12" />

   </Picker>
   </View>
  </View>
</Item>
</CardItem>
                    }
                    {Platform.OS=="ios"?
               <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                  <View style={{flexDirection:'column',width:'100%'}}>
                 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717"}]}>{strings('lifeinsurance.age',lang)}{form_submitted && age == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
                    <Picker
                      mode="dropdown"
                      
                      iosHeader={strings('lifeinsurance.age',lang)}
                      // placeholder={strings('lifeinsurance.age',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#9B9B9B" }}
                      style={[pickerStyle,{fontFamily:'TajawalRegular0',fontFamily:'TajawalRegular0',direction:lang=='ar'?'rtl':'ltr',borderBottomColor:form_submitted && age == ""? "red": "#171717",borderBottomWidth:form_submitted && age == ""?2:0}]}
                      selectedValue={age}
                      onValueChange={value =>
                        this.props.getTravelInsuranceTexts({
                          prop: "age",
                          value
                        })
                      }
                     >
                     <Picker.Item label={strings('lifeinsurance.choose_age',lang)}value="" />
                    <Picker.Item label={strings('travelinsurance.Till 65 Years',lang)}value="1" />
                     <Picker.Item label={strings('travelinsurance.65-75',lang)} value="2" />
                     <Picker.Item label={strings('travelinsurance.76-80',lang)}value="3" />
                     <Picker.Item label={strings('travelinsurance.Over 80 Years',lang)}value="3" />

                    </Picker>
                    </View>
                </Item>
               </CardItem>
               :
               <CardItem style={transparentBackground}>
               <Item style={transparentBorder}>
               <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717"}]}>{strings('lifeinsurance.age',lang)}{form_submitted && age == ""?<Text style={{color:"red"}}>*</Text>:null}</Label>
    

<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
borderBottomColor:form_submitted && age == ""? "red": "#171717",borderBottomWidth:form_submitted && age == ""?2:0
}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={age}
                       onValueChange={value =>
                        this.props.getTravelInsuranceTexts({
                          prop: "age",
                          value
                        })
                      }
                    
                       
                   >
                  <Picker.Item label={strings('lifeinsurance.choose_age',lang)}value="" />
                 <Picker.Item label={strings('travelinsurance.Till 65 Years',lang)}value="1" />
                  <Picker.Item label={strings('travelinsurance.65-75',lang)} value="2" />
                  <Picker.Item label={strings('travelinsurance.76-80',lang)}value="3" />
                  <Picker.Item label={strings('travelinsurance.Over 80 Years',lang)}value="3" />

                 </Picker>
                 </View>
                 </View>
             </Item>
            </CardItem>
                    }
               {lang=="en"?
               <CardItem style={transparentBackground}>
               
                <Body style={centerStyle}>
         
                               <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromTravelInsurance}>
                          <Text style={[buttonText,{marginBottom:Platform.OS=="android"?5:null}]}>{strings('drivinglicense.continue',lang)}
                   </Text>
                   <Icon name='md-arrow-round-forward'style={{color:'#fff'}}/> 
                   </TouchableOpacity>
                </Body>
            </CardItem>
            :null}
            {lang=="ar"?
                <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                    <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromTravelInsurance}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
                    </Body>
                    </CardItem>
                    :null}
            </View>
           

            </ScrollView>
            <Text>{this.showAlert()}</Text>

            <DropdownAlert replaceEnabled={true}  titleStyle={{textAlign:lang=='ar'? 'right':'left',fontFamily:'TajawalBold0',color:"#fff"}} messageStyle={{textAlign:lang=='ar'?'right':'left',fontFamily:'TajawalBold0',color:"#fff"}}imageStyle={{direction:'rtl'}} ref={(ref) => this.dropdown = ref}  />    
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

    const { full_name,passport_number,travel_insurance_msg,from,travel_date,to,days_to_stay,age} = state.travelInsuranceReducer;
    return {full_name,passport_number,travel_insurance_msg,from,lang,travel_date,to,days_to_stay,countries,age};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,{
    ...travelInsuranceAction,
    ...shippingInsuranceAction})
    (TravelInsuranceInformation);