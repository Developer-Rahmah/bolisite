import React, { Component } from 'react';
import {ImageBackground,Dimensions,Platform,View,Keyboard,StatusBar,Modal,TouchableOpacity,ActivityIndicator} from 'react-native';
import {CardItem,Body,Text,Right,Left,Card, Content,Drawer,
Button,Icon,Item,Picker,ListItem,Input} from 'native-base';
import * as orderPageAction from '../actions/ordersPageAction';
import { connect } from 'react-redux';
import {VerticalWrapper} from "./common/VerticalWrapper";
import {Spinner} from "./common/Spinner";
import Header from './header';
import SideBar from "./sideBar";
import {centerStyle,buttonStyle,transparentBackground,buttonText,pickerStyle,inputStyle} from '../theme';
import {strings} from '../../Locales/i18n';
import { Actions } from 'react-native-router-flux';

var filterOrders=[]

var twoWeek=[]



const dimensions=Dimensions.get('window');
class OrderPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
       carOrders:[],
      lifeOrders:[],
        cargoOrders:[],
      healthOrders:[],
      travelOrders:[],
      servantOrders:[],
        resturantOrders:[],
        cancerOrders:[],
      orderId: null,
      form_submitted: false,
      isReasonChecked: false,
show_cars:false,
show_life:false,
show_health:false,
show_travel:false,
show_cargo:false,
show_servant:false,
show_resturant:false,
show_cancer:false,
show_two_week:false,
show_month:false,
show_three_months:false,
show_more:false,
      reason:'',
    oneMonth:[],
 threeMonths:[],
 morethanThree:[]


    };
  }
  componentWillMount() {
    setTimeout(()=> this.props.resetFilterValues(),300);

    this.props.getReasons();

const {user_id,lang}=this.props
var language_id=null
if(lang=='ar')
{
  language_id=4
}
else{
  language_id=1
}
    this.props.getOrders(user_id,language_id);
  }

  componentDidUpdate() {
    const {orders} = this.props;

  }

  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  count = (value) => {
  
    value.isChecked = !value.isChecked;
    this.setState({isReasonChecked: value.isChecked});
    

  };
  goToAnotherPage=(reason,reason_message)=>{
    console.log("reasons",reason)
    console.log("reasons_message",reason_message)

    var language_id
    if(this.props.lang=='ar')
    {
      language_id=4
    }
    else{
      language_id=1
    }

this.props.sendReason(this.state.orderId,reason,this.props.user_id,language_id,reason_message)
  }

  showModal = (id) => {
 const {show_order_modal}=this.props;
    this.setState({orderId: id});
   
    // this.props.getTerms(id);
    this.props.showCancelOrderModal(!show_order_modal);

  };
  onValueChangeDate(value) {
    const {user_id,lang}=this.props
var language_id=null
if(lang=='ar')
{
  language_id=4
}
else{
  language_id=1
}
    var m=""
    this.props.getOrdersTexts({
      prop: "order_category",
      m
    })

    const {orders}=this.props
  this.props.getOrdersTexts({
                          prop: "order_days",
                          value
                        })
       
                        if(value=="last_one_month"){
                        this.setState({show_month:true})
                          this.props.getOrders(user_id,language_id,30);

                        }
                        else if(value=="last_three_month"){
                          this.setState({show_three_months:true})

                          this.props.getOrders(user_id,language_id,60);

                        }
                        
                        else if(value=="more_than_three_months"){
                          this.setState({show_more:true})

                          this.props.getOrders(user_id,language_id,365);

                        }
                        else if(value="جميع الطلبات"){
                          this.props.getOrders(user_id,language_id)
                        }
  

                      
                

    
  
  }
  rejectOrder=(order_id)=>{
    const{user_id,lang}=this.props
    var language_id=null
if(lang=='ar')
{
  language_id=4
}
else{
  language_id=1
}
    this.props.rejectOrder(order_id,user_id,language_id)
  }
  onValueChange2(value) {
    const {orders,user_id,lang}=this.props

    var language_id=null
if(lang=='ar')
{
  language_id=4
}
else{
  language_id=1
}
    var m=""
    this.props.getOrdersTexts({
      prop: "order_days",
      m
    })
  
  this.props.getOrdersTexts({
                          prop: "order_category",
                          value
                        })
//                         for (var i=0;i<orders.length;i++){
// if(orders[i].Insurance_Type=="تأمين سيارات"||orders[i].Insurance_Type=="Cars Insurance"){

// this.setState({
//   carOrders: [...this.state.carOrders, orders[i]]})
// console.log("orders[i] car orders",this.state.carOrders)
// }
// else if(orders[i].Insurance_Type=="تأمين الحياة"||orders[i].Insurance_Type=="Life Insurance"){
//   this.setState({
//     lifeOrders: [...this.state.lifeOrders, orders[i]]}) 
//      console.log("orders[i] lifeOrders",this.state.lifeOrders)

//   }

//   else if(orders[i].Insurance_Type=="تامين الصحة"||orders[i].Insurance_Type=="Health"){
//     this.setState({
//       healthOrders: [...this.state.healthOrders, orders[i]]})
//     }
//     else if(orders[i].Insurance_Type=="تامين السفر"||orders[i].Insurance_Type== "Travel Insurance"){
//       this.setState({travelOrders:[]})
//       this.setState({
//         travelOrders: [...this.state.travelOrders, orders[i]]})
//       }
//       else if(orders[i].Insurance_Type=="تأمين الخادمات"||orders[i].Insurance_Type=="Servant Orders"){
//         this.setState({
//           servantOrders: [...this.state.servantOrders, orders[i]]})
//         }
//         else if(orders[i].Insurance_Type=="تامين المطاعم"||orders[i].Insurance_Type== "Restaurants Orders"){
//           this.setState({
//             resturantOrders: [...this.state.resturantOrders, orders[i]]})
//           }
//           else if(orders[i].Insurance_Type=="تأمين البضائع"||orders[i].Insurance_Type== "Cargo Insurance"){
//             this.setState({
//               cargoOrders: [...this.state.cargoOrders, orders[i]]})
            
//             }
//             else if(orders[i].Insurance_Type=="برنامج رعاية السرطان"||orders[i].Insurance_Type=="Cancer Care"){
//               this.setState({
//                 cancerOrders: [...this.state.cancerOrders, orders[i]]})
//               }


// }
if(value=="تأمين سيارات"){
  this.setState({show_cars:true})
  this.props.getOrders(user_id,language_id,null,36);

}
else if(value=="تأمين الحياة"){
  
  this.setState({show_life:true})
  this.props.getOrders(user_id,language_id,null,35);

}
else if(value=="تامين الصحة"){
  this.setState({show_health:true})
  this.props.getOrders(user_id,language_id,null,39);


}
else if(value=="تامين السفر"){
  this.setState({show_travel:true})
  this.props.getOrders(user_id,language_id,null,37);


}
else if(value=="تأمين البضائع"){
  this.setState({show_cargo:true})
  this.props.getOrders(user_id,language_id,null,38);


}
else if(value=="برنامج رعاية السرطان"){
  this.setState({show_cancer:true})
  this.props.getOrders(user_id,language_id,null,42);


}
else if(value=="تأمين الخادمات"){
  this.setState({show_servant:true})
  this.props.getOrders(user_id,language_id,null,41);


}
else if(value=="تامين المطاعم"){
  this.setState({show_resturant:true})
  this.props.getOrders(user_id,language_id,null,40);


}
else if(value="جميع الطلبات"){
  this.props.getOrders(user_id,language_id)
}
  
}
onValueChange3(value) {
  console.log("value",value)
  this.setState({reason:value})
}
    render(){
      console.log("orders cars",this.state.carOrders)
      console.log("travelOrders",this.state.travelOrders)

      const {orders,orders_loading,lang,show_order_modal,reasons,order_category,order_days}=this.props
      const {reason}=this.state;
      const {form_submitted}=this.state
      if(order_category=="تأمين سيارات"){
        filterOrders=this.state.carOrders
      }
      else if(order_category=="تأمين الحياة"){
        
        filterOrders=this.state.lifeOrders
      }
      else if(order_category=="تامين الصحة"){
        filterOrders=this.state.healthOrders
      
      }
      else if(order_category=="تامين السفر"){
        filterOrders=this.state.travelOrders
      
      }
      else if(order_category=="تأمين البضائع"){
        filterOrders=this.state.cargoOrders
      
      }
      else if(order_category=="برنامج رعاية السرطان"){
        filterOrders=this.state.cancerOrders
      
      }
      else if(order_category=="تأمين الخادمات"){
        filterOrders=this.state.servantOrders
      
      }
      else if(order_category=="تامين المطاعم"){
        filterOrders=this.state.resturantOrders
      
      }
console.log("orders",orders)
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
<Content>
  {/* {orders.length>0&&this.state.show_cars? */}
    {Platform.OS=="android"?
<CardItem style={transparentBackground}>
<Left>

                            <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={order_category}
                       onValueChange={value =>         this.onValueChange2(value)
                      
                       }
                    
                       
                   >
             <Picker.Item
                        label={strings('order_page.Filter by type',lang)}
                        value=""
                      />
                      <Picker.Item
                        label={strings('order_page.car_insurance',lang)}
                        value="تأمين سيارات"
                      />
                      <Picker.Item
                        label={strings('order_page.life_insurance',lang)}
                        value="تأمين الحياة"
                      />
                         <Picker.Item
                        label={strings('order_page.health_insurance',lang)}
                        value="تامين الصحة"
                      />
                         <Picker.Item
                        label={strings('order_page.travel_insurance',lang)}
                        value="تامين السفر"
                      />
                         <Picker.Item
                        label={strings('order_page.servant_insurance',lang)}
                        value="تأمين الخادمات"
                      />
                           <Picker.Item
                        label={strings('order_page.resturants_insurance',lang)}
                        value="تامين المطاعم"
                      />
                           <Picker.Item
                        label={strings('order_page.cargo_insurance',lang)}
                        value="تأمين البضائع"
                      />
                             <Picker.Item
                        label={strings('order_page.cancer_insurance',lang)}
                        value="برنامج رعاية السرطان"
                      />
                                  <Picker.Item
                        label={strings('order_page.all_orders',lang)}
                        value="جميع الطلبات"
                      />
   
                     
                   </Picker>
                   </View>


<View style={{height:10}}/>



                    </Left>
                    </CardItem>
                    :
<CardItem style={transparentBackground}>
<Left>
<Picker
                      mode="dropdown"
                      placeholder={strings('order_page.Filter by type',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{color: "#9B9B9B"}}
                      style={[
                        pickerStyle,
                        {
                          direction: lang == "ar" ? "rtl" : "ltr",
                          
                        }
                      ]}
                      selectedValue={order_category}
                      onValueChange={value =>         this.onValueChange2(value)
                      
                      }
                    >
                  
                      <Picker.Item
                        label={strings('order_page.car_insurance',lang)}
                        value="تأمين سيارات"
                      />
                      <Picker.Item
                        label={strings('order_page.life_insurance',lang)}
                        value="تأمين الحياة"
                      />
                         <Picker.Item
                        label={strings('order_page.health_insurance',lang)}
                        value="تامين الصحة"
                      />
                         <Picker.Item
                        label={strings('order_page.travel_insurance',lang)}
                        value="تامين السفر"
                      />
                         <Picker.Item
                        label={strings('order_page.servant_insurance',lang)}
                        value="تأمين الخادمات"
                      />
                           <Picker.Item
                        label={strings('order_page.resturants_insurance',lang)}
                        value="تامين المطاعم"
                      />
                           <Picker.Item
                        label={strings('order_page.cargo_insurance',lang)}
                        value="تأمين البضائع"
                      />
                             <Picker.Item
                        label={strings('order_page.cancer_insurance',lang)}
                        value="برنامج رعاية السرطان"
                      />
                                  <Picker.Item
                        label={strings('order_page.all_orders',lang)}
                        value="جميع الطلبات"
                      />
                    </Picker>

                    </Left>
                    </CardItem>


                    }
                    {/* {orders.length>0? */}
                    {Platform.OS=="android"?
                  <CardItem style={transparentBackground}>
<Left>
<View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={order_days}
                       onValueChange={value =>this.onValueChangeDate(value)
                  
                       } 
              
                       
                   >
                  
              
                
                      <Picker.Item
                        label={strings('order_page.last_one_month',lang)}
                        value="last_one_month"
                      />
                         <Picker.Item
                        label={strings('order_page.last_three_month',lang)}
                        value="last_three_month"
                      />
                         <Picker.Item
                        label={strings('order_page.more_than_three_months',lang)}
                        value="more_than_three_months"
                      />
                   
                                  <Picker.Item
                        label={strings('order_page.all_orders',lang)}
                        value="جميع الطلبات"
                      />
                    </Picker>
                    </View>


<View style={{height:10}}/>
            
                    </Left>
                    </CardItem> 
                    :
                    <CardItem style={transparentBackground}>
                    <Left>
                    <Picker
                                          mode="dropdown"
                                          // placeholder={strings('order_page.Filter_by_date',lang)}
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholderStyle={{color: "#9B9B9B"}}
                                          style={[
                                            pickerStyle,
                                            {
                                              direction: lang == "ar" ? "rtl" : "ltr",
                                              
                                            }
                                          ]}
                                          selectedValue={order_days}
                                          onValueChange={value =>this.onValueChangeDate(value)
                                      
                                          }
                                        >
                                      
                                 
                                      
                                    
                                          <Picker.Item
                                            label={strings('order_page.last_one_month',lang)}
                                            value="last_one_month"
                                          />
                                             <Picker.Item
                                            label={strings('order_page.last_three_month',lang)}
                                            value="last_three_month"
                                          />
                                             <Picker.Item
                                            label={strings('order_page.more_than_three_months',lang)}
                                            value="more_than_three_months"
                                          />
                                       
                                                      <Picker.Item
                                            label={strings('order_page.all_orders',lang)}
                                            value="جميع الطلبات"
                                          />
                                        </Picker>
                                       
                                        </Left>
                                        </CardItem> 
                    // :null
                  }
{!orders_loading?

              // ((orders.length > 0&&(!this.state.show_cars&&!this.state.show_travel&&!this.state.show_life&&!this.state.show_health&&!this.state.show_cargo&&!this.state.show_resturant&&!this.state.show_servant&&!this.state.show_cancer&&!this.state.show_month&&!this.state.show_three_months&&!this.state.show_more))||order_category=="جميع الطلبات"||order_days=="جميع الطلبات"||order_days=="last_one_month"||order_days=="last_three_month"||order_days=="more_than_three_months")?
              // (orders.length>0&&(!this.state.show_month&&!this.state.show_three_months&&!this.state.show_more)||(order_category=="تأمين سيارات"||order_category=="تامين السفر"||order_category=="تأمين الحياة"||order_category=="تامين الصحة"||order_category=="تأمين البضائع"||order_category=="تامين المطاعم"||order_category=="تأمين الخادمات"||order_category=="برنامج رعاية السرطان"||order_category=="جميع الطلبات"||order_days=="جميع الطلبات"||(order_days=="last_one_month"&&orders.length>0)||order_days=="last_three_month"||order_days=="more_than_three_months"))?
              orders.length>0?
              <View style={{  paddingLeft: 10,paddingRight: 10,marginBottom:0,elevation:0,shadowOpacity: 0,borderBottomWidth:0,  backgroundColor: "transparent",borderColor:"transparent"
            }}>
                {orders.map((order1, index) => {
                  return (
                


                      <View style={{ flex: 1,
                          marginBottom: 20,
                          borderColor:"transparent",
                          backgroundColor:"transparent",
                          borderRadius:5,
                          borderWidth:0,
                          shadowOpacity:0,
                          elevation:0,
                        padding:Platform.OS === 'android'?2:0,
                      shadowRadius:5
                    }}
                      >
                      {/* {(Object.keys(order).length > 0)?
                      order.map((order1, index) => {
                       
                          return(
                            <View style={{ flex: 1,
                                marginBottom: 20,
                                backgroundColor:"#fafafa",
                                borderColor:"transparent",
                                borderRadius:5,
                                borderWidth:1,
                                shadowOpacity:0,
                                elevation:0,
                              padding:Platform.OS === 'android'?2:0,
                            shadowRadius:5}}
                            > */}
                               {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.insurance_type", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.Insurance_Type}
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                          {order1.Insurance_Type}
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.insurance_type", lang)}</Text>

                        </Right>
                    </CardItem>
                            }
                        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left >
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.order_id", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.id}
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                          {order1.id}
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.order_id", lang)}</Text>

                        </Right>
                    </CardItem>
                            }
                        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.created_at", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.created_at}
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                          {order1.created_at}
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.created_at", lang)}</Text>

                        </Right>
                    </CardItem>
                        }
                        {((order1.Insurance_Type=="تأمين المركبات"||order1.Insurance_Type=="Travel Insurance"||order1.Insurance_Type=="Motor Insurance"||order1.Insurance_Type=="تامين السفر")&&order1.orders_status_name!="Offered Price")?
                               Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("insurancecompanies.total", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.total} JOD
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                        {order1.total} JOD
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("insurancecompanies.total", lang)}</Text>

                        </Right>
                    </CardItem>
                            :null
                          }
                        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.status", lang)}</Text>
                            </Left>
                              
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,color:order1.orders_status_name=="Pending"?"orange":order1.orders_status_name=="Ready to issue"?"blue":order1.orders_status_name=="Confirmed"?"blue":order1.orders_status_name=="Cancellation Requested"||order1.orders_status_name=="Canceled"||order1.orders_status_name=="Rejected"?"red":order1.orders_status_name=="Received"?"#17a2b8":(order1.orders_status_name=="Completed"||order1.orders_status_name=="Completed/Shipping Phase"||order1.orders_status_name=="Policy Issued/Delivered")?"green":"#000"}}>
                              {order1.orders_status_name}
                            </Text>
                            
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,color:order1.orders_status_name=="Pending"?"orange":order1.orders_status_name=="Ready to issue"?"blue":order1.orders_status_name=="Confirmed"?"blue":order1.orders_status_name=="Cancellation Requested"||order1.orders_status_name=="Canceled"||order1.orders_status_name=="Rejected"?"red":order1.orders_status_name=="Received"?"#17a2b8":(order1.orders_status_name=="Completed"||order1.orders_status_name=="Completed/Shipping Phase"||order1.orders_status_name=="Policy Issued/Delivered")?"green":"#000"}}>
                          {order1.orders_status_name}
                        </Text>
                        </Left>
                          
                        <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.status", lang)}</Text>

                        
                    </CardItem>
                            }
                                                    {order1.comment!=null&&order1.comment!=""?

                             Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.notes", lang)}</Text>
                            </Left>
                              <View style={{width:"50%"}}>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                            {order1.comment}
                            </Text>
                            </View>
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                        {order1.comment}
                        </Text>
                        </Left>
                        <View style={{width:"50%"}}>
                        <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.notes", lang)}</Text>

                        </View>
                    </CardItem>
                           :null }
{/*                  
                           {order1.offerdprice!=null&&order1.offerdprice!=""?
                          <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.offerdprice", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.total} 
                            </Text>
                            </Right>
                        </CardItem>
                        :null} */}
                      
                        {(!order1.orders_status_name=="Cancel"||!order1.orders_status_name=="Cancel Request")||order1.orders_status_name=="Pending"?
                        <CardItem bordered>
                          <Body style={[centerStyle,{marginLeft:lang=='en'?100:100}]}>
                            <Button style={{   backgroundColor:'red',justifyContent:'center',marginTop:10}} onPress={() =>this.showModal(order1.id)} >
                              <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:14}}>{strings("Done_screen.cancel_request", lang)}</Text>
                            </Button>
                          </Body>
                        </CardItem>
                       :null}
                          {(order1.orders_status_id=="5")&&(order1.Insurance_Type=="تأمين المركبات"||order1.Insurance_Type=="Motor Insurance"||order1.Insurance_Type=="تامين السفر"||order1.Insurance_Type=="Travel Insurance")?

                        <CardItem bordered>
                          <Body style={[centerStyle,{marginLeft:lang=='en'?110:110}]}>
                            <Button style={{ backgroundColor:'#5cb85c',justifyContent:'center',marginTop:10}}
                            onPress={() => {                   
                              if(Actions.currentScene=="orderspage"){
              
                                Actions.payment({addons:order1.addons,total:order1.total,full_name:order1.full_name,insurance_type:order1.Insurance_Type=="تأمين المركبات"||order1.Insurance_Type=="Motor Insurance"?"Car Insurance":"Travel Insurance",user_id:this.props.user_id,order_id:order1.id,company_name:order1.manufacturers_name,company_name_ar:order1.manufacturers_name_ar,data:{accept_visa:order1.accept_visa,accept_cash:order1.accept_cash}})}}}>
                              <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:14}}>{strings("payment.Pay_now", lang)}</Text>
                            </Button>
                          </Body>
                        </CardItem>
                        :null}
                        {order1.orders_status_name=="Offered Price"?
                        Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.insurance_price", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,textDecorationLine:'line-through'}}>
                              {order1.insurance_price} JOD
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,textDecorationLine:'line-through'}}>
                          {order1.insurance_price} JOD
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.insurance_price", lang)}</Text>

                        </Right>
                    </CardItem>
                        
                        :null}
                                              {order1.orders_status_name=="Offered Price"?
                        Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                        <CardItem style={{direction:lang=='ar'?'rtl':'ltr'}}bordered>
                            <Left>
                                <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.quoted_price", lang)}</Text>
                            </Left>
                              <Right>
                            <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                              {order1.total} JOD
                            </Text>
                            </Right>
                        </CardItem>
                        :
                        <CardItem bordered>
                        <Left>
                        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25}}>
                          {order1.total}JOD
                        </Text>
                        </Left>
                          <Right>
                          <Text style={{fontFamily:'TajawalBold0',lineHeight:25}}>{strings("order_page.quoted_price", lang)}</Text>

                        </Right>
                    </CardItem>
                        
                        :null}
                        {order1.orders_status_name=="Offered Price"?

<View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',height:60,backgroundColor:"#fff"}}>
  <Button style={{backgroundColor:'#5cb85c',justifyContent:'center',marginTop:8,width:80}}onPress={()=>
    {
      if(Actions.currentScene=="orderspage"){

       Actions.payment({addons:order1.addons,total:order1.total,full_name:order1.full_name,insurance_type:"Car Insurance",user_id:this.props.user_id,order_id:order1.id,company_name:order1.manufacturers_name,company_name_ar:order1.manufacturers_name_ar,data:{accept_visa:order1.accept_visa,accept_cash:order1.accept_cash}})}}} >
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:14}}>{strings("order_page.accept", lang)}</Text>
  </Button>
  <Text>   </Text>
  <Button style={{backgroundColor:'red',justifyContent:'center',marginTop:8,width:80}} onPress={()=>this.rejectOrder(order1.id)}>
    <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:14}}>{strings("order_page.reject", lang)}</Text>
  </Button>

