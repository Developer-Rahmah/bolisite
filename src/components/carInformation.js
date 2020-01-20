import React, {Component} from "react";
import {
  ImageBackground,
  Dimensions,
  ScrollView,
  View,
  Image,
  Keyboard,
  StatusBar,
  Alert,Platform,ImageEditor,ImageStore,TouchableOpacity,TouchableWithoutFeedback,ActivityIndicator
} from "react-native";
import {
  CardItem,
  Body,
  Button,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Picker,
  Right,
  Left,
  Card,
  Label,
  Drawer,
  CheckBox
  
} from "native-base";
import { Tooltip } from 'react-native-elements';

import {
  transparentBackground,
  transparentBorder,
  inputStyle,
  centerStyle,
  buttonStyle,
  buttonText,
  pickerStyle,
  datePickerStyle,
  labelStyle,servicesText2
} from "../theme";
import * as carInformationAction from "../actions/carInformationAction";
import DropdownAlert from "react-native-dropdownalert";
import {connect} from "react-redux";
import DatePicker from "react-native-datepicker";
import {Actions} from "react-native-router-flux";
import moment, * as moments from "moment";
import Header from "./header";
import Header2 from './headerWithoutArrow';

import SideBar from "./sideBar";
import {strings} from "../../Locales/i18n";
import {ImagePicker, Camera, Permissions, ImageManipulator, Audio} from "expo";
import {
  uploadButton,
  continueText,
  uploadLicenseText
} from "../assests/styles/drivingLicenseStyles";
import {scanned_driving_license} from "../App";

const dimensions = Dimensions.get("window");
class CarInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x:false,
      x2:false,
      show_end_date: true,
      form_submitted: false,
      type: Camera.Constants.Type.back,
      drivingLiceneseImage: null,
      cameraPermission: null,
      cameraRollPermission: null,
      full_name: "",
      car_model: "",
      car_type: "",
      manufacturing_year: "",
      licene_no: "",
      licene_symbol: "",
      fuel_type: "",
      end_date: "",
      driving_licenese_image:"",
      driving_licenese_image_back:"",
      driving_licenese_image64:"",
      drivingLiceneseImageBack: null,
      loading_car:true,
      loading_car_back:true,
      category:""

    };
  }
  async componentWillMount() {
   
    var a
    const {lang}=this.props;
    if(lang=='ar')
    {
a=2
    }
    else{
      a=1
    }
    this.props.getCars(a);
    this.props.getCompanies();
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
    if(Platform.OS=="android"){
      this.props.getCarsModal(this.props.car_type)

    }
  }
  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    //alert(this.props.full_name);
    //alert(scanned_driving_license.full_name);

    this.setState({
      end_date: scanned_driving_license.end_date,
      full_name: scanned_driving_license.full_name,
      fuel_type: scanned_driving_license.fuel_type,
      car_model: scanned_driving_license.car_model,
      car_type: scanned_driving_license.car_type,
      licene_no: scanned_driving_license.license_no,
      licene_symbol: scanned_driving_license.symbol,
      manufacturing_year: scanned_driving_license.manufacturing_year,
      driving_licenese_image:scanned_driving_license.driving_license_img,
      driving_licenese_image_back:scanned_driving_license.driving_license_img_back,
      cameraPermission: cameraPermission.status,
      cameraRollPermission: cameraRollPermission.status,
      category:scanned_driving_license.category
    });
  }
  componentDidUpdate() {
    const {car_information_msg, start_date} = this.props;
    if (car_information_msg != null) {
      setTimeout(() => this.props.resetCarInformationMessage(), 300);
    }
  }
  onValueChange(value) {
    this.props.getCarInformationTexts({prop: "car_type", value});
    //this.props.getCarsModal(value)
  }
 
  onValueChange2(value) {
    this.props.getCarInformationTexts({prop: "car_type", value});
    this.props.getCarsModal(value)
  }
  onValueChange3(value) {

    this.props.getCarsModal(value)
  }
  changeShowDate(value) {
    this.props.getCarInformationTexts({prop: "insurance_type", value});
    if (value == "2") {
      this.setState({show_end_date: true});
    } else if (value == "1") {
      this.setState({show_end_date: false});
    }
  }
  //START DROPDOWN MESSAGES
  onError = error => {
    const {lang}=this.props
    if (error) {
      console.log("error", error);
      this.dropdown.alertWithType(
        "error",
        strings("message.error", lang),
        error
      );    }
  };

  onSuccess = success => {
    if (success) {
      this.dropdown.alertWithType("success", "", success);
    }
  };

  //END DROPDOWN MESSAGES
  //START SHOW ALERT FUNC
  showAlert = () => {
    const {car_information_msg} = this.props;
    if (car_information_msg != null) {
      if (car_information_msg.isError) {
        this.onError(car_information_msg.msg);
      } else if (car_information_msg.isSuccess) {
        this.onSuccess(car_information_msg.msg);
      } else {
        return;
      }
    }
  };
  //END SHOW ALERT FUNC

  goToInsuranceCompanies = () => {
    this.setState({form_submitted:true})

    const {
      full_name,
      id_number,
      insurance_type,
      car_type,
      vehicle_number,
      coding,
      car_model,
      manufacturing_year,
      driver,
      fuel_type,
      car_salary,
      start_date,
      end_date,
      user_id,
      category_id,car_category,company,bolisa_number,accredient_question_no,accredient_question_yes,lang
    } = this.props;

    var a=coding+'-'+vehicle_number
    var b=this.state.licene_symbol+'-'+this.state.licene_no
    let end_date1 = moment(start_date);
    end_date1 = moment(end_date1)
      .add(365, "day")
      .format("YYYY-MM-DD");
    // this.props.goToInsuranceCompanies(full_name, id_number, insurance_type,car_type,vehicle_number,car_model,manufacturing_year,driver,fuel_type,car_salary,start_date,end_date1,user_id);



if(this.state.full_name==""&&this.props.full_name!=""){
    if (insurance_type == "2") {
      this.props.goToInsuranceCompanies(
        full_name,
        id_number,
        insurance_type,
        car_type,
        a,
        this.props.car_model,
        manufacturing_year,
        driver,
        fuel_type,
        car_salary,
        start_date,
        end_date,
        user_id,
        category_id,
        bolisa_number,
        car_category,
        company,
        this.state.drivingLiceneseImage,this.state.drivingLiceneseImageBack,strings('message.fill_message',lang),accredient_question_no,accredient_question_yes
      );
    } else if (insurance_type == "1") {
      this.props.goToInsuranceCompanies(
        full_name,
        id_number,
        insurance_type,
        car_type,
        a,
        this.props.car_model,
        manufacturing_year,
        driver,
        fuel_type,
        car_salary,
        start_date,
        end_date1,
        user_id,
        category_id,
        bolisa_number,
        car_category,
        company,
        this.state.drivingLiceneseImage,this.state.drivingLiceneseImageBack,strings('message.fill_message',lang),accredient_question_no,accredient_question_yes
      );
    }
}
else if(this.state.manufacturing_year!=""&&this.props.manufacturing_year==""){
  if (insurance_type == "2") {
    this.props.goToInsuranceCompanies(
      this.state.full_name,
      id_number,
      insurance_type,
      this.state.car_model,
      b,
      this.state.category,
      this.state.manufacturing_year,
      driver,
      this.state.fuel_type,
      car_salary,
      start_date,
      this.state.end_date,
      user_id,
      category_id,
      bolisa_number,
      this.state.car_type,
      company,
      this.state.driving_licenese_image,this.state.driving_licenese_image_back,strings('message.fill_message',lang),accredient_question_no,accredient_question_yes
    );
  } else if (insurance_type == "1") {
    this.props.goToInsuranceCompanies(
      this.state.full_name,
      id_number,
      insurance_type,
      this.state.car_model,
      b,
      this.state.category,
      this.state.manufacturing_year,
      driver,
      this.state.fuel_type,
      car_salary,
      start_date,
      end_date1,
      user_id,
      category_id,
      bolisa_number,
      this.state.car_type,
      company,
      this.state.driving_licenese_image,this.state.driving_licenese_image_back,strings('message.fill_message',lang),accredient_question_no,accredient_question_yes
    );
  }
}

  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };

  _checkCameraPermissions = async () => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA);
    //const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    this.setState({status});
  };
  _reqCameraPermissions = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({cameraPermission: status});
  };

  _checkCameraRollPermissions = async () => {
    const {status} = await Permissions.getAsync(Permissions.CAMERA);
    this.setState({status});
  };
  _reqCameraRollPermissions = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({cameraRollPermission: status});
  };

  _pickImage = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({drivingLiceneseImage: result.uri});
    }
  };
  _pickImageBack = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({drivingLiceneseImageBack: result.uri});
    }
  };
  capture = true;
