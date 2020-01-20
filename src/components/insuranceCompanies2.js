import React, {Component} from "react";
import {
  ImageBackground,
  Dimensions,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  StatusBar,
  TouchableOpacity,Platform,ActivityIndicator
} from "react-native";
import {
  CardItem,
  Body,
  Right,
  Left,
  ListItem,
  CheckBox,
  Button,
  Content,
  Icon,
  Drawer,Card
} from "native-base";
import { Tooltip } from 'react-native-elements';

import {connect} from "react-redux";
import {strings} from "../../Locales/i18n";
import {Constants} from "expo";
import {VerticalWrapper} from "./common/VerticalWrapper";
var typeInsurancee=""
const dimensions = Dimensions.get("window");
const IMAGE_BASE_URL = "https://bolisati.com/";

import * as insuranceCompaniesAction from "../actions/insuranceCompaniesAction";

import {
  servicesText,
  transparentBackground,
  buttonText,labelStyle
} from "../theme";
import {Actions} from "react-native-router-flux";
import Header from "./header";
import SideBar from "./sideBar";
import PDFReader from "rn-pdf-reader-js";

class InsuranceCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddonChecked: false,
      insuranceCompanyId: null,
      companyOldPrice:null,
      companyDiscountRate:null,
      totalAll: 0
    };
  }
  async componentWillMount() {
    // this.registerForPushNotificationsAsync()

  this.props.getInsuranceCompaniesCars(this.props.carInformation)

  }
  countPrice = value => {
    value.isChecked = !value.isChecked;
    this.setState({isAddonChecked: value.isChecked});
  };
  goToAnotherPage = (addons, insuranceCompaanyId,companyOldPrice,companyDiscountRate, total) => {
    var companyAddons = [];
    for (var i = 0; i < addons.length; i++) {
      if (addons[i].isChecked) {
        companyAddons.push(addons[i]);
      }
    }
    const {
      show_insurance_modal2,
      carInformation,
      user_id,
      lifeInsuranceInformation,
      cancerCarProgramInformation,
      shippingInformation
    } = this.props;


    this.props.showInsuranceCompanyModal2(!show_insurance_modal2);
    

      Actions.damagestep({
        carInformation: carInformation,
        addons: companyAddons,
        insuranceCompaanyId: insuranceCompaanyId,
        companyOldPrice:companyOldPrice,
        companyDiscountRate:companyDiscountRate,
        total: total,
        total_small:this.state.totalAll,
        user_id: user_id,
        full_name:this.props.full_name
      });
 
  
 
  };
  showPdfModal = id => {
    this.props.getTerms(id);
    this.props.showPdfModal(!show_pdf_modal);
  };
  showModal = (id, company) => {
    const {addons, show_insurance_modal2, category_id,carInformation} = this.props;
    this.setState({insuranceCompanyId: id});
    this.setState({companyOldPrice: company.old_price});
    this.setState({companyDiscountRate: company.discount_rate});

    // this.setState({totalAll:company.insurance_price})
    if (company.total) {
      this.setState({totalAll: parseFloat(company.total)});
    }
    this.props.getAddons(id, category_id);
    this.props.getTerms(id);
    this.props.showInsuranceCompanyModal2(!show_insurance_modal2);
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  render() {
console.log("this.props in insurance company",this.props)
   var x=""
   if(this.props.accendient_question==1){
     x="++"
   }
   else {
     x=""
   }
    const {
      show_insurance_modal2,
      insuranceCompanies,
      terms,
      addons,
      carInformation,
      lang,
      show_pdf_modal,show_sort_modal_car,insurancecompaniesCar,insurance_loading_car
    } = this.props;
 console.log("insuranceCompanies",insurancecompaniesCar)
    var total = this.state.totalAll;
    for (var i = 0; i < addons.length; i++) {
      if (addons[i].isChecked) {
        total = total + (addons[i].price);
      }
    }

    return (
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
          <Header openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />

          <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
          {/* <TouchableWithoutFeedback onPress={() => this.props.showInsuranceCompanyModal(!show_insurance_modal)}>    */}
          <Content style={{backgroundColor: "transparent"}}>
            {/* <CardItem
              style={{
                width: dimensions.width,
                backgroundColor: "#fff",
                height: 66
              }}
            >
              {lang == "ar" ? (
                <View style={{marginLeft:180}}>
                  <Text style={servicesText}>
                    {strings("insurancecompanies.insurance_companies", lang)}
                  </Text>
                </View>
              ) : (
                <Left>
                  <Text style={servicesText}>
                    {strings("insurancecompanies.insurance_companies", lang)}
                  </Text>
                </Left>
              )}
            </CardItem> */}
              <View  style={{
                width: dimensions.width,
                backgroundColor: "#fff",
                height: 66
              }}>
                {lang=='en'?
                <View style={{flexDirection:"row",width:"100%"}}>
                <View >
                <Text style={[servicesText,{marginLeft:15,marginTop:20}]}>
                    {strings("insurancecompanies.insurance_companies", lang)}
                  </Text>
                </View>

                <TouchableOpacity onPress={()=> this.props.showSortingModalCar(!show_sort_modal_car)} style={{marginLeft:40}}>
                <View style={{flexDirection:"row",marginTop:15,justifyContent:"center",alignItems:"center"}}>
                <Image source={require("../../assets/icons8-up-down-arrow-502.png")}
                         style={{height:20,width:25,resizeMode:"contain",marginTop:10}}
                   />
                   <Text style={{  color:"#003580",
   fontSize:16,
   fontFamily:'TajawalBlack0',lineHeight:20,marginTop:10}}> {strings("insurancecompanies.sort", lang)}</Text>
                </View>
                </TouchableOpacity>
                </View>
                :
                <View style={{flexDirection:"row"}}>
                              <TouchableOpacity onPress={()=> this.props.showSortingModalCar(!show_sort_modal_car)}style={{marginLeft:20}}>

                <View style={{flexDirection:"row",marginTop:15}}>
                <Text style={{  color:"#003580",
   fontSize:14,
   fontFamily:'TajawalBlack0',lineHeight:20,marginTop:10}}> {strings("insurancecompanies.sort", lang)}</Text>
                <Image source={require("../../assets/icons8-up-down-arrow-502.png")}
                         style={{height:20,width:25,resizeMode:"contain",marginTop:10}}
                   />
                
                </View>
                </TouchableOpacity>
                <View style={{marginLeft:100}} >
                <Text style={[servicesText,{marginTop:20}]}>
                    {strings("insurancecompanies.insurance_companies", lang)}
                  </Text>
                </View>
                </View>
            }
            </View>
            {/* <View  style={{
                width: dimensions.width,
                backgroundColor: "#fff",
                height: 66
              }}>
                <View>
                <Text style={servicesText}>
                    {strings("insurancecompanies.insurance_companies", lang)}
                  </Text>
                </View>
                <View>
                <Image source={require("../../assets/icons8-up-down-arrow-50.png")}
                         style={{height:142.6,width:120,resizeMode:"contain"}}
                   />
                </View>
            </View> */}
{Platform.OS=="ios"?
!insurance_loading_car?
            insurancecompaniesCar.length>0
              ? insurancecompaniesCar.map((company, index) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.showModal(company.manufacturers_id, company)
                      }
                   
                      key={company.manufacturers_id}
                    >
                      {lang == "ar" ? (
              //           <View style={{
              //             backgroundColor: "#fff",
              //             height: 129,
              //             marginTop: 15,
              //             width: dimensions.width,
              //             flexDirection:"row",
              //             direction: "rtl"}}>
                         
              //               <View style={{width:"53%",justifyContent:"flex-end",alignItems:"flex-end",marginBottom:30}}>
              //              {lang=="en"?
              //             <Text style={{fontFamily: "TajawalBold0"}}>
              //               {company.manufacturers_name}
              //             </Text>
              //             :
              //             <Text style={{fontFamily: "TajawalBold0"}}>
              //             {company.manufacturers_name_ar}
              //           </Text>}
              //           {company.total ? (
              //             <View style={{flexDirection:"row"}}>
              //               {company.is_featured==1&&company.old_price!=null?
              //                <Text style={{fontFamily: "TajawalBold0",fontSize:12,textDecorationLine:'line-through',color:"gray"}}>
              //                {company.old_price} JOD
              //               </Text>
              //               :null}
              //               <Text style={{fontFamily: "TajawalBold0",fontSize:12}}>
              //                {'  '}{x} {company.total} JOD
              //               </Text>
              //               </View>
              //             ) : null}
              //          <View style={{flexDirection:"row"}}>
              //          {company.old_price!=null&&company.end_date!=null?

              //          <Text style={{fontFamily: "TajawalBold0",fontSize:12.5,color:"gray",marginTop:3}}>
              //                      {' '}{' لغاية: '}{company.end_date}
              //               </Text>
              //            :null}
              //                        {company.old_price!=null&&company.discount_rate!=null?

              //                <Text style={{fontFamily: "TajawalBold0",fontSize:12.5,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3}}>
              //                      {'وفرت'}{company.discount_rate}{'%'}
              //               </Text>
              //               :null}
              //               </View>
              //               </View>
              //               <View style={{width:"3%"}}></View>
              //               {company.is_featured==1?
              //               <View style={{width:"30%",justifyContent:"center",alignItems:"center"}}>
              //               <Image
              //               source={{
              //                 uri: `${IMAGE_BASE_URL}${
              //                   company.manufacturers_image
              //                 }`
              //               }}
              //               style={{width: 100, height: 100}}
              //             />
              //               </View>
              //               :null}
              //               <View>
              //               <Image source={require("../../assets/SPECIALOFFER.png")}
              //        style={{height:40,width:70,resizeMode:"contain"}}
              //  />
              //               </View>
                            

              //       </View>
              // ****************************************************
              <View style={{
                backgroundColor: "#fff",
                height: 129,
                marginTop: 15,
                width: dimensions.width,
                flexDirection:"row",
                direction: "rtl"}}>
                
                  <View style={{width:"20%",justifyContent:"center",alignItems:"center",paddingLeft:70}}>
                  <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}${
                      company.manufacturers_image
                    }`
                  }}
                  style={{width: 100, height: 100}}
                />
                  </View>
                  {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

<View>
<Image source={require("../../assets/SPECIAL-OFFER-final2.png")} 
style={{height:85,width:85,resizeMode :'contain',position:"absolute",zIndex:2,marginStart:-75}}
/>
</View>
                                  :null}
                  <View style={{width:"15%"}}></View>

                  <View style={{width:"60%",justifyContent:"flex-start",alignItems:"flex-start",marginTop:30}}>
                 {lang=="en"?
                <Text style={{fontFamily: "TajawalBold0",fontSize:16,lineHeight:25,textAlign:"left"}}>
                  {company.manufacturers_name}
                </Text>
                :
                <Text style={{fontFamily: "TajawalBold0",fontSize:16,lineHeight:25,textAlign:"left"}}>
                {company.manufacturers_name_ar}
              </Text>}
              {company.total ? (
                <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-start"}}>
                         {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
    
    <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"#003580"}}>
                   {' Now '}{x} {company.total} JOD
    </Text>
    :
    <Text style={{fontFamily: "TajawalBold0",fontSize:16,color:"#003580"}}>
    {x} {company.total} JOD
   </Text>
                                     }
                                              {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

                   <Text style={{fontFamily: "TajawalBold0",fontSize:14,textDecorationLine:'line-through',color:"gray"}}>
                   {'Was '}{company.old_price} JOD
                  </Text>
                  :null}
              
                  </View>
                ) : null}
             <View style={{flexDirection:"row"}}>
             {company.old_price!=null&&company.discount_rate!=null&&company.old_price!=0?

<Text style={{fontFamily: "TajawalBold0",fontSize:15,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:5,paddingTop:7,paddingRight:6,paddingLeft:6,paddingBottom:4}}>
{'وفرت'} {company.discount_rate}{'%'}
</Text>
:null}
             {company.old_price!=null&&company.end_date!=null&&company.old_price!=0?

             <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"gray",marginTop:8}}>
                   {' '}{' لغاية: '}{company.end_date}
                  </Text>
                  :null}
             
               
                  </View>
                  </View>
            
            


          </View>
                    //     <CardItem
                    //       style={{
                    //         backgroundColor: "#fff",height: 129,marginTop: 15,width: dimensions.width,direction: "rtl"}}
                    //     >
                    //       <Right>
                    //         <Body>
                    //           <Image
                    //             source={{uri: `${IMAGE_BASE_URL}${company.manufacturers_image}`}}
                    //             style={{width: 100, height: 100}}
                    //           />
                    //         </Body>
                    //       </Right>
                  
                    // <View style={{justifyContent:"center",alignItems:"center",marginBottom:10}}>
                    // {lang=="en"?
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:18}}>
                    //             {company.manufacturers_name}
                    //           </Text>
                    //           :
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:19}}>
                    //           {company.manufacturers_name_ar}
                    //         </Text>
                    //       }
                    // </View>
                    // <View>
                    // {company.total ? (
                    //             <Text
                    //               style={{
                    //                 fontFamily: "TajawalBold0",
                    //                 marginTop: 40,
                    //                 marginLeft:10
                    //               }}
                    //             >
                    //               {/* {x} {company.total} JOD */}
                    //               JOD {company.total} {x}
                    //             </Text>
                    //           ) : null}
                    // </View>
               
                    //     </CardItem>
                      ) : (
                    //     <CardItem
                    //       style={{
                    //         backgroundColor: "#fff",
                    //         height: 129,
                    //         marginTop: 15,
                    //         width: dimensions.width,
                    //         direction: "ltr"
                    //       }}
                    //     >
                    //       <Left>
                    //         <Body>
                    //           <Image
                    //             source={{
                    //               uri: `${IMAGE_BASE_URL}${
                    //                 company.manufacturers_image
                    //               }`
                    //             }}
                    //             style={{width: 100, height: 100}}
                    //           />
                    //         </Body>
                    //       </Left>
                    //                  {company.manufacturers_name.length>7? 
                    //       <View style={{marginBottom:10 ,marginEnd:-50}}>
                    // {lang=="en"?
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:18}}>
                    //             {company.manufacturers_name}
                    //           </Text>
                    //           :
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:19}}>
                    //           {company.manufacturers_name_ar}
                    //         </Text>
                    //       }
                    // </View>
                    // :
                    // <View style={{marginBottom:10,marginEnd:-50}}>
                    // {lang=="en"?
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:18,marginTop:5}}>
                    //             {company.manufacturers_name}
                    //           </Text>
                    //           :
                    //           <Text style={{fontFamily: "TajawalBold0",lineHeight:19}}>
                    //           {company.manufacturers_name_ar}
                    //         </Text>
                    //       }
                    // </View>
                    //     }
                    // <View>
                    // {company.total ? (
                    //             <Text
                    //               style={{
                    //                 fontFamily: "TajawalBold0",
                    //                 marginTop: 40,
                    //                 marginRight:15
                    //                 // marginLeft:15
                    //               }}
                    //             >
                    //               {/* {x} {company.total} JOD */}
                    //               JOD {company.total} {x}

                    //             </Text>
                    //           ) : null}
                    // </View>
                
                    //     </CardItem>
          //           <View style={{
          //             backgroundColor: "#fff",
          //             height: 129,
          //             marginTop: 15,
          //             width: dimensions.width,
          //             flexDirection:"row",
          //             direction: "ltr"}}>
          //               <View style={{width:"30%",justifyContent:"center",alignItems:"center"}}>
          //               <Image
          //               source={{
          //                 uri: `${IMAGE_BASE_URL}${
          //                   company.manufacturers_image
          //                 }`
          //               }}
          //               style={{width: 100, height: 100}}
          //             />
          //               </View>
          //               <View style={{width:"5%"}}></View>
          //               <View style={{width:"50%",justifyContent:"flex-start",alignItems:"flex-start"}}>
          //              {lang=="en"?
          //             <Text style={{fontFamily: "TajawalBold0",marginTop:30}}>
          //               {company.manufacturers_name}
          //             </Text>
          //             :
          //             <Text style={{fontFamily: "TajawalBold0",marginTop:20}}>
          //             {company.manufacturers_name_ar}
          //           </Text>}
          //           {company.total ? (
          //             <View style={{flexDirection:"row"}}>
          //                                           {company.is_featured==1&&company.old_price!=null?

          //                <Text style={{fontFamily: "TajawalBold0",fontSize:12,textDecorationLine:'line-through',color:"gray"}}>
          //                 {company.old_price} JOD
          //               </Text>
          //               :null}
          //               <Text style={{fontFamily: "TajawalBold0",fontSize:12}}>
          //                {'  '} {x} {company.total} JOD
          //               </Text>
          //               </View>
          //             ) : null}
          //          <View style={{flexDirection:"row"}}>
          //          {company.old_price!=null&&company.discount_rate!=null?

          //                <Text style={{fontFamily: "TajawalBold0",fontSize:13,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3}}>
          //                You Save %{company.discount_rate}
          //               </Text>
          //               :null}
          //               {company.old_price!=null&&company.end_date!=null?

          //               <Text style={{fontFamily: "TajawalBold0",fontSize:13,color:"gray",marginTop:3}}>
          //                {' '}{'Valid Till: '}{company.end_date}
          //               </Text>
          //               :null}
          //               </View>
          //               </View>
          //               {company.is_featured==1?
          //               <View>
          //               <Image source={require("../../assets/SPECIALOFFER.png")}
          //        style={{height:45,width:70,resizeMode:"contain"}}
          //  />
          //               </View>
          //               :null}

          //       </View>
          <View style={{
            backgroundColor: "#fff",
            height: 129,
            marginTop: 15,
            width: dimensions.width,
            flexDirection:"row",
            direction: "ltr"}}>
        
              <View style={{width:"30%",justifyContent:"center",alignItems:"center",paddingStart:20}}>
              <Image
              source={{
                uri: `${IMAGE_BASE_URL}${
                  company.manufacturers_image
                }`
              }}
              style={{width: 100, height: 100,resizeMode:"contain"}}
            />
              </View>
              {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
              <View>
              <Image source={require("../../assets/SPECIAL-OFFER-final1.png")}
       style={{height:90,width:100,resizeMode:"contain",position:"absolute",zIndex:2,marginStart:-116}}
 />
              </View>
              :null}
              <View style={{width:"3%"}}></View>
              <View style={{width:"60%",justifyContent:"flex-start",alignItems:"flex-start"}}>
             {lang=="en"?
            <Text style={{fontFamily: "TajawalBold0",marginTop:30,fontSize:16}}>
              {company.manufacturers_name}
            </Text>
            :
            <Text style={{fontFamily: "TajawalBold0",marginTop:20,fontSize:16}}>
            {company.manufacturers_name_ar}
          </Text>}
          {company.total ? (
            <View style={{flexDirection:"row"}}>
               {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

               <Text style={{fontFamily: "TajawalBold0",fontSize:13.5,textDecorationLine:'line-through',color:"gray",marginTop:2}}>
               Was {company.old_price} JOD
              </Text>
              :null}
                                               {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

              <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"#003580"}}>
               {' Now '}{x} {company.total} JOD
              </Text>
              :
              <Text style={{fontFamily: "TajawalBold0",fontSize:16,color:"#003580"}}>
              {x} {company.total} JOD
             </Text>
                                               }
              </View>
            ) : null}
         <View style={{flexDirection:"row"}}>
         {company.old_price!=null&&company.discount_rate!=null&&company.old_price!=0?

               <Text style={{fontFamily: "TajawalBold0",fontSize:15,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3,paddingTop:5}}>
               You Save %{company.discount_rate}
              </Text>
              :null}
               {company.old_price!=null&&company.end_date!=null&&company.old_price!=0?

              <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"gray",marginTop:8}}>
               {' '}{'Valid Till: '}{company.end_date}
              </Text>
              :null}
              </View>
              </View>
          
              

      </View>
                      )}
                    </TouchableWithoutFeedback>
                  );
                })
              : 
              <Card style={{  backgroundColor:'transparent',borderColor:'transparent',shadowOpacity:0,elevation:0}}>
              <VerticalWrapper style={{marginTop:230}}>
                {/* <Image source={require('../../assests/images/no-results-found.png')} style={{width:120,height:120}} /> */}
                <Text style={{  marginTop:10,marginBottom:10,color:"#003580",fontFamily:'TajawalBold0',fontSize:16}}>there's no insurance companies...</Text>
              </VerticalWrapper>
            </Card>
            :
            <View style={{justifyContent:"center",alignItems:"center",marginTop:70}}>
            <ActivityIndicator size="large" color="#003580" />
              </View>           
               :
              !insurance_loading_car?
            insurancecompaniesCar.length>0
              ? insurancecompaniesCar.map((company, index) => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.showModal(company.manufacturers_id, company)
                      }
                   
                      key={company.manufacturers_id}
                    >
                      {lang == "ar" ? (
                                       <View style={{
                                        backgroundColor: "#fff",
                                        height: 129,
                                        marginTop: 15,
                                        width: dimensions.width,
                                        flexDirection:"row",
                                        direction: "rtl"}}>
                                       
                                          <View style={{width:"60%",justifyContent:"flex-end",alignItems:"flex-end",marginBottom:company.old_price!=null&&company.discount_rate!=null?30:55}}>
                                         {lang=="en"?
                                        <Text style={{fontFamily: "TajawalBold0",fontSize:16}}>
                                          {company.manufacturers_name}
                                        </Text>
                                        :
                                        <Text style={{fontFamily: "TajawalBold0",fontSize:16}}>
                                        {company.manufacturers_name_ar}
                                      </Text>}
                                      {company.total ? (
                                        <View style={{flexDirection:"row"}}>
                                                 {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
    
    <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"#003580"}}>
                   {' Now '}{x} {company.total} JOD
    </Text>
    :
    <Text style={{fontFamily: "TajawalBold0",fontSize:16,color:"#003580"}}>
    {x} {company.total} JOD
   </Text>
                                     }
                                                                      {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
        
                                           <Text style={{fontFamily: "TajawalBold0",fontSize:14,marginTop:2,textDecorationLine:'line-through',color:"gray"}}>
                                           Was {company.old_price} JOD
                                          </Text>
                                          :null}
                                        
                                          </View>
                                        ) : null}
                                     <View style={{flexDirection:"row"}}>
                                     {company.old_price!=null&&company.end_date!=null&&company.old_price!=0?
        
                                     <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"gray",marginTop:3}}>
                                           {' '}{' لغاية: '}{company.end_date}
                                          </Text>
                                          :null}
                                             {company.old_price!=null&&company.discount_rate!=null&&company.old_price!=0?
        
                                           <Text style={{fontFamily: "TajawalBold0",fontSize:15,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3}}>
                                           {'وفرت'}{company.discount_rate}{'%'}
                                          </Text>
                                          :null}
                                       
                                          </View>
                                          </View>
                                          <View style={{width:"3%"}}></View>
                                          <View style={{width:"20%",justifyContent:"center",alignItems:"center",paddingStart:70}}>
                                          <Image
                                          source={{
                                            uri: `${IMAGE_BASE_URL}${
                                              company.manufacturers_image
                                            }`
                                          }}
                                          style={{width: 100, height: 100}}
                                        />
                                          </View>
                                          {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
        
                                          <View >
                                          <Image source={require("../../assets/SPECIAL-OFFER-final2.png")}
                                  //  style={{height:75,width:75,resizeMode:"contain",position:"absolute",paddingEnd:30}}
                                  style={{height:85,width:85,resizeMode:"contain",position:"absolute",zIndex:2,marginStart:-23}}

                             />
                                          </View>
                                                                            :null}
        
          
                                  </View>
                        // <CardItem
                        //   style={{
                        //     backgroundColor: "#fff",height: 129,marginTop: 15,width: dimensions.width,flexDirection:"row-reverse"}}
                        // >
                        //   <Right>
                        //     <Body>
                        //       <Image
                        //         source={{uri: `${IMAGE_BASE_URL}${company.manufacturers_image}`}}
                        //         style={{width: 100, height: 100}}
                        //       />
                        //     </Body>
                        //   </Right>
                  
                        //   <Left>
                        //     <Body>
                        //       {lang=="en"?
                        //       <Text style={{fontFamily: "TajawalBold0",lineHeight:18,marginRight:5}}>
                        //         {company.manufacturers_name}
                        //       </Text>
                        //       :
                        //       <Text style={{fontFamily: "TajawalBold0",lineHeight:18,marginRight:5}}>
                        //       {company.manufacturers_name_ar}
                        //     </Text>
                        //   }
                        //       {company.total ? (
                        //         <Text
                        //           style={{
                        //             fontFamily: "TajawalBold0",
                        //             marginTop: 10,fontSize:18
                        //           }}
                        //         >
                        //          {/* {x} {company.total} JOD */}
                        //          JOD {company.total} {x}

                        //         </Text>
                        //       ) : null}
                        //     </Body>
                        //   </Left>
                        // </CardItem>
                      ) : (
                        // <CardItem
                        //   style={{
                        //     backgroundColor: "#fff",
                        //     height: 129,
                        //     marginTop: 15,
                        //     width: dimensions.width,
                        //     direction: "ltr"
                        //   }}
                        // >
                        //   <Left>
                        //     <Body>
                        //       <Image
                        //         source={{
                        //           uri: `${IMAGE_BASE_URL}${
                        //             company.manufacturers_image
                        //           }`
                        //         }}
                        //         style={{width: 100, height: 100}}
                        //       />
                        //     </Body>
                        //   </Left>
                    

                        //   <Right>
                        //     <Body style={{marginTop: 50}}>
                        //     {lang=="en"?
                        //       <Text style={{fontFamily: "TajawalBold0"}}>
                        //         {company.manufacturers_name}
                        //       </Text>
                        //       :
                        //       <Text style={{fontFamily: "TajawalBold0"}}>
                        //       {company.manufacturers_name_ar}
                        //     </Text>
                        // }
                        //       {company.total ? (
                        //         <Text style={{fontFamily: "TajawalBold0",fontSize:18}}>
                        //           {/* {x} {company.total} JOD */}
                        //           JOD {company.total} {x}

                        //         </Text>
                        //       ) : null}
                        //     </Body>
                        //   </Right>
                        // </CardItem>
              //           <View style={{
              //             backgroundColor: "#fff",
              //             height: 129,
              //             marginTop: 15,
              //             width: dimensions.width,
              //             flexDirection:"row",
              //             direction: "ltr"}}>
              //               <View style={{width:"30%",justifyContent:"center",alignItems:"center"}}>
              //               <Image
              //               source={{
              //                 uri: `${IMAGE_BASE_URL}${
              //                   company.manufacturers_image
              //                 }`
              //               }}
              //               style={{width: 100, height: 100}}
              //             />
              //               </View>
              //               <View style={{width:"5%"}}></View>
              //               <View style={{width:"50%",justifyContent:"flex-start",alignItems:"flex-start"}}>
              //              {lang=="en"?
              //             <Text style={{fontFamily: "TajawalBold0",marginTop:30}}>
              //               {company.manufacturers_name}
              //             </Text>
              //             :
              //             <Text style={{fontFamily: "TajawalBold0",marginTop:20}}>
              //             {company.manufacturers_name_ar}
              //           </Text>}
              //           {company.total ? (
              //             <View style={{flexDirection:"row"}}>
              //                {company.is_featured==1&&company.old_price!=null?

              //                <Text style={{fontFamily: "TajawalBold0",fontSize:12,textDecorationLine:'line-through',color:"gray"}}>
              //                 {company.old_price} JOD
              //               </Text>
              //               :null}
              //               <Text style={{fontFamily: "TajawalBold0",fontSize:12}}>
              //                {'  '} {x} {company.total} JOD
              //               </Text>
              //               </View>
              //             ) : null}
              //          <View style={{flexDirection:"row"}}>
              //          {company.is_featured==1&&company.discount_rate!=null?

              //                <Text style={{fontFamily: "TajawalBold0",fontSize:13,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3}}>
              //                You Save %{company.discount_rate}
              //               </Text>
              //               :null}
              //              {company.is_featured==1&&company.end_date!=null?

              //               <Text style={{fontFamily: "TajawalBold0",fontSize:13,color:"gray",marginTop:3}}>
              //                {' '}{'Valid Till: '}{company.end_date}
              //               </Text>
              //               :null}
              //               </View>
              //               </View>
              //               {company.is_featured==1?
              //               <View>
              //               <Image source={require("../../assets/SPECIALOFFER.png")}
              //        style={{height:40,width:70,resizeMode:"contain"}}
              //  />
              //               </View>
              //               :null}

              //       </View>
              <View style={{
                backgroundColor: "#fff",
                height: 129,
                marginTop: 15,
                width: dimensions.width,
                flexDirection:"row",
                direction: "ltr"}}>
                      {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?
                  <View>
                  <Image source={require("../../assets/SPECIAL-OFFER-final1.png")}
           style={{height:80,width:80,resizeMode:"contain",position:"absolute",zIndex:2}}
     />
                  </View>
                  :null}
                  <View style={{width:"30%",justifyContent:"center",alignItems:"center",paddingStart:20}}>
                  <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}${
                      company.manufacturers_image
                    }`
                  }}
                  style={{width: 100, height: 100,resizeMode:"contain"}}
                />
                  </View>
                  <View style={{width:"3%"}}></View>
                  <View style={{width:"60%",justifyContent:"flex-start",alignItems:"flex-start"}}>
                 {lang=="en"?
                <Text style={{fontFamily: "TajawalBold0",marginTop:30,fontSize:16}}>
                  {company.manufacturers_name}
                </Text>
                :
                <Text style={{fontFamily: "TajawalBold0",marginTop:20,fontSize:16}}>
                {company.manufacturers_name_ar}
              </Text>}
              {company.total ? (
                <View style={{flexDirection:"row"}}>
                   {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

                   <Text style={{fontFamily: "TajawalBold0",fontSize:14,textDecorationLine:'line-through',color:"gray",marginTop:2}}>
                   Was {company.old_price} JOD
                  </Text>
                  :null}
                                                   {company.is_featured==1&&company.old_price!=null&&company.old_price!=0?

                  <Text style={{fontFamily: "TajawalBold0",fontSize:16,color:"#003580"}}>
                   {' Now '} {x} {company.total} JOD
                  </Text>
                  :
                  <Text style={{fontFamily: "TajawalBold0",fontSize:16,color:"#003580"}}>
                  {x} {company.total} JOD
                 </Text>
                                                   }
                  </View>
                ) : null}
             <View style={{flexDirection:"row"}}>
             {company.old_price!=null&&company.discount_rate!=null&&company.old_price!=0?

                   <Text style={{fontFamily: "TajawalBold0",fontSize:15,backgroundColor:"rgb(205,237,215)",color:"green",borderRadius:3,padding:3}}>
                   You Save %{company.discount_rate}
                  </Text>
                  :null}
                   {company.old_price!=null&&company.end_date!=null&&company.old_price!=0?

                  <Text style={{fontFamily: "TajawalBold0",fontSize:15,color:"gray",marginTop:3}}>
                   {' '}{'Valid Till: '}{company.end_date}
                  </Text>
                  :null}
                  </View>
                  </View>
              
                  

          </View>
                      )}
                    </TouchableWithoutFeedback>
                  );
                })
              : 
              <Card style={{  backgroundColor:'transparent',borderColor:'transparent',shadowOpacity:0,elevation:0}}>
              <VerticalWrapper style={{marginTop:230}}>
                {/* <Image source={require('../../assests/images/no-results-found.png')} style={{width:120,height:120}} /> */}
                <Text style={{  marginTop:10,marginBottom:10,color:"#003580",fontFamily:'TajawalBold0',fontSize:16}}>there's no insurance companies...</Text>
              </VerticalWrapper>
            </Card>
            :  <View style={{justifyContent:"center",alignItems:"center",marginTop:70}}>
            <ActivityIndicator size="large" color="#003580" />
              </View>
              }
            <Modal
              visible={show_insurance_modal2}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showInsuranceCompanyModal2(!show_insurance_modal2)
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
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showInsuranceCompanyModal2(
                            !show_insurance_modal2
                          )
                        }
                      />
                    </Left>
                  </CardItem>
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
                      {strings("insurancecompanies.Terms_and_Conditions", lang)}
                    </Text>
                  </ListItem>

                  {terms.length > 0 ? (
                    <ListItem
                      style={{
                        marginTop: 10,
                        borderBottomWidth: 0,
                        alignSelf: lang == "en" ? "flex-start" : "flex-end",

                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.props.showPdfModal(!show_pdf_modal)}
                      >
                        <Text
                          style={{fontFamily: "TajawalBold0", lineHeight: 20}}
                        >
                          {strings("insurancecompanies.terms_text", lang)}
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  ) : // <CardItem style={transparentBackground}>
         

                  null}
  {addons.length > 0?
                  <ListItem
                    style={{
                      marginTop: 10,
                      borderBottomWidth: 0,
                      alignSelf: lang == "en" ? "flex-start" : "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        color: "#171717",
                        fontSize: 21,
                        fontFamily: "TajawalRegular0",
                        lineHeight:20
                      }}
                    >
                      {strings("insurancecompanies.addons", lang)}
                    </Text>
                  </ListItem>
:null}
  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                  addons.length > 0
                    ? addons.map((addon, index) => {
                        addon.isChecked = Boolean(addon.isChecked);
                        console.log("addon.isChecked", addon.isChecked);
                        return (
                          
                          <CardItem
                            style={{
                              borderBottomWidth: 0,
                              direction: lang == "ar" ? "rtl" : "ltr"
                            }}
                            key={index}
                          >
                   
                            <CheckBox
                              style={{
                                marginRight: 15,
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingRight: 4
                              }}
                              checked={addon.isChecked}
                              color="#003580"
                              onPress={() => this.countPrice(addon)}
                            />

                  {lang=="en"?
                            <Text style={{fontFamily: "TajawalRegular0"}}>
                              {addon.addon_name} {addon.price}
                            </Text>
                      :
                      <Text style={{fontFamily: "TajawalRegular0"}}>
                      {addon.addon_name_ar} {addon.price}
                    </Text>
                            }
                          </CardItem>
                        );
                      })
                    : null
                    :
                    addons.length > 0
                    ? addons.map((addon, index) => {
                        addon.isChecked = Boolean(addon.isChecked);
                        return (
                          
                          <CardItem
                            style={{
                              borderBottomWidth: 0,
                              flexDirection:"row-reverse"
                            }}
                            key={index}
                          >
                   
                            <CheckBox
                              style={{
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingRight: 4
                              }}
                              checked={addon.isChecked}
                              color="#003580"
                              onPress={() => this.countPrice(addon)}
                            />

                  {lang=="en"?
                            <Text style={{fontFamily: "TajawalRegular0",marginRight:20}}>
                              {addon.addon_name} {addon.price}
                            </Text>
                      :
                      <Text style={{fontFamily: "TajawalRegular0",marginRight:20}}>
                      {addon.addon_name_ar} {addon.price}
                    </Text>
                            }
                          </CardItem>
                        );
                      })
                    : null}

           {total != 0&&Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en") ? (
             lang=="ar"?
                    <CardItem
                      style={[
                        transparentBackground,
                        {marginTop: 40}
                      ]}
                      bordered
                    >
                                    <Left>
              
                        <Text
                          style={{
                            fontFamily: "TajawalRegular0",
                            fontSize: 18,
                            textAlign: "right",
                            color: "#171717"
                          }}
                        >
                          {/* {x} {total} JOD */}
                          JOD {total} {x}

                        </Text>
                      </Left>
                      <Right>
                        <View style={{flexDirection:"row"}}>
                        <Tooltip backgroundColor="#003580"width={350}height={150} popover={<Text style={[labelStyle,{color:"#fff"}]}>{strings("insurancecompanies.Including_taxes", lang)}</Text>}>

<Text style={{color:"#003580",fontSize:16}}>*</Text> 
</Tooltip>
                        <Text
                          style={{
                            fontFamily: "TajawalRegular0",
                            fontSize: 16,
                            textAlign: "right",
                            color: "#171717"
                          }}
                        >
                          {strings("insurancecompanies.total2", lang)}
                        </Text>
          
                        </View>
                      </Right>
        
                    </CardItem>
                    :
                    <CardItem
                    style={[
                      transparentBackground,
                      {marginTop: 40}
                    ]}
                    bordered
                  >
                    <Left>
     <View style={{flexDirection:"row"}}>
                      <Text
                        style={{
                          fontFamily: "TajawalRegular0",
                          fontSize: 16,
                          textAlign: "right",
                          color: "#171717"
                        }}
                      >
                        {strings("insurancecompanies.total2", lang)}
                      </Text>
                      <Tooltip backgroundColor="#003580"width={350}height={150} popover={<Text style={[labelStyle,{color:"#fff"}]}>{strings("insurancecompanies.Including_taxes", lang)}</Text>}>

                      <Text style={{color:"#003580",fontSize:16}}>*</Text> 
</Tooltip>
</View>
                    </Left>
                    <Right>
                      <Text
                        style={{
                          fontFamily: "TajawalRegular0",
                          fontSize: 18,
                          textAlign: "right",
                          color: "#171717"
                        }}
                      >
                        {/* {x} {total} JOD */}
                        JOD {total} {x}

                      </Text>
                    </Right>
                  </CardItem>
                  ) : null}
                         {total != 0&&Platform.OS=="android"&&lang=="ar" ? (
                    <CardItem
                      style={[
                        transparentBackground,
                        {marginTop: 40, flexDirection:"row-reverse"}
                      ]}
                      bordered
                    >
                      <Right>
        <View style={{flexDirection:"row"}}>
        <Tooltip backgroundColor="#003580"width={350}height={150} popover={<Text style={[labelStyle,{color:"#fff"}]}>{strings("insurancecompanies.Including_taxes", lang)}</Text>}>

<Text style={{color:"#003580",fontSize:16}}>*</Text> 

</Tooltip >
                        <Text
                          style={{
                            fontFamily: "TajawalRegular0",
                            fontSize: 16,
                            textAlign: "right",
                            color: "#171717"
                          }}
                        >
                          {strings("insurancecompanies.total2", lang)}
                        </Text>
           
</View>
                      </Right>
                      <Left>
                        <Text
                          style={{
                            fontFamily: "TajawalRegular0",
                            fontSize: 18,
                            textAlign: "right",
                            color: "#171717"
                          }}
                        >
                         {/* {x} {total} JOD */}
                         JOD {total} {x}

                        </Text>
                      </Left>
                    </CardItem>
                  ) : null}
                  <ListItem style={{borderBottomWidth: 0}}>
                    <Body>
                      <Button
                        onPress={() =>
                          this.goToAnotherPage(
                            addons,
                            this.state.insuranceCompanyId,
                            this.state.companyOldPrice,
                            this.state.companyDiscountRate,
                            total
                          )
                        }
                        style={{backgroundColor: "#003580"}}
                        block
                      >
                        <Text style={buttonText}>
                          {strings("insurancecompanies.agree_the_termas", lang)}
                        </Text>
                      </Button>
                    </Body>
                  </ListItem>
                </View>
              </View>
              {/* </TouchableWithoutFeedback> */}
              <Modal
                visible={show_pdf_modal}
                animationType={"slide"}
                onRequestClose={() => this.props.showPdfModal(!show_pdf_modal)}
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
                    backgroundColor: "#fff",
                    width: dimensions.width,
                    height: "100%"
                  }}
                >
                  {/* <Content> */}
                  <View
                    style={{
                      marginTop: 22,
                      flex: 1,
                      padding: 10,
                      backgroundColor: "transparent",
                      justifyContent: "space-between",
                      flexDirection: "column"
                    }}
                  >
                    <View style={{marginLeft: 10}}>
                      <Icon
                        style={{
                          color: "#003580",
                          fontSize: 25,
                          alignSelf: "flex-start"
                        }}
                        onPress={() => this.props.showPdfModal(!show_pdf_modal)}
                        name="md-close"
                      />
                    </View>
                    {terms.length > 0 ? (
                      <View
                        style={{
                          flex: 1,
                          paddingTop: Constants.statusBarHeight,
                          backgroundColor: "#fff"
                        }}
                      >
                        <PDFReader source={{uri: "https://bolisati.com/"+terms[0].car_terms}} />
                      </View>
                    ) : null}
                  </View>
                  {/* </Content>    */}
                </View>
              </Modal>
            </Modal>
            <Modal
                        animationType="slide"
                        transparent={true}
                        visible={show_sort_modal_car}
                        onRequestClose={() => {
                          this.props.showSortingModalCar(!show_sort_modal_car)
                        }}>
                        <View style={{marginTop: 300, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 0 }}>
                               

                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                                    <View style={{width:Dimensions.get('window').width/1.3,backgroundColor:"#003580",height:50,alignItems:'center',justifyContent:'center'}}>
                                    <View style={{flexDirection:'row',width:'100%',}}>
                                    <View  style={{width:10, justifyContent:'flex-end'}}  />
                                  {/* <TouchableOpacity 
                                 onPress={()=>{this.props.showSortingModalCar(!show_sort_modal_car)}}
>  
 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                    </TouchableOpacity> */}
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center' ,marginLeft:20}}>{lang=='en'?'Filter by price':'ترتيب حسب السعر'}</Text>
       
                                   
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/4,justifyContent:'center',alignItems:'center',width:'100%'}}>
                                     
            
             
                <TouchableOpacity  onPress={ () => { this.props.FilterResultsCar(this.props.carInformation,2,this.props.user_id,this.props.category_id,this.props.insurance_type,this.props.accendient_question,this.props.full_name) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
              {strings("insurancecompanies.hightolow", lang)}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:0.3,backgroundColor:'gray'}}/>
                <TouchableOpacity  onPress={ () => { this.props.FilterResultsCar(this.props.carInformation,1,this.props.user_id,this.props.category_id,this.props.insurance_type,this.props.accendient_question,this.props.full_name) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {strings("insurancecompanies.lowtohigh", lang)}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:0.3,backgroundColor:'gray'}}/>
                <TouchableOpacity  onPress={()=>{this.props.showSortingModalCar(!show_sort_modal_car)}} style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

<Text style={{fontFamily: "Acens",
fontSize: 16,
fontWeight: "bold",
fontStyle: "normal",}}>
{strings("insurancecompanies.cancel", lang)}
</Text>
</TouchableOpacity>
<View style={{width:Dimensions.get('window').width/1.37,alignItems:'flex-end',justifyContent:'flex-end',paddingTop:30}}>

</View>
</View>
                                    </View>
                            </Card>
                        </View>

                    </Modal>
          </Content>
        </Drawer>
      </ImageBackground>
    );
  }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const {lang} = state.sideBarReducer;
  const {
    show_insurance_modal2,
    addons,
    terms,
    show_pdf_modal,show_sort_modal_car,insurancecompaniesCar,insurance_loading_car
  } = state.insuranceCompaniesReducer;
  return {show_insurance_modal2, addons, terms, lang, show_pdf_modal,show_sort_modal_car,insurancecompaniesCar,insurance_loading_car};
};
// END MAP STATE TO PROPS

export default connect(mapStateToProps, insuranceCompaniesAction)(
  InsuranceCompanies
);