</View>
                          :null}
                       {/* </View>

                          )

                      }) */}
                      {/* :null} */}
                      </View>
                          //  :null
// :null
                  );
             
                })}

              </View>
              :
              orders.length==0?
              <View style={{  backgroundColor:'transparent',borderColor:'transparent',shadowOpacity:0,elevation:0}}>
              <VerticalWrapper style={{marginTop:230}}>
                {/* <Image source={require('../../assests/images/no-results-found.png')} style={{width:120,height:120}} /> */}
                {lang=='en'?
                <Text style={{  marginTop:10,marginBottom:10,color:"#003580",fontFamily:'TajawalBold0'}}>there's no orders yet...</Text>
                :
                <Text style={{  marginTop:10,marginBottom:10,color:"#003580",fontFamily:'TajawalBold0'}}>لا يوجد طلبات</Text>

              }
              </VerticalWrapper>
            </View>
            :null
              
     :
 Platform.OS=="ios"?
     <CardItem style={{backgroundColor:'tranparent'}} >
     <Body>
       <View style={{  alignItems:'center',alignSelf:'center',justifyContent:'center',marginTop:60}}>
         <Spinner Size="large" color="#003580" />
       </View>
     </Body>
    </CardItem>
    :
    <CardItem style={{backgroundColor:'tranparent'}} >
    <Body>
      <View style={{  alignItems:'center',alignSelf:'center',justifyContent:'center',marginTop:60}}>
        <ActivityIndicator size="large" color="#003580" />
      </View>
    </Body>
   </CardItem>
 
     }


              
               
      <Modal
                visible={show_order_modal}
                animationType={"slide"}
                onRequestClose={() => this.props.showCancelOrderModal(!show_order_modal)}
                supportedOrientations={[
                  "portrait",
                  "portrait-upside-down",
                  "landscape",
                  "landscape-left",
                  "landscape-right"
                ]}
                transparent
              >
               <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.50)",
                  position: "relative",
                  flex: 1,
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#e3e3e3",
                    padding: 0,
                    backgroundColor: "#fff",
                    marginLeft: 15,
                    marginRight: 15
                  }}
                >
                {/* <TouchableWithoutFeedback onPress={() => this.props.showCancelOrderModal(!show_order_modal)}> */}
                    <View style={{marginLeft: 10}}>
                      <Icon
                        style={{
                          color: "#003580",
                          fontSize: 25,
                          alignSelf: "flex-start"
                        }}
                        onPress={() => this.props.showCancelOrderModal(!show_order_modal)}
                        name="md-close"
                      />
                    </View>

              <ListItem
                    style={{
                      marginTop: 10,
                      alignSelf: lang == "en" ? "flex-start" : "flex-end",
                      borderBottomWidth: 0
                    }}
                  >
                    <Text
                      style={{
                        color: "#171717",
                        fontSize: 21,
                        fontFamily: "TajawalRegular0",
                        lineHeight:25
                      }}
                    >
                      {strings("insurancecompanies.choose_reason", lang)}
                    </Text>
                  </ListItem>
                  <ListItem>
                <Body style={centerStyle}>
                
                      {Platform.OS=="android"?
                       <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{
                          fontFamily: "TajawalRegular0",
                          height:40,borderColor:'gray',borderWidth:0.1,
                          width:  230,
                          borderBottomColor:
                          form_submitted &&  this.state.reason == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                          form_submitted && this.state.reason == ""
                              ? 2
                              : 0
                        }}
                        selectedValue={this.state.reason}
                        onValueChange={value =>
                          this.onValueChange3(value)

                          // this.setState({reason:value})
                        }
                        
                      >
                      <Picker.Item