captureBack=true;
  start() {
    this.setState({x:true})
   
  }
  start2=()=>{
    this.capture = true;
    setInterval(() => {
      if (this.capture) {
        this.takePicture();
      }
    }, 300);
  }
  startBack() {
    this.setState({x2:true})
  }
  start2Back=()=>{
    this.captureBack = true;
    setInterval(() => {
      if (this.captureBack) {
        this.takePictureBack();
      }
    }, 300);
  }
  countYes=(value)=>{
    const {accredient_question_yes}=this.props
    this.props.getCarInformationTexts({
      prop: "accredient_question_yes",
      value: !value
    })
    this.props.getCarInformationTexts({
      prop: "accredient_question_no",
      value: false
    })
  
    
      }
      countNo=(value)=>{
        const {accredient_question_no}=this.props
        this.props.getCarInformationTexts({
          prop: "accredient_question_no",
          value: !value
        })
        this.props.getCarInformationTexts({
          prop: "accredient_question_yes",
          value: false
        })
        
    
      }
  _takePicture = async () => {
    this.start()
  
  };

  async takePicture() {

    if (this.camera && this.capture) {
      this.capture = false;

      const options = {quality: 1, base64: true};
      var cur = this;
      this.setState({loading_car:false})
      this.camera.takePictureAsync(options).then(async data => {
        var d = await ImageManipulator.manipulateAsync(
          data.uri,
          [{resize: {width: 1200}}],
          {base64: true}
        );
        //cur.uploadPost(d.base64);
        //});
        var yoffset = d.height / 2 - d.width * 0.95 * 2 / 6;
        var snappheight = d.width * 0.95 * 2 / 3;
        const cropData = {
          offset: {x: d.width * 0.05, y: yoffset},
          size: {width: d.width * 0.95, height: snappheight}
        };
        var cur = this;
        this.setState({drivingLiceneseImage: d.uri});
   ImageEditor.cropImage(
          this.state.drivingLiceneseImage,
          cropData,
          uri => {
            ImageStore.getBase64ForTag(
              uri,
              base64data => {
       
                 this.setState({driving_licenese_image64: base64data});

              },
              err => {
              }
            );
          },
          err => {
          }
        );
        cur.setState({x: false});
   

      });

    }
  }
  _takePictureBack = async () => {
    this.startBack()
  };

  async takePictureBack() {

    if (this.camera && this.captureBack) {
      this.captureBack = false;

      const options = {quality: 1, base64: true};
      var cur = this;
      this.setState({loading_car_back:false})
      this.camera.takePictureAsync(options).then(async data => {
        var d = await ImageManipulator.manipulateAsync(
          data.uri,
          [{resize: {width: 1200}}],
          {base64: true}
        );
        //cur.uploadPost(d.base64);
        //});
        var yoffset = d.height / 2 - d.width * 0.95 * 2 / 6;
        var snappheight = d.width * 0.95 * 2 / 3;
        const cropData = {
          offset: {x: d.width * 0.05, y: yoffset},
          size: {width: d.width * 0.95, height: snappheight}
        };
        var cur = this;
        this.setState({drivingLiceneseImageBack: d.uri});
   ImageEditor.cropImage(
          this.state.drivingLiceneseImageBack,
          cropData,
          uri => {
            ImageStore.getBase64ForTag(
              uri,
              base64data => {
       
                 this.setState({driving_licenese_image64: base64data});

              },
              err => {
                //alert(JSON.stringify(err))
              }
            );
          },
          err => {
            //alert(JSON.stringify(err))
          }
        );
        cur.setState({x2: false});
   

      });

    }
  }
  render() {
    let {drivingLiceneseImage,drivingLiceneseImageBack} = this.state;

    const {
      full_name,
      insurance_type,
      car_type,
      vehicle_number,
      manufacturing_year,
      driver,
      fuel_type,
      car_model,
      car_salary,
      start_date,
      end_date,
      id_number,
      cars,
      cars_model,
      lang,
      grand_father_name,
      father_name,
      last_name,
      coding,bolisa_number,car_category,insuranceCompanies,company,accredient_question_yes,accredient_question_no
    } = this.props;
  
    let end_date1 = moment(start_date);
    end_date1 = moment(end_date1)
      .add(365, "day")
      .format("YYYY-MM-DD");
    const {form_submitted} = this.state;
    var d = new Date();
    var end_date2 = moment(d)
      .add(365, "day")
      .format("YYYY-MM-DD");
    var n = d.getFullYear();
    var max_date = new Date(n, 11, 31);
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
    {!this.state.x&&!this.state.x2?
          <Header openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
:
          <Header2 openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
    }
          <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
          <ScrollView
            ref={ref => {
              this._scrollView = ref;
            }}
          >
          {!this.state.x&&!this.state.x2?
            <View
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
            >

                

 <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        servicesText2,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                  
                        }
                      ]}
                    >
                      {strings("carInformation.user_info", lang)}
                    </Label>
                    </View>
                    </Item>
                    </CardItem>
                    {scanned_driving_license.scanned ? (
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.full_name", lang)}
                    </Label>
                    <Input
                      color="#fff"
                      value={this.state.full_name}
                      //  placeholder ={strings('carInformation.id_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.state.full_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.full_name == "" ? 2 : 0
                        }
                      ]}
                      onChangeText={value => {
                 
                        this.setState({full_name: value});
                      }}
                    />
                  </View>
                </Item>
              </CardItem>
      ):
      <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.full_name", lang)}
                    </Label>
                    <Input
                      color="#fff"
                      value={this.props.full_name}
                      //  placeholder ={strings('carInformation.id_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.props.full_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.props.full_name == "" ? 2 : 0
                        }
                      ]}
                      onChangeText={value => {
                        this.props.getCarInformationTexts({
                          prop: "full_name",
                          value
                        });
                        // this.setState({full_name: value});
                      }}
                    />
                  </View>
                </Item>
              </CardItem>

                    }
              <CardItem style={transparentBackground} bordered>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.id_number", lang)}
                    </Label>
                    <Input
                      keyboardType="numeric"

                      color="#fff"
                      value={id_number}
                      //  placeholder ={strings('carInformation.id_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && id_number == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && id_number == "" ? 2 : 0
                        }
                      ]}
                      onChangeText={value =>
                        this.props.getCarInformationTexts({
                          prop: "id_number",
                          value
                        })
                      }
                    />
                  </View>
                </Item>
              </CardItem>

             <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        servicesText2,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                  
                        }
                      ]}
                    >
                      {strings("carInformation.car_info", lang)}
                    </Label>
                    </View>
                    </Item>
                    </CardItem>
                    {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.car_type", lang)}
                    </Label>
                    {scanned_driving_license.scanned ? (

                      <Input
                        color="#fff"
                        value={this.state.car_model}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.car_model == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.car_model == "" ? 2 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({car_model: value});
                          this.onValueChange(value);
                          //this.props.getCarInformationTexts({prop: "vehicle_number",value})
                        }}
                      />
                    ) : (
                      <Picker
                        mode="dropdown"
                        iosHeader={strings("carInformation.car_type", lang)}
                        // placeholder={strings('carInformation.car_type',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={[
                          pickerStyle,
                          {
                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && car_type == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && car_type == "" ? 2 : 0
                          }
                        ]}
                        selectedValue={this.props.car_type}
                        onValueChange={value =>
                          // this.props.getCarInformationTexts({
                          //   prop: "car_type",
                          //   value
                          // })
                          this.onValueChange2(value)
                        }
                      >
                       <Picker.Item
                        label={strings("carInformation.choose_car_type", lang)}
                        value=""
                      />
                        {cars.map((item, index) => {
                          return (
                            <Picker.Item
                              key={item.car_id}
                              label={item.car_model}
                              value={item.car_id}
                            />
                          );
                        })}
                      </Picker>
                    )}
                  </View>
                </Item>
              </CardItem>
              :

              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.car_type", lang)}
                  </Label>
                  {scanned_driving_license.scanned ? (

                    <Input
                      color="#fff"
                      value={this.state.car_model}
                      //  placeholder ={strings('carInformation.vehicle_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.state.car_model == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.car_model == "" ? 2 : 0
                        }
                      ]}
                      onChangeText={value => {
                        this.setState({car_model: value});
                        this.onValueChange(value);
                        //this.props.getCarInformationTexts({prop: "vehicle_number",value})
                      }}
                    />
                  ) : (
       
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,borderBottomColor:form_submitted && car_type == ""? "red": "#171717",
                    borderBottomWidth:
                      form_submitted && car_type == "" ? 2 : 0}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={this.props.car_type}
                       onValueChange={value =>
                   
                            this.onValueChange2(value)
                          }                  
                       
                   >
                     <Picker.Item
                      label={strings("carInformation.choose_car_type", lang)}
                      value=""
                    />
                      {cars.map((item, index) => {
                        return (
                          <Picker.Item
                            key={item.car_id}
                            label={item.car_model}
                            value={item.car_id}
                          />
                        );
                      })}
                    </Picker>
                    </View>
                  )}
                </View>
              </Item>
            </CardItem>

                      }
                      {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.car_model", lang)}
                    </Label>
                    {scanned_driving_license.scanned ? (

<Input
  color="#fff"
  value={this.state.category}
  //  placeholder ={strings('carInformation.vehicle_number',lang)}
  placeholderTextColor="#9B9B9B"
  style={[
    inputStyle,
    {
      fontFamily: "TajawalRegular0",
      textAlign: lang == "ar" ? "right" : "left",
      borderBottomColor:
        form_submitted && this.state.category == ""
          ? "red"
          : "#171717",
      borderBottomWidth:
        form_submitted && this.state.category == "" ? 2 : 0
    }
  ]}
  onChangeText={value => {
    this.setState({category: value});
    this.onValueChange(value);
  }}
/>
) : (
                      <Picker
                        mode="dropdown"
                        iosHeader={strings("carInformation.car_model", lang)}
                        // placeholder={strings('carInformation.car_model',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={[
                          pickerStyle,
                          {
                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && car_model == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && car_model == "" ? 2 : 0
                          }
                        ]}
                        selectedValue={this.props.car_model}
                        onValueChange={value =>
                          this.props.getCarInformationTexts({
                            prop: "car_model",
                            value
                          })
                        }
                      >
                      
                      {/* {cars_model.length>0? */}
                      <Picker.Item
                        label={strings("carInformation.Choose car_model", lang)}
                        value=""
                      />
                        {cars_model.map((item, index) => {
                          return (
                            <Picker.Item
                              key={item.model_id}
                              label={item.model_name}
                              value={item.model_id}
                            />
                          );
                          })}
                        {/* :null} */}
                      </Picker>
)}
                    {/* )} */}
                  </View>
                </Item>
              </CardItem>
              :

              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.car_model", lang)}
                  </Label>
                  {scanned_driving_license.scanned ? (

<Input
color="#fff"
value={this.state.category}
//  placeholder ={strings('carInformation.vehicle_number',lang)}
placeholderTextColor="#9B9B9B"
style={[
  inputStyle,
  {
    fontFamily: "TajawalRegular0",
    textAlign: lang == "ar" ? "right" : "left",
    borderBottomColor:
      form_submitted && this.state.category == ""
        ? "red"
        : "#171717",
    borderBottomWidth:
      form_submitted && this.state.category == "" ? 2 : 0
  }
]}
onChangeText={value => {
  this.setState({category: value});
  this.onValueChange(value);
  //this.props.getCarInformationTexts({prop: "vehicle_number",value})
}}
/>
) : (
           
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,borderBottomColor:form_submitted && car_model == ""? "red": "#171717",
                    borderBottomWidth:
                      form_submitted && car_model == "" ? 2 : 0}}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={car_model}
                       onValueChange={value =>
                            this.props.getCarInformationTexts({
                              prop: "car_model",
                              value
                            })
                          }
              
                       
                   >
                    {/* {cars_model.length>0? */}
                    <Picker.Item
                      label={strings("carInformation.Choose car_model", lang)}
                      value=""
                    />
                      {cars_model.map((item, index) => {
                        return (
                          <Picker.Item
                            key={item.model_id}
                            label={item.model_name}
                            value={item.model_id}
                          />
                        );
                        })}
                      {/* :null} */}
                    </Picker>
                    </View>
)}
                  {/* )} */}
                </View>
              </Item>
            </CardItem>

                        }
                        {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"

                        }
                      ]}
                    >
                      {strings("carInformation.car_category", lang)}
                    </Label>
                    {scanned_driving_license.scanned ? (
                      <Input
                        color="#fff"
                        value={this.state.car_type}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.car_type == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.car_type == "" ? 2 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({car_type: value});
                      
                        }}
                      />
                    ) : (
                    <Picker
                      mode="dropdown"
                      iosHeader={strings("carInformation.car_category", lang)}
                      // placeholder={strings('carInformation.driver',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{color: "#9B9B9B"}}
                      style={[
                        pickerStyle,
                        {
                          direction: lang == "ar" ? "rtl" : "ltr",
                          borderBottomColor:
                            (form_submitted && car_category == "")||(form_submitted&&car_category==undefined)? "red" : "#fff",
                          borderBottomWidth:
                          (form_submitted && car_category == "")||(form_submitted&&car_category==undefined) == "" ? 2 : 0
                        }
                      ]}
                      selectedValue={car_category}
                      onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "car_category",
                          value
                        })
                      }
                    >
                  <Picker.Item
                        label={strings("carInformation.Choose_car_category", lang)}
                        value=""
                      />
                      <Picker.Item
                        label=  {strings("carInformation.Small vehicle", lang)}
                        value="ركوب صغير"
                      />
                      <Picker.Item
                        label=  {strings("carInformation.big vehicle", lang)}
                        value="ركوب كبير"
                      />
                    </Picker>
                    )}
                  </View>
                </Item>
              </CardItem>
              :
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"

                      }
                    ]}
                  >
                    {strings("carInformation.car_category", lang)}
                  </Label>
                  {scanned_driving_license.scanned ? (
                    <Input
                      color="#fff"
                      value={this.state.car_type}
                      //  placeholder ={strings('carInformation.vehicle_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.state.car_type == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.car_type == "" ? 2 : 0
                        }
                      ]}
                      onChangeText={value => {
                        this.setState({car_type: value});
                        // this.onValueChange(value);
                        //this.props.getCarInformationTexts({prop: "car_model",value})
                      }}
                    />
                  ) : (
      
                  <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                  borderBottomColor:
                          (form_submitted && car_category == "")||(form_submitted&&car_category==undefined)? "red" : "#fff",
                        borderBottomWidth:
                        (form_submitted && car_category == "")||(form_submitted&&car_category==undefined) == "" ? 2 : 0
                      
                  }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={car_category}
    onValueChange={value =>
                      this.props.getCarInformationTexts({
                        prop: "car_category",
                        value
                      })
                    }                  
                       
              
                       
                   >
                <Picker.Item
                      label={strings("carInformation.Choose_car_category", lang)}
                      value=""
                    />
                    <Picker.Item
                      label=  {strings("carInformation.Small vehicle", lang)}
                      value="ركوب صغير"
                    />
                    <Picker.Item
                      label=  {strings("carInformation.big vehicle", lang)}
                      value="ركوب كبير"
                    />
                  </Picker>
                  </View>
                  )}
                </View>
              </Item>
            </CardItem>

                    }
              {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
             <CardItem style={[transparentBackground,{direction:lang=='ar'?'rtl':'ltr'}]}>
                 <Label
                        style={[
                          labelStyle,
                          {
                            textAlign: lang == "ar" ? "right" : "left",
                            color: "#171717"
                          }
                        ]}
                      >
                        {strings("carInformation.vehicle_number", lang)}
                      </Label> 
              </CardItem>
              :
              <CardItem style={[transparentBackground,{flexDirection: 'row-reverse'}]}>
              <Label
                     style={[
                       labelStyle,
                       {
                         textAlign: lang == "ar" ? "right" : "left",
                         color: "#171717"
                       }
                     ]}
                   >
                     {strings("carInformation.vehicle_number", lang)}
                   </Label> 
                 
                   </CardItem>
                      }
              {scanned_driving_license.scanned ? (
            <View style={[transparentBackground,{marginTop:-10,width:"100%",justifyContent:"center"}]}>
            <View style={{width:"95%",justifyContent:"center"}}>
                <Item style={transparentBorder}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center"
                    }}
                  >
                    <View style={{flexDirection: "column", width: "30%",marginLeft:18}}>
        
                      <Input
                                          keyboardType="numeric"

                        maxLength={3}
                        color="#fff"
                        value={this.state.licene_symbol}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.licene_symbol == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.licene_symbol == "" ? 2 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({licene_symbol: value});
                    
                        }}
                      />
                    </View>
                    <Text>-</Text>
                    <View style={{flexDirection: "column", width: "50%"}}>
           
                      <Input
                        keyboardType="numeric"
                        color="#fff"
                        value={this.state.licene_no}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.licene_no == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.licene_no == "" ? 2 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({licene_no: value});
                          this.props.getCarInformationTexts({
                            prop: "vehicle_number",
                            value
                          });
                        }}
                      />
                    </View>
                  </View>
                </Item>
              </View>
              </View>

              ):
              // <View style={{marginBottom:20}}>
               <View style={[transparentBackground,{marginTop:-10,width:"100%",justifyContent:"center"}]}>
                 <View style={{width:"95%",justifyContent:"center"}}>
              <Item style={transparentBorder}> 
              <View style={{flexDirection: 'row',justifyContent: 'space-between',width:'100%',alignItems:'center'}}>
              <View style={{flexDirection: 'column',width:'30%',marginLeft:18}}>
 {/* <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('carInformation.vehicle_encoding',lang)}</Label> */}
                <Input
                                     keyboardType="numeric"

                 maxLength={2}
                  color="#fff"
                  value ={coding}
                 //  placeholder ={strings('carInformation.vehicle_number',lang)}
                  placeholderTextColor="#9B9B9B"
                  style={{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && coding == ""? "red": "#171717",borderBottomWidth:form_submitted && coding == ""?1:0,   borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:45
                }}
                  onChangeText={value =>this.props.getCarInformationTexts({prop: "coding",value})}
                 />
              </View>
              <Text>-</Text>
              <View style={{flexDirection: 'column',width:'50%'}}>
{/* <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717"}]}>{strings('carInformation.vehicle_number',lang)}</Label> */}
<Input
                     keyboardType="numeric"

                  color="#fff"
                  value ={vehicle_number}
                 //  placeholder ={strings('carInformation.vehicle_number',lang)}
                  placeholderTextColor="#9B9B9B"
                  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && vehicle_number == ""? "red": "#171717",borderBottomWidth:form_submitted && vehicle_number == ""?1:0}]}
                  onChangeText={value =>this.props.getCarInformationTexts({prop: "vehicle_number",value})}
                 />

              </View>
  
              </View>
             

                
              </Item>
            </View>
             </View>
              }
              {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.manufacturing_year", lang)}
                    </Label>
                    {scanned_driving_license.scanned ? (
                      <Input
                        color="#fff"
                        value={this.state.manufacturing_year}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.manufacturing_year == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.manufacturing_year == "" ? 1 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({manufacturing_year: value});
                        //   this.props.getCarInformationTexts({
                        //     prop: "manufacturing_year",
                        //     value
                        //   });
                        }}
                      />
                    ) : (
                      <Picker
                        mode="dropdown"
                        iosHeader={strings(
                          "carInformation.manufacturing_year",
                          lang
                        )}
                        // placeholder={strings('carInformation.manufacturing_year',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={[
                          pickerStyle,
                          {
                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && manufacturing_year == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && manufacturing_year == "" ? 1 : 0
                          }
                        ]}
                        selectedValue={manufacturing_year}
                        onValueChange={value =>
                          this.props.getCarInformationTexts({
                            prop: "manufacturing_year",
                            value
                          })
                        }
                      >
                      <Picker.Item label={strings("carInformation.choose_manufacturing_year", lang)} value="" />
                        <Picker.Item label="2009" value="2009" />
                        <Picker.Item label="2010" value="2010" />
                        <Picker.Item label="2011" value="2011" />
                        <Picker.Item label="2012" value="2012" />
                        <Picker.Item label="2013" value="2013" />
                        <Picker.Item label="2014" value="2014" />
                        <Picker.Item label="2015" value="2015" />
                        <Picker.Item label="2016" value="2016" />
                        <Picker.Item label="2017" value="2017" />
                        <Picker.Item label="2018" value="2018" />
                        <Picker.Item label="2019" value="2019" />
                      </Picker>
                    )}
                  </View>
                </Item>
              </CardItem>
              :
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.manufacturing_year", lang)}
                  </Label>
                  {scanned_driving_license.scanned ? (
                    <Input
                      color="#fff"
                      value={this.state.manufacturing_year}
                      //  placeholder ={strings('carInformation.vehicle_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.state.manufacturing_year == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.manufacturing_year == "" ? 1 : 0
                        }
                      ]}
                      onChangeText={value => {
                        this.setState({manufacturing_year: value});
                        // this.props.getCarInformationTexts({
                        //   prop: "manufacturing_year",
                        //   value
                        // });
                      }}
                    />
                  ) : (
               
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                    borderBottomColor:
                            form_submitted && manufacturing_year == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && manufacturing_year == "" ? 1 : 0
                    }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={manufacturing_year}
                           onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "manufacturing_year",
                          value
                        })
                      }
              
                       
                   >
                    <Picker.Item label={strings("carInformation.choose_manufacturing_year", lang)} value="" />
                      <Picker.Item label="2009" value="2009" />
                      <Picker.Item label="2010" value="2010" />
                      <Picker.Item label="2011" value="2011" />
                      <Picker.Item label="2012" value="2012" />
                      <Picker.Item label="2013" value="2013" />
                      <Picker.Item label="2014" value="2014" />
                      <Picker.Item label="2015" value="2015" />
                      <Picker.Item label="2016" value="2016" />
                      <Picker.Item label="2017" value="2017" />
                      <Picker.Item label="2018" value="2018" />
                      <Picker.Item label="2019" value="2019" />
                    </Picker>
                    </View>
                  )}
                </View>
              </Item>
            </CardItem>

                      }
                      {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.driver", lang)}
                    </Label>
                    <Picker
                      mode="dropdown"
                      iosHeader={strings("carInformation.driver", lang)}
                      // placeholder={strings('carInformation.driver',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{color: "#9B9B9B"}}
                      style={[
                        pickerStyle,
                        {
                          direction: lang == "ar" ? "rtl" : "ltr",
                          borderBottomColor:
                            form_submitted && driver == "" ? "red" : "#171717",
                          borderBottomWidth:
                            form_submitted && driver == "" ? 1 : 0
                        }
                      ]}
                      selectedValue={driver}
                      onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "driver",
                          value
                        })
                      }
                    >
                     <Picker.Item
                        label={strings("carInformation.choose_driver", lang)}
                        value=""
                      />
                      <Picker.Item
                        label={strings("carInformation.automatic", lang)}
                        value="اتوماتيك"
                      />
                      <Picker.Item
                        label={strings("carInformation.manually", lang)}
                        value="عادي"
                      />
                    </Picker>
                  </View>
                </Item>
              </CardItem>
              :
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.driver", lang)}
                  </Label>
        
                  <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                   borderBottomColor:
                   form_submitted && driver == "" ? "red" : "#171717",
                 borderBottomWidth:
                   form_submitted && driver == "" ? 1 : 0
                }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={driver}
                       onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "driver",
                          value
                        })
                      }
              
                       
                   >
                   <Picker.Item
                      label={strings("carInformation.choose_driver", lang)}
                      value=""
                    />
                    <Picker.Item
                      label={strings("carInformation.automatic", lang)}
                      value="اتوماتيك"
                    />
                    <Picker.Item
                      label={strings("carInformation.manually", lang)}
                      value="عادي"
                    />
                  </Picker>
                  </View>
                </View>
              </Item>
            </CardItem>
                    }
                    {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.fuel_type", lang)}
                    </Label>
                    {scanned_driving_license.scanned ? (
                      <Input
                        color="#fff"
                        value={this.state.fuel_type}
                        //  placeholder ={strings('carInformation.vehicle_number',lang)}
                        placeholderTextColor="#9B9B9B"
                        style={[
                          inputStyle,
                          {
                            fontFamily: "TajawalRegular0",
                            textAlign: lang == "ar" ? "right" : "left",
                            borderBottomColor:
                              form_submitted && this.state.fuel_type == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && this.state.fuel_type == "" ? 1 : 0
                          }
                        ]}
                        onChangeText={value => {
                          this.setState({fuel_type: value});
                    
                        }}
                      />
                    ) : (
                      <Picker
                        mode="dropdown"
                        iosHeader={strings("carInformation.fuel_type", lang)}
                        // placeholder={strings('carInformation.fuel_type',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={[
                          pickerStyle,
                          {
                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && fuel_type == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && fuel_type == "" ? 1 : 0
                          }
                        ]}
                        selectedValue={fuel_type}
                        onValueChange={value =>
                          this.props.getCarInformationTexts({
                            prop: "fuel_type",
                            value
                          })
                        }
                      >
                        <Picker.Item
                          label={strings("carInformation.choose_fuel_type", lang)}
                          value=""
                        />
                        <Picker.Item
                          label={strings("carInformation.gasoline", lang)}
                          value="بنزين"
                        />
                        <Picker.Item
                          label={strings("carInformation.Electricity", lang)}
                          value="كهرباء"
                        />
                        <Picker.Item
                          label={strings("carInformation.Hybrid", lang)}
                          value="هايبرد"
                        />
                          <Picker.Item
                          label={strings("carInformation.diesel", lang)}
                          value="ديزل"
                        />
                      </Picker>
                    )}
                  </View>
                </Item>
              </CardItem>
              :
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.fuel_type", lang)}
                  </Label>
                  {scanned_driving_license.scanned ? (
                    <Input
                      color="#fff"
                      value={this.state.fuel_type}
                      //  placeholder ={strings('carInformation.vehicle_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && this.state.fuel_type == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.fuel_type == "" ? 1 : 0
                        }
                      ]}
                      onChangeText={value => {
                        this.setState({fuel_type: value});
                        // this.props.getCarInformationTexts({
                        //   prop: "fuel_type",
                        //   value
                        // });
                      }}
                    />
                  ) : (
             
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                    borderBottomColor:
                            form_submitted && fuel_type == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && fuel_type == "" ? 1 : 0
                    }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={fuel_type}
                           onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "fuel_type",
                          value
                        })
                      }
                       
                   >
                      <Picker.Item
                        label={strings("carInformation.choose_fuel_type", lang)}
                        value=""
                      />
                      <Picker.Item
                        label={strings("carInformation.gasoline", lang)}
                        value="بنزين"
                      />
                      <Picker.Item
                        label={strings("carInformation.Electricity", lang)}
                        value="كهرباء"
                      />
                      <Picker.Item
                        label={strings("carInformation.Hybrid", lang)}
                        value="هايبرد"
                      />
                        <Picker.Item
                        label={strings("carInformation.diesel", lang)}
                        value="ديزل"
                      />
                    </Picker>
                    </View>
                  )}
                </View>
              </Item>
            </CardItem>
                      }

              <CardItem style={transparentBackground} bordered>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.car_salary", lang)}
                    </Label>
                    <Input
                                        keyboardType="numeric"

                      color="#fff"
                      value={car_salary}
                      //  placeholder ={strings('carInformation.car_salary',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && car_salary == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && car_salary == "" ? 1 : 0
                        }
                      ]}
                      onChangeText={value =>
                        this.props.getCarInformationTexts({
                          prop: "car_salary",
                          value
                        })
                      }
                    />
                  </View>
                </Item>
              </CardItem>

             <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        servicesText2,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                  
                        }
                      ]}
                    >
                      {strings("carInformation.insurance_info", lang)}
                    </Label>
                    </View>
                    </Item>
                    </CardItem>
                    {Platform.OS=="ios"?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.insurance_type", lang)}
                    </Label>
                    <Picker
                      mode="dropdown"
                      iosHeader={strings("carInformation.insurance_type", lang)}
                      // placeholder={strings('carInformation.insurance_type',lang)}
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{color: "#9B9B9B"}}
                      style={[
                        pickerStyle,
                        {
                          direction: lang == "ar" ? "rtl" : "ltr",
                          borderBottomColor:
                            form_submitted && insurance_type == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && insurance_type == "" ? 1 : 0
                        }
                      ]}
                      selectedValue={insurance_type}
                      onValueChange={
                        value => this.changeShowDate(value)
                        // this.props.getCarInformationTexts({
                        //   prop: "insurance_type",
                        //   value
                        // })
                      }
                    >
                      <Picker.Item
                        label={strings("carInformation.choose_insurance_type", lang)}
                        value=""
                      />
                      <Picker.Item
                        label={strings("carInformation.comprehensive", lang)}
                        value="1"
                      />
                      <Picker.Item
                        label={strings("carInformation.supplementary", lang)}
                        value="2"
                      />
                    
                    </Picker>
                  </View>
                </Item>
              </CardItem>
              :
              <CardItem style={transparentBackground}>
              <Item style={transparentBorder}>
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.insurance_type", lang)}
                  </Label>
         
                  <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                   borderBottomColor:
                   form_submitted && insurance_type == ""
                     ? "red"
                     : "#171717",
                 borderBottomWidth:
                   form_submitted && insurance_type == "" ? 1 : 0
                }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={insurance_type}
                       onValueChange={
                        value => this.changeShowDate(value)
              
                      }
              
                       
                   >
                    <Picker.Item
                      label={strings("carInformation.choose_insurance_type", lang)}
                      value=""
                    />
                    <Picker.Item
                      label={strings("carInformation.comprehensive", lang)}
                      value="1"
                    />
                    <Picker.Item
                      label={strings("carInformation.supplementary", lang)}
                      value="2"
                    />
                  
                  </Picker>
                  </View>
                </View>
              </Item>
            </CardItem>
                    }
              {insurance_type=="2" ?
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.Bolisa_number", lang)}
                    </Label>
                    <Input
                      keyboardType="numeric"

                      color="#fff"
                      value={bolisa_number}
                      //  placeholder ={strings('carInformation.id_number',lang)}
                      placeholderTextColor="#9B9B9B"
                      style={[
                        inputStyle,
                        {
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",
                          borderBottomColor:
                            form_submitted && bolisa_number == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && bolisa_number == "" ? 1 : 0
                        }
                      ]}
                      onChangeText={value =>
                        this.props.getCarInformationTexts({
                          prop: "bolisa_number",
                          value
                        })
                      }
                    />
                  </View>
                </Item>
              </CardItem>
:null}
              {insurance_type=="2" ?
Platform.OS=="ios"?
 <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("insurancecompanies.insurance_company", lang)}
                    </Label>
                          <Picker
                        mode="dropdown"
                        iosHeader={strings("insurancecompanies.insurance_company", lang)}
                        // placeholder={strings('carInformation.car_type',lang)}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholderStyle={{color: "#9B9B9B"}}
                        style={[
                          pickerStyle,
                          {
                            direction: lang == "ar" ? "rtl" : "ltr",
                            borderBottomColor:
                              form_submitted && company == ""
                                ? "red"
                                : "#171717",
                            borderBottomWidth:
                              form_submitted && company == "" ? 1 : 0
                          }
                        ]}
                        selectedValue={company}
                        onValueChange={value =>
                          this.props.getCarInformationTexts({
                            prop: "company",
                            value
                          })
                        }
                      >
                        <Picker.Item
                              label={strings("insurancecompanies.choose_insurance_company", lang)}
                              value=""
                            />
                        {insuranceCompanies.map((item, index) => {
                          return (
                            <Picker.Item
                              key={item.id}
                              label={item.company_name}
                              value={item.id}
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
                <View style={{flexDirection: "column", width: "100%"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("insurancecompanies.insurance_company", lang)}
                  </Label>
        
                    <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                           borderBottomColor:
                           form_submitted && company == ""
                             ? "red"
                             : "#171717",
                         borderBottomWidth:
                           form_submitted && company == "" ? 1 : 0
                  }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={company}
                       onValueChange={value =>
                        this.props.getCarInformationTexts({
                          prop: "company",
                          value
                        })
                      }
              
                       
                   >
                      <Picker.Item
                            label={strings("insurancecompanies.choose_insurance_company", lang)}
                            value=""
                          />
                      {insuranceCompanies.map((item, index) => {
                        return (
                          <Picker.Item
                            key={item.id}
                            label={item.company_name}
                            value={item.id}
                          />
                        );
                      })}
                    </Picker>
               </View>
                </View>
              </Item>
            </CardItem>
              :null}
              <CardItem style={transparentBackground}>
                <Item style={transparentBorder}>
                  <View style={{flexDirection: "column", width: "100%"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.start_date", lang)}
                    </Label>
                    <DatePicker
                      style={[
                        datePickerStyle,
                        {
                          borderBottomColor:
                            form_submitted && start_date == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && start_date == "" ? 1 : 0
                        }
                      ]}
                      date={start_date}
                      mode="date"
                      placeholder={strings("carInformation.start_date", lang)}
                      format="YYYY-MM-DD"
                      minDate={new Date()}
                      maxDate={end_date2}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
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
                      onDateChange={value => {
                        this.props.getCarInformationTexts({
                          prop: "start_date",
                          value
                        });
                      }}
                    />
                  </View>
                </Item>
              </CardItem>

              {insurance_type=="2"? (
                <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                    <View style={{flexDirection: "column", width: "100%"}}>
                      <Label
                        style={[
                          labelStyle,
                          {
                            textAlign: lang == "ar" ? "right" : "left",
                            color:
                               "#171717"
                          }
                        ]}
                      >
                        {strings("carInformation.end_date2", lang)}
                      </Label>
                      {scanned_driving_license.scanned ? (
                        <Input
                          color="#fff"
                          value={this.state.end_date}
                          //  placeholder ={strings('carInformation.vehicle_number',lang)}
                          placeholderTextColor="#9B9B9B"
                          style={[
                            inputStyle,
                            {
                              fontFamily: "TajawalRegular0",
                              textAlign: lang == "ar" ? "right" : "left",
                              borderBottomColor:
                                form_submitted && this.state.end_date == ""
                                  ? "red"
                                  : "#171717",
                              borderBottomWidth:
                                form_submitted && this.state.end_date == "" ? 1 : 0
                            }
                          ]}
                          onChangeText={value => {
                            this.setState({end_date: value});
               
                          }}
                        />
                      ) : (
                        <DatePicker
                          style={[
                            datePickerStyle,
                            {
                              borderBottomColor:
                                form_submitted && end_date == ""
                                  ? "red"
                                  : "#171717",
                              borderBottomWidth:
                                form_submitted && end_date == "" ? 1 : 0
                            }
                          ]}
                          date={end_date}
                          mode="date"
                          placeholder={strings(
                            "carInformation.end_date2",
                            lang
                          )}
                          format="YYYY-MM-DD"
                          minDate={new Date()}
                          maxDate={end_date2}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: "absolute",
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
                          onDateChange={value => {
                            this.props.getCarInformationTexts({
                              prop: "end_date",
                              value
                            });
                          }}
                        />
                      )}
                    </View>
                  </Item>
                </CardItem>
              ) : insurance_type=="1"&&start_date!=""?(
                <CardItem style={transparentBackground}>
                  <Item style={transparentBorder}>
                    <View style={{flexDirection: "column", width: "100%"}}>
                      <Label
                        style={[
                          labelStyle,
                          {
                            textAlign: lang == "ar" ? "right" : "left",
                            color: "#171717"
                          }
                        ]}
                      >
                        {strings("carInformation.end_date", lang)}
                      </Label>
                      <DatePicker
                        disabled={true}
                        style={datePickerStyle}
                        date={end_date1}
                        mode="date"
                        placeholder={strings("carInformation.end_date", lang)}
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        maxDate="2029-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: "absolute",
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
                        onDateChange={value => {
                          this.props.getCarInformationTexts({
                            prop: "end_date",
                            value
                          });
                        }}
                      />
                    </View>
                  </Item>
                </CardItem>
              ):null}
        {lang=='ar'?
            <View style={{marginRight:lang=='ar'?0:null,marginLeft:lang=='en'?10:10,marginTop:10,flexDirection:"row"}}>
            <Tooltip backgroundColor="#003580"width={350}height={150} popover={<Text style={[labelStyle,{color:"#fff"}]}>في حال تبين وجود حوادث غير معلن عنها يعتبر التأمين لاغيا دون اي ادنى مسؤولية</Text>}>

<Icon name='md-information-circle' style={{color:"#003580",fontSize:16}}/> 
</Tooltip >
          <Label style={[labelStyle,{textAlign:"right",color:this.state.form_submitted==true&&accredient_question_yes==false&&accredient_question_no==false?"red":  "#171717",fontSize:16}]}>{strings('carInformation.accedinet_ques',lang)}</Label>
   

 </View>
:
<View>
<View style={{marginRight:lang=='ar'?0:null,marginLeft:lang=='en'?10:10,marginTop:10}}>
<Label style={[labelStyle,{textAlign:"left",color:this.state.form_submitted==true&&accredient_question_yes==false&&accredient_question_no==false?"red":  "#171717",fontSize:16}]}>HAVE YOU CAUSED ANY TRAFFIC ACCIDENT DURING</Label>

</View>
<View style={{marginRight:lang=='ar'?0:null,marginLeft:lang=='en'?10:10,flexDirection:"row"}}>

<Label style={[labelStyle,{textAlign:"left",color:this.state.form_submitted==true&&accredient_question_yes==false&&accredient_question_no==false?"red":  "#171717",fontSize:16}]}> THE LAST YEAR? </Label>
<Tooltip backgroundColor="#003580"width={350}height={150} popover={<Text style={[labelStyle,{color:"#fff"}]}>في حال تبين وجود حوادث غير معلن عنها يعتبر التأمين لاغيا دون اي ادنى مسؤولية</Text>}>

<Icon name='md-information-circle' style={{color:"#003580",fontSize:16}}/> 
</Tooltip >

</View>
</View>

                      }
 {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

 <TouchableWithoutFeedback  onPress={() =>this.countYes(accredient_question_yes)}>
          <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]}  >
          
        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
               <CheckBox
            
            style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
            checked={accredient_question_yes}
            color="#003580"
            onPress={() =>this.countYes(accredient_question_yes)
          
            }
          />
 <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.yes',lang)}</Label>

               </View>
              
             </CardItem>
             </TouchableWithoutFeedback>
             :
             <TouchableWithoutFeedback  onPress={() =>this.countYes(accredient_question_yes)}>
             <CardItem style={[transparentBackground,{flexDirection: 'row-reverse'}]}  >
             
           <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
           <Label style={{textAlign:lang=='ar'?"right":"left",color:"#171717", textAlign:'right',marginBottom:15,fontFamily:'TajawalRegular0',lineHeight:25}}>{strings('health_insurance.yes',lang)}</Label>

         

<CheckBox
              
              style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
             checked={accredient_question_yes}
               color="#003580"
               onPress={() =>this.countYes(accredient_question_yes)               
                 }
               />   
                  </View>
                 
                </CardItem>
                </TouchableWithoutFeedback>
 }
  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

             <TouchableWithoutFeedback  onPress={() =>this.countNo(accredient_question_no)}>

             <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr",marginTop:-25}]}  >
           
           <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
            
   
            
                    <CheckBox
               
               style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
               checked={accredient_question_no}
               color="#003580"
               onPress={() =>this.countNo(accredient_question_no)
             
               }
             />
    <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717"}]}>{strings('health_insurance.no',lang)}</Label> 
  
 
                  </View>
                 
        
                </CardItem>
             </TouchableWithoutFeedback>
             :
             <TouchableWithoutFeedback  onPress={() =>this.countNo(accredient_question_no)}>

             <CardItem style={[transparentBackground,{flexDirection: 'row-reverse',marginTop:-25}]}  >
           
           <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
            
           <Label style={{textAlign:lang=='ar'?"right":"left",color:"#171717",textAlign:'right',marginBottom:15,fontFamily:'TajawalRegular0',lineHeight:25}}>{strings('health_insurance.no',lang)}</Label> 

            
                    <CheckBox
               
               style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
               checked={accredient_question_no}
               color="#003580"
               onPress={() =>this.countNo(accredient_question_no)
             
               }
             />
  
 
                  </View>
                 
        
                </CardItem>
             </TouchableWithoutFeedback>

              }
              <CardItem style={transparentBackground}>       

{!scanned_driving_license.scanned?
               <Body style={centerStyle}>

                  <Button
                    style={[uploadButton,{borderBottomColor:form_submitted && drivingLiceneseImage == null? "red": "#171717",borderBottomWidth:form_submitted && drivingLiceneseImage == null?1:0}]}
                    block
                    onPress={() => {
                      Alert.alert(
                        `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                          {
                            text: `${strings('add_photo.cancel',lang)}`,
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text:  `${strings('add_photo.take_photo',lang)}`,
                            onPress: () => {
                              this._takePicture();
                            }
                          },
                          {
                            text: `${strings('add_photo.choose_from_gallery',lang)}`,
                            onPress: this._pickImage
                          }
                        ],
                        {cancelable: false}
                      );
                    }}
                  >
                    {drivingLiceneseImage != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                    <Text style={uploadLicenseText}>{strings("drivinglicense.upload_car_license_front", lang)}</Text>
                    )}
                  </Button>
                  </Body>

                :null}
              </CardItem>
              {/* **************************** */}
              <CardItem style={transparentBackground}>
         

{!scanned_driving_license.scanned?
               <Body style={centerStyle}>

                  <Button
                    style={[uploadButton,{borderBottomColor:form_submitted && drivingLiceneseImageBack == null? "red": "#171717",borderBottomWidth:form_submitted && drivingLiceneseImageBack == null?1:0}]}
                    block
                    onPress={() => {
                      Alert.alert(
                        `${strings('add_photo.add_phot_title',lang)}`,
                        "",
                        [
                          {
                            text: `${strings('add_photo.cancel',lang)}`,
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text:  `${strings('add_photo.take_photo',lang)}`,
                            onPress: () => {
                              this._takePictureBack();
                            }
                          },
                          {
                            text: `${strings('add_photo.choose_from_gallery',lang)}`,
                            onPress: this._pickImageBack
                          }
                        ],
                        {cancelable: false}
                      );
                    }}
                  >
                    {drivingLiceneseImageBack != null ? (
                      <Icon
                        name="md-checkmark-circle"
                        style={{color: "green"}}
                      />
                    ) : (
                    <Text style={uploadLicenseText}>{strings("drivinglicense.upload_car_license_back", lang)}</Text>
                    )}
                  </Button>
                  </Body>

               :null }
              </CardItem>
             
  
              {lang=="en"?
              <CardItem style={transparentBackground}>
                <Body style={centerStyle}>
           
                       <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
          onPress={()=>this.goToInsuranceCompanies()}>
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
          onPress={()=>this.goToInsuranceCompanies()}>
                          <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>

           <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
         </TouchableOpacity>
                 </Body>
                 </CardItem>
                 :null}
            </View>
            :null}
{this.state.x?
    <View
  style={{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    width: dimensions.width,
    height:dimensions.height
  }}
>
  <Camera
    ref={ref => {
      this.camera = ref;
    }}
    style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",height:"100%"
    }}
    type={Camera.Constants.Type.back}
    flashMode={Camera.Constants.FlashMode.off}
    permissionDialogTitle={"Permission to use camera"}
    permissionDialogMessage={
      "We need your permission to use your camera phone"
    }
  >
    <View
      style={{
        backgroundColor: "rgba(1,1,1,0.6)",
        flex: 1,
        width: "100%",
        margin: 0
      }}
    />
 
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
        width: "100%",
        height: Dimensions.get("window").width * 0.95 * 2 / 3
      }}
    >

      <View
        style={{
          backgroundColor: "rgba(1,1,1,0.6)",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          width: "2.5%",
          margin: 0
        }}
      />
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#fcfcfc",
          borderWidth: 1,
          borderRadius: 2,
          margin: 0,
          width: "95%",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          minWidth: 200,
          minHeight: 100
        }}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#fcfcfc" />
        ) : null}
        <Image
          source={this.state.doneimg}
          style={{width: 128, height: 128}}
        />

      </View>
      <View
        style={{
          backgroundColor: "rgba(1,1,1,0.6)",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          width: "2.5%",
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}
      />
    </View>
    <View
      style={{
        backgroundColor: "rgba(1,1,1,0.6)",
        flex: 1,
        width: "100%",
        margin: 0,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >


    {this.state.loading_car?
    <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
                    <Left>
                      <Body>
                    <Button onPress={()=>this.start2()} style={{marginLeft:70}}>
                      <Text style={{fontFamily: "TajawalBold0"}}>capture</Text>
                    </Button>
                    </Body>
                    </Left>
                    <Right>
                      <Body>
                    <Button onPress={()=>this.setState({x:false})} style={{marginRight:60}}>
        <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      </Button>
      </Body>
                    </Right>
                    </CardItem>
                    :
                    <ActivityIndicator size="large" color="#fcfcfc" />
    }
    </View>

    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}
    />
  </Camera>




</View>
:null}
{this.state.x2? 
   <View
  style={{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    width: dimensions.width,
    height: dimensions.height
  }}
>
  <Camera
    ref={ref => {
      this.camera = ref;
    }}
    style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    }}
    type={Camera.Constants.Type.back}
    flashMode={Camera.Constants.FlashMode.off}
    permissionDialogTitle={"Permission to use camera"}
    permissionDialogMessage={
      "We need your permission to use your camera phone"
    }
  >
    <View
      style={{
        backgroundColor: "rgba(1,1,1,0.6)",
        flex: 1,
        width: "100%",
        margin: 0
      }}
    />

    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
        width: "100%",
        height: Dimensions.get("window").width * 0.95 * 2 / 3
      }}
    >

      <View
        style={{
          backgroundColor: "rgba(1,1,1,0.6)",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          width: "2.5%",
          margin: 0
        }}
      />
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#fcfcfc",
          borderWidth: 1,
          borderRadius: 2,
          margin: 0,
          width: "95%",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          minWidth: 200,
          minHeight: 100
        }}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#fcfcfc" />
        ) : null}
        <Image
          source={this.state.doneimg}
          style={{width: 128, height: 128}}
        />

      </View>
      <View
        style={{
          backgroundColor: "rgba(1,1,1,0.6)",
          height: Dimensions.get("window").width * 0.95 * 2 / 3,
          width: "2.5%",
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}
      />
    </View>
    <View
      style={{
        backgroundColor: "rgba(1,1,1,0.6)",
        flex: 1,
        width: "100%",
        margin: 0,
        paddingTop: 20,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >

    
  {this.state.loading_car_back?
    
      <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
                    <Left>
                      <Body>
                    <Button onPress={()=>this.start2Back()} style={{marginLeft:70}}>
                      <Text style={{fontFamily: "TajawalBold0"}}>capture</Text>
                    </Button>
                    </Body>
                    </Left>
                    <Right>
                      <Body>
                    <Button onPress={()=>this.setState({x2:false})} style={{marginRight:60}}>
        <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      </Button>
      </Body>
                    </Right>
                    </CardItem>
                    :
            <ActivityIndicator size="large" color="#fcfcfc" />
  }

    </View>

    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
      }}
    />
  </Camera>




</View>
:null}
            {/* <View style={{height:50,backgroundColor:"trasparent"}}></View> */}
          </ScrollView>
          <Text>{this.showAlert()}</Text>
          <DropdownAlert replaceEnabled={true}  titleStyle={{textAlign:lang=='ar'? 'right':'left',fontFamily:'TajawalBold0',color:"#fff"}} messageStyle={{textAlign:lang=='ar'?'right':'left',fontFamily:'TajawalBold0',color:"#fff"}}imageStyle={{direction:'rtl'}} ref={(ref) => this.dropdown = ref}  />    

        </Drawer>
      </ImageBackground>
    );
  }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default CarInformation;
const mapStateToProps = state => {
  const {lang} = state.sideBarReducer;
  const {
    full_name,
    insurance_type,
    car_type,
    vehicle_number,
    car_model,
    manufacturing_year,
    driver,
    fuel_type,
    car_salary,
    start_date,
    end_date,
    information_loading,
    id_number,
    cars,
    cars_model,
    car_information_msg,
    coding,car_category,bolisa_number,insuranceCompanies,company,accredient_question_yes,accredient_question_no
  } = state.carInformarionReducer;
  return {
    full_name,
    insurance_type,
    car_type,
    vehicle_number,
    car_model,
    manufacturing_year,
    driver,
    fuel_type,
    car_salary,
    start_date,
    end_date,
    information_loading,
    id_number,
    cars,
    cars_model,
    car_information_msg,
    lang,
    coding,car_category,bolisa_number,insuranceCompanies,company,accredient_question_yes,accredient_question_no
  };
};
// END MAP STATE TO PROPS

export default connect(mapStateToProps, carInformationAction)(CarInformation);