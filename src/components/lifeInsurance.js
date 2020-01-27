import React, {Component} from "react";
import {
  ImageBackground,
  Dimensions,
  ScrollView,
  View,
  Image,
  Modal,
  Platform,
  Keyboard,
  StatusBar,
  ImageEditor,
  ImageStore,
  Alert,TouchableWithoutFeedback,TouchableOpacity,ActivityIndicator
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
  CheckBox,
  Drawer
} from "native-base";
import {
  transparentBackground,
  transparentBorder,
  inputStyle,
  centerStyle,
  buttonStyle,
  buttonText,
  pickerStyle,
  datePickerStyle,
  labelStyle
} from "../theme";
import * as lifeInsuranceAction from "../actions/lifeInsuranceAction";
import DropdownAlert from "react-native-dropdownalert";
import {connect} from "react-redux";
import {strings} from "../../Locales/i18n";
import Header from "./header";
import Header2 from './headerWithoutArrow';

import SideBar from "./sideBar";
const dimensions = Dimensions.get("window");
import DatePicker from "react-native-datepicker";
import * as ImageManipulator from 'expo-image-manipulator';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import {
  uploadButton,
  continueText,
  uploadLicenseText
} from "../assests/styles/drivingLicenseStyles";
import {scanned_id_image} from "../App";

var percent_arr = [
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%"
];

class LifeInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_submitted: false,
      father_form_submitted: false,
      mother_form_submitted: false,
      sister_form_submitted: false,
      brother_form_submitted: false,
      daughters_form_submitted: false,
      husband_form_submitted: false,
      wife_form_submitted: false,
      beneficiaries: [],
      // fatherInfo:null,
      // motherInfo:null,
      // sisterInfo:null,
      // brotherInfo:null,
      // daughtersInfo:null,
      // husbandInfo:null,
      // wifeInfo:null,
      totalAll: 0,
      x: false,
      id_image64: null,
      type: Camera.Constants.Type.back,
      id_image: null,
      cameraPermission: null,
      cameraRollPermission: null,
      full_name: "",
      id_number: "",
      id_image2: "",
      date_of_birth:"",
      aa:true

    };
  }
  async componentWillMount() {
  
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === "granted"});
  }
  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    //alert(this.props.full_name);
    //alert(scanned_driving_license.full_name);