label={strings("insurancecompanies.choose_reason", lang)}
value=""
/>
                      {lang=='ar'?
                      
reasons.length>0?

                        reasons.map((test, index) => {
                          return (
                          
                            <Picker.Item
                              key={test.id}
                              label={test.reason_ar}
                              value={test.id}
                            />
                          );
                        })
                        :null
                        :
                        reasons.length>0?
                        reasons.map((test, index) => {
                          return (
                          
                            <Picker.Item
                              key={test.id}
                              label={test.reason_en}
                              value={test.id}

                            />
                          );
                        })
                        :null
                        }
                      </Picker>
                      :
         <Picker
                        mode="dropdown"
                        iosHeader={strings("insurancecompanies.choose_reason", lang)}
                        // placeholder={strings('carInformation.car_type',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                      placeholder={strings("insurancecompanies.choose_reason", lang)}
                        style={{
                          borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:40,borderColor:'gray',borderWidth:0.1,marginRight:lang=='ar'?100:null,

                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && this.state.reason == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.reason == "" ? 2 : 0
                          }
                        }
                        selectedValue={this.state.reason}
                        onValueChange={value =>
                          // this.setState({reason:value})
                          this.onValueChange3(value)

                        }
                      > 
                   
            
                      {lang=='ar'?
reasons.length>0?
                        reasons.map((test, index) => {
                          return (
                          
                            <Picker.Item
                              key={test.id}
                              label={test.reason_ar}
                              value={test.id}
                            />
                          );
                        })
                        :null
                        :
                        reasons.length>0?
                        reasons.map((test, index) => {
                          return (
                          
                            <Picker.Item
                              key={test.id}
                              label={test.reason_en}
                              value={test.id}

                            />
                          );
                        })
                        :null
                        }
                      </Picker>


                      }
                
                    
                      </Body>
                      </ListItem> 
                      {this.state.reason==4?
 
                      <CardItem>
                          
                        <Input
                                    value={this.props.reason_message}
                                    // order_page
                                     placeholder ={strings("order_page.enter_reason", lang)}
                                    placeholderTextColor="#9B9B9B"
                                    style={
                                      {
                                        borderRadius:5,marginBottom:5,backgroundColor:"#fff",borderColor:"#000",borderWidth:0.5,height:50,width:'80%',

                                        fontFamily: "TajawalRegular0",
                                        textAlign: lang == "ar" ? "right" : "left",
                                        // borderBottomColor:
                                        //   form_submitted && this.state.full_name == ""
                                        //     ? "red"
                                        //     : "#171717",
                                        // borderBottomWidth:
                                        //   form_submitted && this.state.full_name == "" ? 1 : 0
                                      }
                                    }
                                    onChangeText={value => {
                             
                                      this.props.getOrdersTexts({
                                        prop: "reason_message",
                                        value
                                      })
                                    }}
                                  />
                        {/* <Left><Text>ddd</Text></Left> */}
                      </CardItem>
                                            :null}

                                          <CardItem>
                      {/* <ListItem style={{borderBottomWidth: 0}}> */}
                    <Body>
                      <Button
                        onPress={() =>
                          this.goToAnotherPage(
                           reason,this.props.reason_message
                          )
                        }
                        style={{backgroundColor: "#003580"}}
                        block
                      >
                        <Text style={buttonText}>
                        {strings('drivinglicense.continue',lang)}
                        </Text>
                      </Button>
                    </Body>
                  {/* </ListItem> */}
                  </CardItem>
      
                  </View>
                  {/* </Content>    */}
                </View>
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
// export default LifeInsurance;
const mapStateToProps = state => {
    const { lang } = state.sideBarReducer;
    const { orders,orders_loading,show_order_modal,reasons,order_category,order_days,reason_message} = state.orderPageReducer;
    return {lang,orders,orders_loading,show_order_modal,reasons,order_category,order_days,reason_message};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,
    orderPageAction,
   )
    (OrderPage);