import React, { Component } from 'react';
import {ImageBackground,Dimensions,Image,Keyboard,StatusBar,ImageEditor,ImageStore,ActivityIndicator,TouchableOpacity,Alert,Platform} from 'react-native';
import {CardItem,Body,Button,Text, Icon, Content,View,Drawer} from 'native-base';
import {uploadButton,continueText,uploadLicenseText,skipButton,skipText,continueButton} from '../assests/styles/drivingLicenseStyles';
import {transparentBackground,centerStyle} from '../theme';
import {Actions} from "react-native-router-flux";
import {ImagePicker, Camera, Permissions, ImageManipulator, Audio} from "expo";
import axios from 'axios';
import Header from './header';
import SideBar from "./sideBar";
import {scanned_id_image} from "../App";
import Header2 from './headerWithoutArrow';
import * as homeAction from "../actions/homeAction";

// import {RNCamera} from 'react-native-camera';
import * as drivingLicenseAction from '../actions/drivingLicenseAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
const dimensions=Dimensions.get('window');
class UploadID extends Component{
  constructor(props){
    super(props);
    this.state ={
      showCameraView:false ,
       type: Camera.Constants.Type.back,
            image: null,
            cameraPermission: null,
            cameraRollPermission: null,
            fadeAnim: 0,
      doneimg: require("../assests/images/empty.png"),
      loading: false,
      flip: false,
      text1:"يرجى الانتظار جاري القراءه",
      text2:"",
      text3:"",
      counter:1
    
    }

  }
  async componentWillMount() {
    // scanned_id_image.full_name=""
    //       scanned_id_image.id_number=""
    //       scanned_id_image.skip_id_img=""
    //       scanned_id_image.date_of_birth=""
    // this.props.getOcrKeys();

    this.setState({ loading: false });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
}


  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    this.setState({
        cameraPermission: cameraPermission.status,
        cameraRollPermission: cameraRollPermission.status,
    })
    setInterval(() => {
      this.setState({fadeAnim:this.state.fadeAnim==1?0:1})
    }, 1000); 
    this.soundObject = new Audio.Sound();
    this.soundObject.loadAsync(require("../assests/sounds/ding.mp3"));
}
goToAnotherPage=()=>{
  
      const {user_id,canerCareText,healthInsuranceText}=this.props;
  if(canerCareText){
    if(Actions.currentScene=="UploadID"){
      scanned_id_image.scanned=false
      scanned_id_image.full_name=""
      scanned_id_image.id_number=""
      scanned_id_image.skip_id_img=""
      scanned_id_image.date_of_birth=""
    
          Actions.cancercareprogram({user_id:user_id})
    }
    }
    else if(healthInsuranceText){
      if(Actions.currentScene=="UploadID"){
        scanned_id_image.scanned=false
        scanned_id_image.full_name=""
        scanned_id_image.id_number=""
        scanned_id_image.skip_id_img=""
        scanned_id_image.date_of_birth=""
      Actions.healthinsurance({user_id:user_id})
      }
    }
    else {
      if(Actions.currentScene=="UploadID"){
        scanned_id_image.scanned=false
        scanned_id_image.full_name=""
        scanned_id_image.id_number=""
        scanned_id_image.skip_id_img=""
        scanned_id_image.date_of_birth=""
      Actions.lifeinsurance({user_id:this.props.user_id})}
      }
  
  
  }
  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };

  soundObject = null;
  start() {
    console.log("scanned_Id_Image",scanned_id_image)
    // scanned_id_image.scanned=false
    scanned_id_image.full_name=""
    scanned_id_image.id_number=""
    scanned_id_image.skip_id_img=""
    scanned_id_image.date_of_birth=""
    console.log("scanned_Id_Image22",scanned_id_image)

    this.setState({showCameraView: true});
    this.capture = true;
    setInterval(() => {
      if (this.capture) {
        this.takePicture();
      }
    }, 300);
  }
  license = {
    regtype: {
      x: 0,
      y: 0,
      val: "خصوصي",
      no: "",
      symbol: ""
    },
    name: {
      x: 0,
      y: 0,
      val: ""
    },
    id: {
      x: 0,
      y: 0,
      val: ""
    },
    birthday: {
      x: 0,
      y: 0,
      val: ""
    },
    nameE: {
      x: 0,
      y: 0,
      val: ""
    }

  };

  reset() {
    this.license = {
      regtype: {
        x: 0,
        y: 0,
        val: "الام",
        no: "",
        symbol: ""
      },
      name: {
        x: 0,
        y: 0,
        val: ""
      },
      id: {
        x: 0,
        y: 0,
        val: ""
      },
      birthday: {
        x: 0,
        y: 0,
        val: ""
      },
      nameE: {
        x: 0,
        y: 0,
        val: ""
      }
    };

  }
  lines = [];
  face = 1;
  uploadPost(imagedata,d) {
    let data1 = {
      requests: []
    };
    data1.requests.push({
      image: {
        content: imagedata
      },
      features: []
    });
    data1.requests[0].features.push({
      type: "DOCUMENT_TEXT_DETECTION"
    });

    var headers = {
      "Content-Type": "application/json"
    };
    data1.requests[0].image.content = imagedata;
    var cur = this;
    console.log("currr for nadaaaa",cur)
    fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${this.props.ocrKeys[1].api}`,
      {
        method: "post",
        headers: headers,
        body: JSON.stringify(data1)
      }
    )
      .then(response => {
        response.json().then(
          async jsn => {
            console.log("jsn",jsn)
            if(this.state.counter>3&&cur.license.name.value==""&&showCameraView){
              Alert.alert("","خطأ")
            this.setState({showCameraView:false})
              }
            //alert(JSON.stringify(jsn));
            if (
              (cur.face == 1 &&
                (JSON.stringify(jsn).indexOf("المملكة") == -1 ||
                JSON.stringify(jsn).indexOf("الداخلية") == -1)) 
       
            ) {
this.setState({counter:this.state.counter+1})
              setTimeout(() => {
                cur.capture = true;
              }, 1000);
            } else {
              //alert("1");
              cur.setState({loading: true});
              var text = [];

              for (
                var x = 1;
                x < jsn.responses[0].textAnnotations.length;
                x++
              ) {
      
                var description =
                  jsn.responses[0].textAnnotations[x].description;
                var xval = Number.parseInt(
                  jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].x
                );

                var yval = Number.parseInt(
                  jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].y
                );
console.log("descriptioooon",description)
                cur.lines.push(
                  description + "-" + xval.toString() + "-" + yval.toString()
                );
                if (description == "الإسم") {
                  cur.license.name.x = xval;
                  cur.license.name.y = yval;
                } else if (description == "الرقم"||description=="الوطني") {
                  cur.license.id.x = xval;
                  cur.license.id.y = yval;
                } 
                else if (description == "Name") {
                  cur.license.nameE.x = xval;
                  cur.license.nameE.y = yval;
                } 
                else if (description == "تاريخ" ){
                  cur.license.birthday.x = xval;
                  cur.license.birthday.y = yval;
                } 

                if (
                  description.indexOf("المركبة") == -1 &&
                  description.indexOf("اسم") == -1 
       
                ) {
                  if (cur.face == 1) {
                    cur.license = cur.assignval(
                      cur.license,
                      description,
                      xval,
                      yval
                    );
               
                  } 
                }
              
              }

              if (
                cur.face == 1 &&
                (cur.license.name.val == "" ||
                  cur.license.nameE.val == "" ||
                  cur.license.id.val == "" ||
                  cur.license.birthday.val == ""
                  )
              ) {
                cur.reset();
                setTimeout(() => {
                  cur.setState({loading: false});
                  cur.lines = [];
                  cur.capture = true;
                }, 1000);
              }
      
               else {
                if (cur.face == 1) {
             

                    try {
                      cur.soundObject.playAsync();
                    } catch (error) {console.log("error",error)}
    console.log("scanned_id_image testtttttttt",cur.license)
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم','');
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم :','');

                  
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم ','');
                  scanned_id_image.full_name = cur.license.name.val.replace('Name','');

                  scanned_id_image.full_name = cur.license.name.val.replace('The Hashemite Kingdom of ','');

                  
                  scanned_id_image.id_number = cur.license.id.val.replace('الوطني ','');
                  scanned_id_image.id_number = cur.license.id.val.replace('الرقم الوطني','');
                  scanned_id_image.id_number = cur.license.id.val.replace(' الرقم  :','');

                  scanned_id_image.id_number = cur.license.id.val.replace('الوطني','');

                  scanned_id_image.date_of_birth = cur.license.birthday.val.replace('تاريخ الولادة ','');
                  scanned_id_image.skip_id_img=d;

                   cur.setState({showCameraView: false});
                   scanned_id_image.scanned = true;
                   if(this.props.canerCareText){
                    if(Actions.currentScene=="UploadID"){

                    Actions.cancercareprogram({user_id:this.props.user_id})
                    }
              }
              else if(this.props.healthInsuranceText){
                if(Actions.currentScene=="UploadID"){

                Actions.healthinsurance({user_id:this.props.user_id})
                }
              }
              else {
                if(Actions.currentScene=="UploadID"){

                Actions.lifeinsurance({user_id:this.props.user_id})}
           
              }
      
                } 
                else {
                  cur.setState({loading: false, flip: false});
                  cur.face = 1;
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم','');
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم :','');

                  
        
           
                  scanned_id_image.full_name = cur.license.name.val;
                  scanned_id_image.id_number = cur.license.id.val;
                  scanned_id_image.date_of_birth = cur.license.birthday.val;
                  scanned_id_image.full_name = cur.license.name.val.replace('الإسم ','');
                  scanned_id_image.full_name = cur.license.name.val.replace('Name','');

                  scanned_id_image.full_name = cur.license.name.val.replace('The Hashemite Kingdom of ','');

                  
                  scanned_id_image.id_number = cur.license.id.val.replace('الوطني ','');
                  scanned_id_image.id_number = cur.license.id.val.replace('الرقم الوطني','');
                  scanned_id_image.id_number = cur.license.id.val.replace("الرقم",'');

                  scanned_id_image.id_number = cur.license.id.val.replace(' الرقم  :','');

                  scanned_id_image.id_number = cur.license.id.val.replace('الوطني','');

                  scanned_id_image.date_of_birth = cur.license.birthday.val.replace('تاريخ الولادة ','');

                  scanned_id_image.skip_id_img=d;
                   cur.setState({showCameraView: false});
                  
              
                }
              }
            }
          },
          err => {
            alert(JSON.stringify(err));
          }
        );
      })
      .catch(err => {console.log("err",err)});
  }
  assignval(license, data, x, y) {

    if (Math.abs(y - license.name.y) <= 15) {

      license.name.val = license.name.val+" "+data;
    } else if (Math.abs(y - license.regtype.y) <= 15) {
      license.regtype.no = license.regtype.no + " " + data;
    } else if (Math.abs(y - license.id.y) <= 15) {
      license.id.val = license.id.val + " " + data;
    } else if (Math.abs(y - license.nameE.y) <= 15 ) {
      license.nameE.val = license.nameE.val + " " + data;
    }
   else if (Math.abs(y - license.birthday.y) <= 15 ) {
    license.birthday.val = license.birthday.val + " " + data;
  }
    return license;
  }
 
  capture = true;
  async takePicture() {
var x=false
    if (this.camera && this.capture) {
      this.capture = false;

      const options = {quality: 1, base64: true};
      var cur = this;
      this.camera.takePictureAsync(options).then(async data => {
        x=true
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
        console.log("xxxxxxxxxxxxxx",cur)
        cur.license.name.val=""
        cur.license.id.val=""
        cur.license.birthday.val=""
        // alert(data.width.toString() + "-" +data.height.toString()+"-"+data.pictureOrientation.toString())
        ImageEditor.cropImage(
          d.uri,
          cropData,
          uri => {
            ImageStore.getBase64ForTag(
              uri,
              base64data => {
                cur.uploadPost(base64data,d.uri);
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
      });
      if(Platform.OS=="ios"){
      setTimeout(() => {if(x==false&&this.state.showCameraView){
        alert("يرجى إعادة المحاولة")
        this.setState({showCameraView:false})
      }}, 10000);
    }
    else{
      setTimeout(() => {if(x==false&&this.state.showCameraView){
        alert("يرجى إعادة المحاولة")
        this.setState({showCameraView:false})
      }}, 20000); 
    }
    }
  }

    render(){
      console.log("this.state.counter",this.state.counter)
      let { image } = this.state;
      const {ocrKeys}=this.props;
console.log("ocrKeys",ocrKeys)
      scanned_id_image.full_name = scanned_id_image.full_name.replace('الإسم ','');
      scanned_id_image.full_name = scanned_id_image.full_name.replace(':','');

                  scanned_id_image.full_name = scanned_id_image.full_name.replace('Name','');

                  scanned_id_image.full_name = scanned_id_image.full_name.replace('The Hashemite Kingdom of ','');

                  
                  scanned_id_image.id_number = scanned_id_image.id_number.replace('الوطني ','');
                  scanned_id_image.id_number = scanned_id_image.id_number.replace(':','');

                  scanned_id_image.id_number = scanned_id_image.id_number.replace('الرقم الوطني','');
                  scanned_id_image.id_number = scanned_id_image.id_number.replace("الرقم",'');

                  scanned_id_image.id_number = scanned_id_image.id_number.replace(' الرقم  :','');

                  scanned_id_image.id_number = scanned_id_image.id_number.replace('الوطني','');
                  scanned_id_image.date_of_birth = scanned_id_image.date_of_birth.replace('تاريخ الولادة ','');
                  scanned_id_image.date_of_birth = scanned_id_image.date_of_birth.replace(':','');



      const {lang}=this.props;
  
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

{!this.state.showCameraView?
          <Header openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
:
          <Header2 openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} />
    }
 
            <StatusBar backgroundColor="#1e2131" barStyle="light-content" />
            <Content style={transparentBackground}>
            {this.state.showCameraView ? (
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
                // captureAudio={false}
                playSoundOnCapture={false}
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  mute={true}
                  type={Camera.Constants.Type.back}
                  flashMode={Camera.Constants.FlashMode.off}
                  permissionDialogTitle={"Permission to use camera"}
                  permissionDialogMessage={
                    "We need your permission to use your camera phone"
                  }
                >
           {Platform.OS=="android"?
                  <View
                    style={{
                      backgroundColor: "rgba(1,1,1,0.6)",
                      flex: 1,
                      width: "100%"
                    }}
                  >
                                  <TouchableOpacity onPress={()=>this.setState({showCameraView:false})} style={{marginLeft:8,backgroundColor: "rgba(1,1,1,0.6)",width:dimensions.width}}>
        <Text style={{fontFamily: "TajawalBold0",color:"#fff"}}>Cancel</Text>
      </TouchableOpacity>
          </View>
          :
          <View
          style={{
            backgroundColor: "rgba(1,1,1,0.6)",
            flex: 1,
            width: "100%",
            margin:0
          }}
        >
                        <TouchableOpacity onPress={()=>this.setState({showCameraView:false})} style={{marginLeft:5,marginTop:5,width:dimensions.width}}>
<Text style={{fontFamily: "TajawalBold0",color:"#fff"}}>Cancel</Text>
</TouchableOpacity>
</View>
                  }
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
                      <Text
                        style={{
                          opacity: this.state.flip ? 1 : this.state.fadeAnim,
                          fontSize: 16,
                          color: "#e7f6f8",
                          fontFamily: "TajawalBold0"
                        }}
                      >
                        {this.state.text3}
                      </Text>
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
                    {/* <ActivityIndicator size="large" color="blue" /> */}

                    <Text
                      style={{
                        opacity: this.state.flip ? 1 : this.state.fadeAnim,
                        fontSize: 16,
                        color: "#e7f6f8",
                        fontFamily: "TajawalBold0"
                      }}
                    >
                      {this.state.text1}
                    </Text>
                    <Text
                      style={{
                        opacity: this.state.fadeAnim,
                        fontSize: 16,
                        color: "#e7f6f8",
                        fontFamily: "TajawalBold0",
                        opacity: this.state.fadeAnim
                      }}
                    >
                      {this.state.text2}
                    </Text>
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
            {!this.state.showCameraView?
            <View style={transparentBackground}>
               <CardItem style={[transparentBackground,{marginTop:30}]}>
               <View style={{ width: '100%', height: 110, justifyContent: 'center', alignItems: 'center', borderRadius: 0,  borderWidth: 0, backgroundColor: 'transform' }}>
               <Image style={{
                resizeMode: 'contain',
                height:172.8,width:278.3
                // justifyContent: 'cener',
            }} source={require('../../assets/id-card.png')} />
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
    {image &&
        <Image source={{ uri: image }} style={{ width: 290, height: 120, marginTop: -130, }} />}
</View> 

        </View>
    
               </CardItem>
               <CardItem style={[transparentBackground,{marginTop:20}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                  // onPress={()=>{ this._takePicture() } }
                  onPress={() => this.start()}

                   >
                     <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_id',lang)}</Text>
                   </Button>
                 </Body>
               </CardItem>
           
                 <CardItem style={transparentBackground}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                  onPress={() =>
                    this.goToAnotherPage()}
                   >
                   <Text style={skipText}>{strings('drivinglicense.skip',lang)}</Text>
                   </Button>
                 </Body>
               </CardItem>
               </View>
               :null}
               </Content>
               </Drawer>
           </ImageBackground>
        )
    }
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
          this.setState({ image: result.uri });
      }
  };
  _cam = async () => {
      let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
      });


      if (!result.cancelled) {
          this.setState({ image: result.uri });
      }
  };

  
  _checkCameraPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      //const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      this.setState({ status });
  }
  _reqCameraPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ cameraPermission: status });
  };


  _checkCameraRollPermissions = async () => {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      this.setState({ status });
  }
  _reqCameraRollPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ cameraRollPermission: status });
  };

  _pickImage = async () => {
      this._checkCameraRollPermissions();
      this._reqCameraRollPermissions();
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
          this.setState({ image: result.uri });
          CameraRoll.saveToCameraRoll(result.uri)
      }
  };



}
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// export default DrivingLicense;
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const { ocrKeys } = state.homeReducer;

  const { information} = state.drivingLicenseReducer;
  return { information,lang,ocrKeys};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,{...drivingLicenseAction,...homeAction})(UploadID);