console.log("Scanned_id_Image in life",scanned_id_image)
    this.setState({
      full_name: scanned_id_image.full_name.replace("المملكة الأردنية الهاشمية"),
      id_number: scanned_id_image.id_number,
      id_image2: scanned_id_image.skip_id_img,
      date_of_birth:scanned_id_image.date_of_birth.replace("تاريخ الودة"),
      cameraPermission: cameraPermission.status,
      cameraRollPermission: cameraRollPermission.status
    });
  }
  componentDidUpdate() {
    const {life_insurance_msg} = this.props;
    if (life_insurance_msg != null) {
      setTimeout(() => this.props.resetLifeInsuranceMessage(), 300);
    }
  }

  //START DROPDOWN MESSAGES
  onError = error => {
    const {lang} = this.props;
    if (error) {
      console.log("error", error);
      this.dropdown.alertWithType(
        "error",
        strings("message.error", lang),
        error
      );
    }
  };

  onSuccess = success => {
    const {lang} = this.props;

    if (success) {
      this.dropdown.alertWithType("success", "", success);
    }
  };

  //END DROPDOWN MESSAGES
  //START SHOW ALERT FUNC
  showAlert = () => {
    const {life_insurance_msg} = this.props;
    if (life_insurance_msg != null) {
      if (life_insurance_msg.isError) {
        this.onError(life_insurance_msg.msg);
      } else if (life_insurance_msg.isSuccess) {
        this.onSuccess(life_insurance_msg.msg);
      } else {
        return;
      }
    }
  };
  goFromLifeInsurance = (arr,total) => {
 

    this.setState({form_submitted: true});
    const {
      full_name,
      id_number,
      age,
      value_of_insurance,
      user_id,
      lang
    } = this.props;


    if (full_name == "" && this.state.full_name != "") {
      this.props.goFromLifeInsurance(
        this.state.full_name,
        this.state.id_number,
        this.state.date_of_birth,
        value_of_insurance,
        arr,
        user_id,
        strings("message.fill_message", lang),
        strings("lifeinsurance.message", lang),
        this.state.id_image2,total
      );
    } else if (id_number != "" && this.state.id_number == "") {
      this.props.goFromLifeInsurance(
        full_name,
        id_number,
        age,
        value_of_insurance,
        arr,
        user_id,
        strings("message.fill_message", lang),
        strings("lifeinsurance.message", lang),
        this.state.id_image,total
      );
    }

  };
  count = text => {
    const {
      father_name,
      father_id,
      father_percentage,
      father,
      mother,
      mother_id,
      mother_name,
      mother_percentage,
      sister,
      sister_id,
      sister_name,
      sister_percentage,
      brother,
      brother_id,
      brother_name,
      brother_percentage,
      daughters,
      daughters_id,
      daughters_name,
      daughters_percentage,
      wife,
      wife_name,
      wife_id,
      wife_percentage,
      husband_id,
      husband,
      husband_name,
      husband_percentage
    } = this.props;

    if (text == "father" && father) {
      const data = {
        name: father_name,
        beneficiary_id: father_id,
        percentage: 100,
        beneficiary: "father"
      };
      this.setState({father_form_submitted: true});
      // this.setState({fatherInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "fatherInfo",
        value: data
      });
      if (father_name != "" && father_id != "") {
        this.props.showFatherModal(!this.props.modalFatherShow);
      }

      // arr.push(data)
    }
    if (text == "mother" && mother) {
      const data = {
        name: mother_name,
        beneficiary_id: mother_id,
        percentage: 100,
        beneficiary: "mother"
      };
      this.setState({mother_form_submitted: true});
      // this.setState({motherInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "motherInfo",
        value: data
      });
      if (mother_name != "" && mother_id != "") {
        this.props.showMotherModal(!this.props.modalMotherShow);
      }

      // arr.push(data)
    }
    if (text == "sister" && sister) {
      const data = {
        name: sister_name,
        beneficiary_id: sister_id,
        percentage: 100,
        beneficiary: "sister"
      };
      this.setState({sister_form_submitted: true});

      // this.setState({sisterInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "sisterInfo",
        value: data
      });
      if (sister_name != "" && sister_id != "") {
        this.props.showSisterModal(!this.props.modalSisterShow);
      }

      // arr.push(data)
    }
    if (text == "brother" && brother) {
      const data = {
        name: brother_name,
        beneficiary_id: brother_id,
        percentage: 100,
        beneficiary: "brother"
      };
      this.setState({brother_form_submitted: true});
      // this.setState({brotherInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "brotherInfo",
        value: data
      });
      if (brother_name != "" && brother_id != "") {
        this.props.showBrotherModal(!this.props.modalBrotherShow);
      }
      // arr.push(data)
    }
    if (text == "daughters" && daughters) {
      const data = {
        name: daughters_name,
        beneficiary_id: daughters_id,
        percentage: 100,
        beneficiary: "daughers"
      };
      this.setState({daughters_form_submitted: true});
      // this.setState({daughtersInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "daughtersInfo",
        value: data
      });
      if (
        daughters_name != "" &&
        daughters_id != "" &&
        daughters_percentage != ""
      ) {
        this.props.showDaughtersModal(!this.props.modalDaughtersShow);
      }
      // arr.push(data)
    }
    if (text == "husband" && husband) {
      const data = {
        name: husband_name,
        beneficiary_id: husband_id,
        percentage: 100,
        beneficiary: "husband"
      };
      this.setState({husband_form_submitted: true});
      // this.setState({husbandInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "husbandInfo",
        value: data
      });
      if (husband_name != "" && husband_id != "") {
        this.props.showHusbandModal(!this.props.modalHusbandShow);
      }
      // arr.push(data)
    }
    if (text == "wife" && wife) {
      const data = {
        name: wife_name,
        beneficiary_id: wife_id,
        percentage: 100,
        beneficiary: "wife"
      };
      this.setState({wife_form_submitted: true});
      // this.setState({wifeInfo:data})
      this.props.getLifeInsuranceTexts({
        prop: "wifeInfo",
        value: data
      });
      if (wife_name != "" && wife_id != "") {
        this.props.showWifeModal(!this.props.modalWifeShow);
      }
      // arr.push(data)
    }
  };
  ShowModal = mother => {
    const {modalMotherShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: !mother
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    if (!mother) {
      this.props.showMotherModal(!modalMotherShow);
    }
  };
  ShowFatherModal = father => {
    const {modalFatherShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: !father
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!father) {
      this.props.showFatherModal(!modalFatherShow);
    }
  };
  ShowBrotherModal = brother => {
    const {modalBrotherShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: !brother
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!brother) {
      this.props.showBrotherModal(!modalBrotherShow);
    }
  };
  ShowSisterModal = sister => {
    const {modalSisterShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: !sister
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!sister) {
      this.props.showSisterModal(!modalSisterShow);
    }
  };
  ShowDaughtersModal = daughters => {
    const {modalDaughtersShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: !daughters
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!daughters) {
      this.props.showDaughtersModal(!modalDaughtersShow);
    }
  };
  ShowHusbandModal = husband => {
    const {modalHusbandShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: !husband
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!husband) {
      this.props.showHusbandModal(!modalHusbandShow);
    }
  };
  ShowWifeModal = wife => {
    const {modalWifeShow} = this.props;
    this.props.getLifeInsuranceTexts({
      prop: "wife",
      value: !wife
    });
    this.props.getLifeInsuranceTexts({
      prop: "brother",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "sister",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "daughters",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "husband",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "father",
      value: false
    });
    this.props.getLifeInsuranceTexts({
      prop: "mother",
      value: false
    });
    if (!wife) {
      this.props.showWifeModal(!modalWifeShow);
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
  _pickImageId = async () => {
    this._checkCameraRollPermissions();
    this._reqCameraRollPermissions();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.setState({id_image: result.uri});
    }
  };

  capture2 = true;

  startId() {
    this.setState({x: true});
  }
  start2Id = () => {
    this.capture2 = true;
    setInterval(() => {
      if (this.capture2) {
        this.takePictureId();
      }
    }, 300);
  };
  _takePictureId = async () => {
    this.startId();
  };
  async takePictureId() {
    if (this.camera && this.capture2) {
      this.capture2 = false;

      const options = {quality: 1, base64: true};
      var cur = this;
      this.setState({aa:false})
      this.camera.takePictureAsync(options).then(async data => {
        var d = await ImageManipulator.manipulateAsync(
          data.uri,
          [{resize: {width: 1200}}],
          {base64: true}
        );
      
        var yoffset = d.height / 2 - d.width * 0.95 * 2 / 6;
        var snappheight = d.width * 0.95 * 2 / 3;
        const cropData = {
          offset: {x: d.width * 0.05, y: yoffset},
          size: {width: d.width * 0.95, height: snappheight}
        };
        var cur = this;
        this.setState({id_image: d.uri});
        cur.setState({x: false});
        this.setState({aa: true});

        // ImageEditor.cropImage(
        //   this.state.id_image,
        //   cropData,
        //   uri => {
        //     ImageStore.getBase64ForTag(
        //       uri,
        //       base64data => {
        //         this.setState({id_image64: base64data});
        //       },
        //       err => {
        //       }
        //     );
        //   },
        //   err => {
        //   }
        // );

      });
    }
  }

  render() {
    const {
      full_name,
      id_number,
      age,
      lang,
      value_of_insurance,
      father,
      mother,
      sister,
      brother,
      daughters,
      modalMotherShow,
      modalFatherShow,
      modalBrotherShow,
      modalSisterShow,
      modalDaughtersShow,
      father_name,
      father_id,
      father_percentage,
      mother_name,
      mother_id,
      mother_percentage,
      sister_name,
      sister_id,
      sister_percentage,
      brother_name,
      brother_id,
      brother_percentage,
      daughters_name,
      daughters_id,
      daughters_percentage,
      husband,
      wife,
      husband_name,
      husband_id,
      husband_percentage,
      wife_name,
      wife_id,
      wife_percentage,
      modalHusbandShow,
      modalWifeShow
    } = this.props;
    const {
      form_submitted,
      father_form_submitted,
      mother_form_submitted,
      sister_form_submitted,
      brother_form_submitted,
      daughters_form_submitted,
      wife_form_submitted,
      husband_form_submitted
    } = this.state;
    var arr = [];
    var total = 0;
 
    if (this.props.fatherInfo != null && father) {
      console.log("fatherInfo",this.props.fatherInfo)
      arr.push(this.props.fatherInfo);
    }
    if (this.props.motherInfo != null && mother) {
      arr.push(this.props.motherInfo);
    }
    if (this.props.sisterInfo != null && sister) {
      arr.push(this.props.sisterInfo);
    }
    if (this.props.brotherInfo != null && brother) {
      arr.push(this.props.brotherInfo);
    }
    if (this.props.daughtersInfo != null && daughters) {
      arr.push(this.props.daughtersInfo);
    }
    if (this.props.husbandInfo != null && husband) {
      arr.push(this.props.husbandInfo);
    }
    if (this.props.wifeInfo != null && wife) {
      arr.push(this.props.wifeInfo);
    }
  console.log("arr5436728947",arr)
  if(arr.length>0){
    total=100
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
   {!this.state.x?
          <Header openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
:
          <Header2 openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
    }
          <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
       
            {!this.state.x ? (
                 <ScrollView
                 ref={ref => {
                   this._scrollView = ref;
                 }}
               >
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
                          labelStyle,
                          {
                            textAlign: lang == "ar" ? "right" : "left",
                            color: "#171717",
                            lineHeight: 20
                          }
                        ]}
                      >
                        {strings("lifeinsurance.name", lang)}{scanned_id_image.scanned?form_submitted && this.state.full_name == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&full_name==""?<Text style={{color:"red"}}>*</Text>:null}
                      </Label>
                      {scanned_id_image.scanned ? (
                        <Input
                          color="#fff"
                          value={this.state.full_name}
                          //  placeholder ={strings('carInformation.full_name',lang)}
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
                                form_submitted && this.state.full_name == ""
                                  ? 2
                                  : 0
                            }
                          ]}
                          onChangeText={value =>
                            // this.props.getLifeInsuranceTexts({
                            //   prop: "full_name",
                            //   value
                            // })
                            this.setState({full_name:value})
                          }
                        />
                      ) : (
                        <Input
                          color="#fff"
                          value={full_name}
                          //  placeholder ={strings('carInformation.full_name',lang)}
                          placeholderTextColor="#9B9B9B"
                          style={[
                            inputStyle,
                            {
                              fontFamily: "TajawalRegular0",
                              textAlign: lang == "ar" ? "right" : "left",
                              borderBottomColor:
                                form_submitted && full_name == ""
                                  ? "red"
                                  : "#171717",
                              borderBottomWidth:
                                form_submitted && full_name == "" ? 2 : 0
                            }
                          ]}
                          onChangeText={value =>
                            this.props.getLifeInsuranceTexts({
                              prop: "full_name",
                              value
                            })
                          }
                        />
                      )}
                    </View>
                  </Item>
                </CardItem>
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
                        {strings("carInformation.id_number", lang)}{scanned_id_image.scanned?form_submitted && this.state.id_number == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&id_number==""?<Text style={{color:"red"}}>*</Text>:null}
                      </Label>
                      {scanned_id_image.scanned ? (
                        <Input
                          keyboardType="numeric"
                          returnKeyType='done'

                          color="#fff"
                          value={this.state.id_number}
                          //  placeholder ={strings('carInformation.id_number',lang)}
                          placeholderTextColor="#9B9B9B"
                          style={[
                            inputStyle,
                            {
                              fontFamily: "TajawalRegular0",
                              textAlign: lang == "ar" ? "right" : "left",
                              borderBottomColor:
                                form_submitted && this.state.id_number == ""
                                  ? "red"
                                  : "#171717",
                              borderBottomWidth:
                                form_submitted && this.state.id_number == ""
                                  ? 2
                                  : 0
                            }
                          ]}
                          onChangeText={value =>
                    
                            this.setState({id_number:value})
                          }
                        />
                      ) : (
                        <Input
                          keyboardType="numeric"
                          returnKeyType='done'

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
                                form_submitted && id_number == "" ? 2: 0
                            }
                          ]}
                          onChangeText={value =>
                            this.props.getLifeInsuranceTexts({
                              prop: "id_number",
                              value
                            })
                          }
                        />
                      )}
                    </View>
                  </Item>
                </CardItem>

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
                        {strings("lifeinsurance.birthday", lang)}{scanned_id_image.scanned?form_submitted && this.state.full_name == ""?<Text style={{color:"red"}}>*</Text>:null:form_submitted&&age==""?<Text style={{color:"red"}}>*</Text>:null}
                      </Label>
            
                                            {scanned_id_image.scanned ? (

<Input
  color="#fff"
  value ={this.state.date_of_birth}
 //  placeholder ={strings('carInformation.full_name',lang)}
  placeholderTextColor="#9B9B9B"
  style={[inputStyle,{fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left",borderBottomColor:form_submitted && this.state.date_of_birth == ""? "red": "#171717",borderBottomWidth:form_submitted && this.state.date_of_birth == ""?2:0}]}
  onChangeText={value =>
  // this.props.getLifeInsuranceTexts({prop:"full_name",value})
  this.setState({date_of_birth:value})
  }
/>
):
                      <DatePicker
                        style={[
                          datePickerStyle,
                          {
                            borderBottomColor:
                              form_submitted && age == "" ? "red" : "#171717",
                            borderBottomWidth:
                              form_submitted && age == "" ? 2 : 0
                          }
                        ]}
                        date={age}
                        mode="date"
                        placeholder={strings("lifeinsurance.birthday", lang)}
                        format="YYYY-MM-DD"
                        maxDate={new Date()}
                        minDate="1945-12-31"
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
                        onDateChange={value =>
                          this.props.getLifeInsuranceTexts({prop: "age", value})
                          // this.setState({date_of_birth:value})
                        }
                      />
                                            }
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
                        {strings("lifeinsurance.value_of_insurance", lang)}{form_submitted && value_of_insurance == ""?<Text style={{color:"red"}}>*</Text>:null}
                      </Label>
        
                     <Picker
                                          mode="dropdown"
                                          // placeholder={strings('order_page.Filter_by_date',lang)}
                                          iosIcon={<Icon name="arrow-down" />}
                                          placeholderStyle={{color: "#9B9B9B"}}
                                          style={[
                                            pickerStyle,
                                            {
                                              direction: lang == "ar" ? "rtl" : "ltr",borderBottomColor:form_submitted && value_of_insurance == ""? "red": "#171717",borderBottomWidth:form_submitted && value_of_insurance == ""?2:0
                                              
                                            }
                                          ]}
                                          selectedValue={value_of_insurance}
                                          onValueChange={value =>
                                            this.props.getLifeInsuranceTexts({
                                              prop: "value_of_insurance",
                                              value
                                            })
                                          }
                                        >
                                     <Picker.Item label={strings("lifeinsurance.choose_value_of_insurance", lang)} value="" />
                                      <Picker.Item label="JOD 25,000" value="25000" />
                        <Picker.Item label="JOD 50,000" value="50000" />
                        <Picker.Item label="JOD 75,000" value="75000" />
                        <Picker.Item label="JOD 100,000" value="100000" />
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
                      {strings("lifeinsurance.value_of_insurance", lang)}{form_submitted && value_of_insurance == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
              
        

                            <View style={{height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:3,marginBottom:0,
                            borderBottomColor:form_submitted && value_of_insurance == ""? "red": "#171717",borderBottomWidth:form_submitted && value_of_insurance == ""?2:0
                          }}>
              
      
                         
              <Picker
                       mode="dropdown"
                       iosIcon={<Icon name="md-arrow-dropdown" style={{color: "#000", height:'100%',marginTop:-5,}} />}
                       style={{height:45,width:dimensions.width/1.1}}
                       selectedValue={value_of_insurance}
                       onValueChange={value =>
                        this.props.getLifeInsuranceTexts({
                          prop: "value_of_insurance",
                          value
                        })
                      }
                    
                       
                   >
                                   <Picker.Item label={strings("lifeinsurance.choose_value_of_insurance", lang)} value="" />
                                    <Picker.Item label="JOD 25,000" value="25000" />
                      <Picker.Item label="JOD 50,000" value="50000" />
                      <Picker.Item label="JOD 75,000" value="75000" />
                      <Picker.Item label="JOD 100,000" value="100000" />
                                      </Picker>
                                      </View>
                  </View>
                </Item>
              </CardItem>
                                        }
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
                        {strings("lifeinsurance.beneficiaries", lang)}
                      </Label>
                    </View>
                  </Item>
                </CardItem>
                {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                <CardItem
                  style={[
                    transparentBackground,
                    {direction: lang == "ar" ? "rtl" : "ltr"}
                  ]}
                >
                  <Item style={transparentBorder}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center"
                      }}
                    >
                      {total != 100 || father == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={father}
                            color="#003580"
                            onPress={
                              () => this.ShowFatherModal(father)
                        
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.father", lang)}
                          </Text>
                        </View>
                      ) : null}
                      {total != 100 || mother == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={mother}
                            color="#003580"
                            onPress={
                              () => this.ShowModal(mother)
                           
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.mother", lang)}
                          </Text>
                        </View>
                      ) : null}
                      {total != 100 || brother == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={brother}
                            color="#003580"
                            onPress={
                              () => this.ShowBrotherModal(brother)
                            
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.brother", lang)}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </Item>
                </CardItem>
:

     
<CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
             
{/* <Right style={{justifyContent:'flex-end'}}> */}
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
{total != 100 || brother == true ? (
        <View style={{flexDirection: "row", width: "30%"}}>
             <Text
            style={{
              fontFamily: "TajawalMedium0",
              fontSize: 14,
              marginTop: 5
            }}
          >
            {strings("lifeinsurance.brother", lang)}
          </Text>
          <CheckBox
            style={{
              marginRight: 15,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 4
            }}
            checked={brother}
            color="#003580"
            onPress={
              () => this.ShowBrotherModal(brother)
         
            }
          />
     
        </View>
      ) : null}
      {total != 100 || mother == true ? (
        <View style={{flexDirection: "row", width: "30%"}}>
              <Text
            style={{
              fontFamily: "TajawalMedium0",
              fontSize: 14,
              marginTop: 5
            }}
          >
            {strings("lifeinsurance.mother", lang)}
          </Text>
          <CheckBox
            style={{
              marginRight: 15,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 4
            }}
            checked={mother}
            color="#003580"
            onPress={
              () => this.ShowModal(mother)
       
            }
          />
    
        </View>
      ) : null}

      {total != 100 || father == true ? (
        <View style={{flexDirection: "row", width: "30%"}}>
         <Text
            style={{
              fontFamily: "TajawalMedium0",
              fontSize: 14,
              marginTop: 5
            }}
          >
            {strings("lifeinsurance.father", lang)}
          </Text>
          <CheckBox
            style={{
              marginRight: 15,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 4
            }}
            checked={father}
            color="#003580"
            onPress={
              () => this.ShowFatherModal(father)
          
            }
          />
         
        </View>
      ) : null}
      </View>


     </CardItem>
                          }
        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                <CardItem
                  style={[
                    transparentBackground,
                    {direction: lang == "ar" ? "rtl" : "ltr"}
                  ]}
                >
                  <Item style={transparentBorder}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center"
                      }}
                    >
                      {total != 100 || sister == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={sister}
                            color="#003580"
                            onPress={
                              () => this.ShowSisterModal(sister)
                         
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.sister", lang)}
                          </Text>
                        </View>
                      ) : null}
                      {total != 100 || daughters == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={daughters}
                            color="#003580"
                            onPress={
                              () => this.ShowDaughtersModal(daughters)
                          
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.daughters", lang)}
                          </Text>
                        </View>
                      ) : null}
                      {total != 100 || husband == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={husband}
                            color="#003580"
                            onPress={
                              () => this.ShowHusbandModal(husband)
                         
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.husband", lang)}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </Item>
                </CardItem>
                :
           
              <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
             
              {/* <Right style={{justifyContent:'flex-end'}}> */}
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center',width:'90%'}}>
              {total != 100 || husband == true ? (
                      <View style={{flexDirection: "row"}}>
                          <Text
                          style={{
                            fontFamily: "TajawalMedium0",
                            fontSize: 14,
                            marginTop: 5
                          }}
                        >
                          {strings("lifeinsurance.husband", lang)}
                        </Text>
                        <CheckBox
                          style={{
                            marginRight: 15,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 4
                          }}
                          checked={husband}
                          color="#003580"
                          onPress={
                            () => this.ShowHusbandModal(husband)
                       
                          }
                        />
                    
                      </View>
                    ) : null}
            
                    {total != 100 || daughters == true ? (
                      <View style={{flexDirection: "row", width: "30%"}}>
                            <Text
                          style={{
                            fontFamily: "TajawalMedium0",
                            fontSize: 14,
                            marginTop: 5
                          }}
                        >
                          {strings("lifeinsurance.daughters", lang)}
                        </Text>
                        <CheckBox
                          style={{
                            marginRight: 15,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 4
                          }}
                          checked={daughters}
                          color="#003580"
                          onPress={
                            () => this.ShowDaughtersModal(daughters)
                        
                          }
                        />
                  
                      </View>
                    ) : null}
                 {total != 100 || sister == true ? (
                      <View style={{flexDirection: "row", width: "30%",marginRight:5}}>
                             <Text
                          style={{
                            fontFamily: "TajawalMedium0",
                            fontSize: 14,
                            marginTop: 5
                          }}
                        >
                          {strings("lifeinsurance.sister", lang)}
                        </Text>
                        <CheckBox
                          style={{
                            marginRight: 15,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 4
                          }}
                          checked={sister}
                          color="#003580"
                          onPress={
                            () => this.ShowSisterModal(sister)
                       
                          }
                        />
                 
                      </View>
                    ) : null}
                    </View>
    
    
                   </CardItem>

                          }
                {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                <CardItem
                  style={[
                    transparentBackground,
                    {direction: lang == "ar" ? "rtl" : "ltr"}
                  ]}
                >
                  <Item style={transparentBorder}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center"
                      }}
                    >
                      {total != 100 || wife == true ? (
                        <View style={{flexDirection: "row", width: "30%"}}>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={wife}
                            color="#003580"
                            onPress={
                              () => this.ShowWifeModal(wife)
                              // this.props.getLifeInsuranceTexts({
                              //   prop: "sister",
                              //   value: !sister
                              // })
                            }
                          />
                          <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.wife", lang)}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </Item>
                </CardItem>
                :
            
              <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
             
              {/* <Right style={{justifyContent:'flex-end'}}> */}
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
              {total != 100 || wife == true ? (
                        <View style={{flexDirection: "row",marginRight:25}}>
                           <Text
                            style={{
                              fontFamily: "TajawalMedium0",
                              fontSize: 14,
                              marginTop: 5
                            }}
                          >
                            {strings("lifeinsurance.wife", lang)}
                          </Text>
                          <CheckBox
                            style={{
                              marginRight: 15,
                              borderRadius: 50,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 4
                            }}
                            checked={wife}
                            color="#003580"
                            onPress={
                              () => this.ShowWifeModal(wife)
                       
                            }
                          />
                       
                        </View>
                      ) : null}
                    </View>
    
    
                   </CardItem>
                          }
                <CardItem style={transparentBackground}>
               
                  {!scanned_id_image.scanned?
                    <Body
                      style={[
                        centerStyle,
                        {
                          borderBottomColor:
                            form_submitted && this.state.id_image == null
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            form_submitted && this.state.id_image == null
                              ? 2
                              : 0
                        }
                      ]}
                    >
                <Button style={uploadButton} block 




onPress={() => {
   Alert.alert(
     `${strings('add_photo.add_phot_title',lang)}`,
       "",
       [
           { text: `${strings('add_photo.cancel',lang)}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
           { text: `${strings('add_photo.take_photo',lang)}`, onPress: () => { this._takePictureId() } },
           { text: `${strings('add_photo.choose_from_gallery',lang)}`, onPress: this._pickImageId},

       ],
       { cancelable: false }
   )
}}




  >
  {this.state.id_image != null ? (
     <Icon
       name="md-checkmark-circle"
       style={{color: "green"}}
     />
   ) : (
    <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_id',lang)}</Text>
   )}
  </Button>
                    </Body>
                  :null}
                </CardItem>
                {lang=="en"?
                <CardItem style={transparentBackground}>
                  <Body style={centerStyle}>
            
                           <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={() => this.goFromLifeInsurance(arr,total)}>
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
            onPress={() => this.goFromLifeInsurance(arr,total)}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
                    </Body>
                    </CardItem>
                    :null}
              </View>
              </ScrollView>
            ) : null}

            {this.state.x ? (
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
               
                    {this.state.aa?
      //             <CardItem style={{ backgroundColor: "rgba(1,1,1,0.6)"}}>
      //               <Left>
      //                 <Body>
      //               <Button onPress={()=>this.start2Id()} style={{marginLeft:70}}>
      //                 <Text style={{fontFamily: "TajawalBold0"}}>Capture</Text>
      //               </Button>
      //               </Body>
      //               </Left>
      //               <Right>
      //                 <Body>
      //               <Button onPress={()=>this.setState({x:false})} style={{marginRight:60}}>
      //   <Text style={{fontFamily: "TajawalBold0"}}>Cancel</Text>
      // </Button>
      // </Body>
      //               </Right>
      //               </CardItem>
      <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center',height:60}}>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.start2Id()} >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>{strings('drivinglicense.capture',lang)}</Text>
      </Button>
      <Text>   </Text>
      <Button style={{justifyContent:'center',marginTop:8,width:120}}onPress={()=>this.setState({x:false})} >
        <Text style={{fontFamily:'TajawalMedium0',lineHeight:25,fontSize:18}}>{strings('drivinglicense.cancel',lang)}</Text>
      </Button>
    
    </View>
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
            ) : null}
            <Modal
              visible={modalFatherShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showFatherModal(!modalFatherShow)
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
                          this.props.showFatherModal(!modalFatherShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?
                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717",
                        lineHeight: 20
                      }
                    ]}
                  >
                    {strings("lifeinsurance.name", lang)}{form_submitted && father_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          fontFamily: "TajawalRegular0",
                          textAlign: lang == "ar" ? "right" : "left",

                          borderBottomColor:
                            father_form_submitted && father_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            father_form_submitted && father_name == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "father_name",
                            value
                          })
                        }
                        value={father_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :

                  <CardItem style={{flexDirection:"row-reverse"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717"
                        }
                      ]}
                    >
                      {strings("carInformation.id_number", lang)}{form_submitted && father_id == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                  </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            father_form_submitted && father_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            father_form_submitted && father_id == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "father_id",
                            value
                          })
                        }
                        value={father_id}
                      />
                    </Item>
                  </CardItem>
                  
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("father")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>

            <Modal
              visible={modalMotherShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showMotherModal(!modalMotherShow)
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
                <TouchableWithoutFeedback   onPress={() =>this.props.showMotherModal(!modalMotherShow)}>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showMotherModal(!modalMotherShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717",
                        lineHeight: 20
                      }
                    ]}
                  >
                    {strings("lifeinsurance.name", lang)}{form_submitted && mother_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            mother_form_submitted && mother_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            mother_form_submitted && mother_name == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "mother_name",
                            value
                          })
                        }
                        value={mother_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted && mother_id == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                  }

                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            mother_form_submitted && mother_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            mother_form_submitted && mother_id == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "mother_id",
                            value
                          })
                        }
                        value={mother_id}
                      />
                    </Item>
                  </CardItem>
                  
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("mother")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
            <Modal
              visible={modalBrotherShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showBrotherModal(!modalBrotherShow)
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
                <TouchableWithoutFeedback onPress={() =>
                          this.props.showBrotherModal(!modalBrotherShow)
                        }>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showBrotherModal(!modalBrotherShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :

                  <CardItem style={{flexDirection:"row-reverse"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}{form_submitted && brother_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                  </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            brother_form_submitted && brother_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            brother_form_submitted && brother_name == "" ? 2: 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "brother_name",
                            value
                          })
                        }
                        value={brother_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted && brother_id == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                      
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            brother_form_submitted && brother_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            brother_form_submitted && brother_id == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "brother_id",
                            value
                          })
                        }
                        value={brother_id}
                      />
                    </Item>
                  </CardItem>
                  
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("brother")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
            <Modal
              visible={modalSisterShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showSisterModal(!modalSisterShow)
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
                <TouchableWithoutFeedback>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showSisterModal(!modalSisterShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717",
                        lineHeight: 20
                      }
                    ]}
                  >
                    {strings("lifeinsurance.name", lang)}{form_submitted && sister_name== ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            sister_form_submitted && sister_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            sister_form_submitted && sister_name == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "sister_name",
                            value
                          })
                        }
                        value={sister_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted && sister_id == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            sister_form_submitted && sister_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            sister_form_submitted && sister_id == "" ? 2: 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "sister_id",
                            value
                          })
                        }
                        value={sister_id}
                      />
                    </Item>
                  </CardItem>
                 
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("sister")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
            <Modal
              visible={modalDaughtersShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showDaughtersModal(!modalDaughtersShow)
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
              <TouchableWithoutFeedback  onPress={() =>
                          this.props.showDaughtersModal(!modalDaughtersShow)
                        }>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showDaughtersModal(!modalDaughtersShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717",
                        lineHeight: 20
                      }
                    ]}
                  >
                    {strings("lifeinsurance.name", lang)}{form_submitted && daughters_name== ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            daughters_form_submitted && daughters_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            daughters_form_submitted && daughters_name == ""
                              ? 2
                              : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "daughters_name",
                            value
                          })
                        }
                        value={daughters_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted && daughters_id== ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            daughters_form_submitted && daughters_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            daughters_form_submitted && daughters_id == ""
                              ? 2
                              : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "daughters_id",
                            value
                          })
                        }
                        value={daughters_id}
                      />
                    </Item>
                  </CardItem>
                 
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("daughters")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
            <Modal
              visible={modalHusbandShow}
              animationType={"slide"}
              onRequestClose={() =>
                this.props.showHusbandModal(!modalHusbandShow)
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
                <TouchableWithoutFeedback    onPress={() =>
                          this.props.showHusbandModal(!modalHusbandShow)
                        }>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() =>
                          this.props.showHusbandModal(!modalHusbandShow)
                        }
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717",
                        lineHeight: 20
                      }
                    ]}
                  >
                    {strings("lifeinsurance.name", lang)}{form_submitted && husband_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            husband_form_submitted && husband_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            husband_form_submitted && husband_name == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "husband_name",
                            value
                          })
                        }
                        value={husband_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted &&husband_id == ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            husband_form_submitted && husband_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            husband_form_submitted && husband_id == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "husband_id",
                            value
                          })
                        }
                        value={husband_id}
                      />
                    </Item>
                  </CardItem>
                  
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("husband")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
            <Modal
              visible={modalWifeShow}
              animationType={"slide"}
              onRequestClose={() => this.props.showWifeModal(!modalWifeShow)}
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
                <TouchableWithoutFeedback onPress={() => this.props.showWifeModal(!modalWifeShow)}>
                  <CardItem>
                    <Left>
                      <Icon
                        style={{color: "#003580", fontSize: 25}}
                        name="md-close"
                        onPress={() => this.props.showWifeModal(!modalWifeShow)}
                      />
                    </Left>
                  </CardItem>
                  </TouchableWithoutFeedback>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}
                    </Label>
                  </CardItem>
                  :

                  <CardItem style={{flexDirection:"row-reverse"}}>
                    <Label
                      style={[
                        labelStyle,
                        {
                          textAlign: lang == "ar" ? "right" : "left",
                          color: "#171717",
                          lineHeight: 20
                        }
                      ]}
                    >
                      {strings("lifeinsurance.name", lang)}{form_submitted && wife_name == ""?<Text style={{color:"red"}}>*</Text>:null}
                    </Label>
                  </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            wife_form_submitted && wife_name == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            wife_form_submitted && wife_name == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "wife_name",
                            value
                          })
                        }
                        value={wife_name}
                      />
                    </Item>
                  </CardItem>
                  {Platform.OS=="ios"||(Platform.OS=="android"&&lang=="en")?

                  <CardItem style={{direction: lang == "ar" ? "rtl" : "ltr"}}>
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
                  </CardItem>
                  :
                  <CardItem style={{flexDirection:"row-reverse"}}>
                  <Label
                    style={[
                      labelStyle,
                      {
                        textAlign: lang == "ar" ? "right" : "left",
                        color: "#171717"
                      }
                    ]}
                  >
                    {strings("carInformation.id_number", lang)}{form_submitted && wife_id== ""?<Text style={{color:"red"}}>*</Text>:null}
                  </Label>
                </CardItem>
                    }
                  <CardItem>
                    <Item regular>
                      <Input
                        keyboardType="numeric"
                        returnKeyType='done'

                        style={{
                          textAlign: lang == "ar" ? "right" : "left",

                          fontFamily: "TajawalRegular0",
                          borderBottomColor:
                            wife_form_submitted && wife_id == ""
                              ? "red"
                              : "#171717",
                          borderBottomWidth:
                            wife_form_submitted && wife_id == "" ? 2 : 0
                        }}
                        maxLength={40}
                        autoCorrect={false}
                        onChangeText={value =>
                          this.props.getLifeInsuranceTexts({
                            prop: "wife_id",
                            value
                          })
                        }
                        value={wife_id}
                      />
                    </Item>
                  </CardItem>
                
                  <CardItem style={transparentBackground}>
                    <Body style={centerStyle}>
                      <Button
                        style={buttonStyle}
                        block
                        onPress={() => this.count("wife")}
                      >
                        {lang == "ar" ? (
                          <Icon name="md-arrow-back" style={{color: "#fff"}} />
                        ) : null}
                        <Text style={buttonText}>
                          {strings("drivinglicense.continue", lang)}
                        </Text>
                        {lang == "en" ? (
                          <Icon
                            name="md-arrow-round-forward"
                            style={{color: "#fff"}}
                          />
                        ) : null}
                      </Button>
                    </Body>
                  </CardItem>
                </View>
              </View>
            </Modal>
          <Text>{this.showAlert()}</Text>

          <DropdownAlert
            replaceEnabled={true}
            titleStyle={{
              textAlign: lang == "ar" ? "right" : "left",
              fontFamily: "TajawalBold0",
              color: "#fff"
            }}
            messageStyle={{
              textAlign: lang == "ar" ? "right" : "left",
              fontFamily: "TajawalBold0",
              color: "#fff"
            }}
            ref={ref => (this.dropdown = ref)}
          />
        </Drawer>
      </ImageBackground>
    );
  }
}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default LifeInsurance;
const mapStateToProps = state => {
  const {lang} = state.sideBarReducer;

  const {
    full_name,
    id_number,
    life_insurance_msg,
    age,
    value_of_insurance,
    father,
    mother,
    sister,
    brother,
    daughters,
    modalMotherShow,
    father_name,
    father_id,
    father_percentage,
    mother_name,
    mother_id,
    mother_percentage,
    sister_name,
    sister_id,
    sister_percentage,
    brother_name,
    brother_id,
    brother_percentage,
    daughters_name,
    daughters_id,
    daughters_percentage,
    modalFatherShow,
    modalBrotherShow,
    modalSisterShow,
    modalDaughtersShow,
    husband,
    wife,
    husband_name,
    husband_id,
    husband_percentage,
    wife_name,
    wife_id,
    wife_percentage,
    modalHusbandShow,
    modalWifeShow,
    fatherInfo,
    motherInfo,
    sisterInfo,
    brotherInfo,
    husbandInfo,
    wifeInfo,
    daughtersInfo,
    full_name1,
    id_number1
  } = state.lifeInsuranceReducer;
  return {
    full_name,
    id_number,
    life_insurance_msg,
    age,
    value_of_insurance,
    lang,
    father,
    mother,
    sister,
    brother,
    daughters,
    modalMotherShow,
    father_name,
    father_id,
    father_percentage,
    mother_name,
    mother_id,
    mother_percentage,
    sister_name,
    sister_id,
    sister_percentage,
    brother_name,
    brother_id,
    brother_percentage,
    daughters_name,
    daughters_id,
    daughters_percentage,
    modalFatherShow,
    modalBrotherShow,
    modalSisterShow,
    modalDaughtersShow,
    husband,
    wife,
    husband_name,
    husband_id,
    husband_percentage,
    wife_name,
    wife_id,
    wife_percentage,
    modalHusbandShow,
    modalWifeShow,
    fatherInfo,
    motherInfo,
    sisterInfo,
    brotherInfo,
    husbandInfo,
    wifeInfo,
    daughtersInfo,
    full_name1,
    id_number1
  };
};
// END MAP STATE TO PROPS

export default connect(mapStateToProps, lifeInsuranceAction)(LifeInsurance);
