import React, {Component} from "react";
import {
  ImageBackground,
  Dimensions,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  RefreshControl,
  Keyboard,
  StatusBar,BackHandler,Alert,Platform
} from "react-native";
import {
  CardItem,
  Card,
  Left,
  Right,
  Body,
  Container,
  Content,
  Drawer
} from "native-base";
import {Bold} from "./common/Bold";
import {
  imagesStyle,
  imagesCradItem,
  categoriesText
} from "../assests/styles/homeStyles";
import {
  centerStyle,
  servicesText,
  sevicesCardItemStyle,
  transparentBackGround
} from "../theme";
import {VerticalWrapper} from "./common/VerticalWrapper";

import {Actions} from "react-native-router-flux";
import {Spinner} from "./common/Spinner";
import * as homeAction from "../actions/homeAction";
import * as authAction from "../actions/authAction";
import * as sideBarAction from '../actions/sideBarAction';

import {connect} from "react-redux";
import {strings} from "../../Locales/i18n";
import Header from "./headerWithoutArrow";
import SideBar from "./sideBar";

const IMAGE_BASE_URL = "https://bolisati.com/";
const dimensions = Dimensions.get("window");
class Home extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      user_id: 0,
      activePage:false
    };
  }
  componentWillMount() {
    this.props.resetLifeCompletely()
    this.props.resetTravelCompletely()
    this.props.resetHealthCompletely()
    this.props.resetServantCompletely()
    this.props.resetCancerCompletely()
    this.props.resetCarCompletely()
    this.props.getOcrKeys();
    this.props.getShowIconText(false);
    const {lang} = this.props;
    if (lang == "en") {
      this.props.getCategories(1);
    } else if (lang == "ar") {
      this.props.getCategories(4);
    }
   
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
  }
  componentDidMount() {
    if (Platform.OS == "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }
    AsyncStorage.getItem("user", (err, result) => {

      result = JSON.parse(result);
      if (result != null&&result!=undefined) {
        if(result[0].customers_id!=undefined){
        this.setState({user_id: result[0].customers_id});
        this.props.getCustomerInfo(this.state.user_id);
        }
      }
   

    });
  }
    checkPrevScene = () => {
      return (
  
        Actions.prevScene === "login" ||
        Actions.prevScene === "signup" ||
        Actions.prevScene === ""||
        Actions.prevScene===null
      );
    };
    handleBack = () =>{
      if (this.drawer != null) {
        this.drawer._root.close();
      }
  
  
      if (Actions.currentScene === "home" && this.checkPrevScene()) {
        Alert.alert(
          "Warning",
          "Are you sure you want to exit from bolisati app?",
          [
            {text: "NO", onPress: () => ""},
            {text: "YES", onPress: () => BackHandler.exitApp()}
          ],
          {cancelable: false}
        );
        return true;
      }
    };

  
  closeDrawer = () => {
    this.drawer._root.close();
    setTimeout(() => Keyboard.dismiss());

  };

  openDrawer = () => {
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
  goTo = (category, id) => {


    if (id==36) {
      if(Actions.currentScene=="home"){
      Actions.drivinglicense2({user_id: this.state.user_id, category_id: id});

      this.props.getShowIconText(true);
      }
    } else if (id==35) {
      //  Actions.lifeinsurance({user_id:this.state.user_id})
      if(Actions.currentScene=="home"){
      Actions.UploadID({user_id: this.state.user_id, category_id: id});
      this.props.getShowIconText(true);
      }
    } else if (id==37) {
      // Actions.travelinsurance({user_id:this.state.user_id})
      if(Actions.currentScene=="home"){
      Actions.travelinsuranceinformation({
        user_id: this.state.user_id,
        category_id: id
      });
    }
    } else if (
      id==42
    ) {
      if(Actions.currentScene=="home"){
      Actions.UploadID({
        user_id: this.state.user_id,
        canerCareText: "canerCare",
        category_id: id
      });
    }

      // Actions.cancercareprogram({user_id:this.state.user_id})
    } else if (id==38) {
      // Actions.shippinginsurance({user_id:this.state.user_id})
      if(Actions.currentScene=="home"){
      Actions.shippinginsuranceinformation({
        user_id: this.state.user_id,
        category_id: id
      });
    }
    } else if (
      id==40
    ) {
      if(Actions.currentScene=="home"){
      Actions.resturantsinsurance({
        user_id: this.state.user_id,
        category_id: id
      });
    }
    } else if (id==41) {
      // Actions.servantinsurance({user_id:this.state.user_id})
      if(Actions.currentScene=="home"){
      Actions.Uploadpassport({
        user_id: this.state.user_id,
        category_id: id,
        typee:"Servant Insurance"
      });
    }
    } else if (
     id==39
    ) {
      if(Actions.currentScene=="home"){
      Actions.UploadID({
        user_id: this.state.user_id,
        healthInsuranceText: "healthInsurance",
        category_id: id
      });
    }}
  };
  render() {
    const {categories, home_loading, lang} = this.props;
console.log("categories",categories)
    return (
      // <ScrollView ref={(ref)=> {this._scrollView = ref}}>
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

          <Container style={{backgroundColor: "transparent"}}>
            <Content style={{backgroundColor: "transparent"}}>
              {!home_loading ? (
                categories.length > 0 ? (
                  <View style={[imagesCradItem, {width: dimensions.width}]}>
                    {categories.map((category, index) => {
                      return (
                        <View
                          style={[imagesCradItem, {width: dimensions.width}]}
                          key={category.id}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              this.goTo(category.name, category.id)
                            }
                          >
                            <ImageBackground
                              source={{
                                uri: `${IMAGE_BASE_URL}${category.image}`
                              }}
                              style={imagesStyle}
                            >
                            {Platform.OS=="ios"?
                              <CardItem
                                style={{
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  direction: lang == "ar" ? "rtl" : "ltr",
                                  marginTop: 50
                                }}
                              >
                                <Image
                                  source={{
                                    uri: `${IMAGE_BASE_URL}${category.icon}`
                                  }}
                                  style={{
                                    height: 50,
                                    width: 50,
                                    marginRight: -40,
                                    marginBottom: 5
                                  }}
                                />
                                <View style={{marginLeft: 50, marginTop: 20}}>
                                  <Text style={{color: "#ffffff",fontSize: 17,fontFamily: "TajawalBold0",marginRight: 30,lineHeight: 25}}>
                                    {category.name}
                                  </Text>
     
                                </View>
                              </CardItem>
                              :
                              Platform.OS=="android"&&lang=='ar'?
                              <CardItem
                              style={{
                                backgroundColor: "transparent",
                                display: "flex",
                            
                                flexDirection: lang=='ar'?'row-reverse':null,
                                marginTop: 50
                              }}
                            >
                              <Image
                                source={{
                                  uri: `${IMAGE_BASE_URL}${category.icon}`
                                }}
                                style={{
                                  height: 50,
                                  width: 50,
                                  marginRight: -6,
                                  marginBottom: 5
                                }}
                              />
                              <View style={{marginTop: 20}}>
                                <Text style={{color: "#ffffff",fontSize: 17,fontFamily: "TajawalBold0",marginRight: 10,lineHeight: 25}}>
                                  {category.name}
                                </Text>
         
                              </View>
                            </CardItem>
                            :
                            <CardItem
                            style={{
                              backgroundColor: "transparent",
                              display: "flex",
                              direction: lang == "ar" ? "rtl" : "ltr",
                              marginTop: 50
                            }}
                          >
                            <Image
                              source={{
                                uri: `${IMAGE_BASE_URL}${category.icon}`
                              }}
                              style={{
                                height: 50,
                                width: 50,
                                marginRight: -40,
                                marginBottom: 5
                              }}
                            />
                            <View style={{marginLeft: 50, marginTop: 20}}>
                              <Text style={{color: "#ffffff",fontSize: 17,fontFamily: "TajawalBold0",marginRight: 30,lineHeight: 25}}>
                                {category.name}
                              </Text>
         
                            </View>
                          </CardItem>
                          
              

}

                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                ) : 

                <Card style={{  backgroundColor:'transparent',borderColor:'transparent',shadowOpacity:0,elevation:0}}>
                <TouchableOpacity onPress={()=>Actions.home()}>
                <VerticalWrapper style={{marginTop:230}}>
                  {/* <Image source={require('../../assests/images/no-results-found.png')} style={{width:120,height:120}} /> */}
                  <Text style={{  marginTop:10,marginBottom:10,color:"#003580",fontFamily:'TajawalBold0',fontSize:20}}>Retry...</Text>
                </VerticalWrapper>
                </TouchableOpacity>
              </Card>
              ) : (
                //  <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height:'100%'}}>

                <CardItem style={{backgroundColor: "tranparent"}}>
                  <Body>
                    <View
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginTop: 250
                      }}
                    >
                      <Spinner Size="large" color="#003580" />
                    </View>
                  </Body>
                </CardItem>
              )
              // </ImageBackground>
              }
            </Content>
          </Container>
        </Drawer>
      </ImageBackground>
    );
  }
}
// export default Home
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const {lang} = state.sideBarReducer;
  const { user } = state.authReducer;

  const {categories, home_loading} = state.homeReducer;
  return {categories, home_loading, lang,user};
};
// END MAP STATE TO PROPS

export default connect(mapStateToProps, {...homeAction,...authAction,...sideBarAction})(Home);