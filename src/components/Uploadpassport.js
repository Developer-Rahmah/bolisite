import React, { Component } from 'react';
import {ImageBackground,Dimensions,Image,Keyboard,StatusBar,ImageEditor,ImageStore,ActivityIndicator,TouchableOpacity,Alert,Platform} from 'react-native';
import {CardItem,Body,Button,Text, Icon, Content,View,Drawer} from 'native-base';
import {uploadButton,continueText,uploadLicenseText,skipButton,skipText,continueButton} from '../assests/styles/drivingLicenseStyles';
import {transparentBackground,centerStyle} from '../theme';
import {Actions} from "react-native-router-flux";
import * as ImageManipulator from 'expo-image-manipulator';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import axios from 'axios';
import Header2 from './headerWithoutArrow';
import * as homeAction from "../actions/homeAction";
import * as FileSystem from 'expo-file-system';

import * as drivingLicenseAction from '../actions/drivingLicenseAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import Header from './header';
import SideBar from "./sideBar";
const dimensions=Dimensions.get('window');
import {scanned_passport_image} from "../App";
import { HitTestResultTypes } from 'expo/build/AR';

class Uploadpassport extends Component{
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
     text1:"جاري القراءة",
     text2:"",
     text3:"",
     counter:1
   
    }
  }
  async componentWillMount() {
    
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

    const {user_id,servantInformation,travelInformation}=this.props;

  if (travelInformation){
    if(Actions.currentScene=="Uploadpassport"){

    Actions.travelinsurance({user_id:this.props.user_id,insuranceCompaanyId:this.props.insuranceCompaanyId,companyOldPrice:this.props.companyOldPrice,companyDiscountRate:this.props.companyDiscountRate,travelInformation:this.props.travelInformation,total:this.props.total,addons:this.props.addons})
    }
  }
  else{
    if(Actions.currentScene=="Uploadpassport"){

       Actions.servantinsuranceinformation({
      user_id:user_id
    }) 
  }
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
      val: "",
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
    }
  

  };

  reset() {
    this.license = {
      regtype: {
        x: 0,
        y: 0,
        val: "",
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
      }
  
    };

  }
  lines = [];
  face = 1;
  uploadPost(imagedata,d) {
    console.log("tttttttttttttttttttttt",d)
    let apiUrl = 'https://accurascan.com/v2/api';

  
  
    var formData = new FormData();
    let uriParts = d.split('.');
               let uri=d
      let fileType = uriParts[uriParts.length - 1];
      if(Platform.OS=="android"){
      formData.append('scan_image', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    else if(Platform.OS=="ios"){
    formData.append("scan_image", {
      name: 'uiyutesttest8:30.jpg',
      type: 'image/jpg',
      uri:
        d.replace("file://", "")
    });
    }
formData.append('card_type',1)
   
  
     let options = {
       method: 'POST',
       body: formData,
       headers: {
         Accept: 'application/json',
         'Api-Key':this.props.ocrKeys[0].api
        //  'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRjZGIzMGY3NTg5OWZhNThiZTAxOGFkNWMyM2VhZjdjMTM2OTAwMzJhODBmOGEzYTY4NzdmNzJmY2UwNjcyNTZlMTI1Y2NiYmQyYmE3OGQxIn0.eyJhdWQiOiIxIiwianRpIjoiNGNkYjMwZjc1ODk5ZmE1OGJlMDE4YWQ1YzIzZWFmN2MxMzY5MDAzMmE4MGY4YTNhNjg3N2Y3MmZjZTA2NzI1NmUxMjVjY2JiZDJiYTc4ZDEiLCJpYXQiOjE1NjAxODQxOTcsIm5iZiI6MTU2MDE4NDE5NywiZXhwIjoxNTkxODA2NTk3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.vvaMLpycxa4L8Ina2OlUK1f36ySliYg6ZGqbbh5tUmTrGKWFHrg6yEPt3oJmf9seYC0_fd-HVh8DY1gRll0JyedpoJHfgAqyQhgB1Low2b34fDUmG39Oro17aP6vBkA_6xPCyyjF2kMjzWsSNa23071-6ICs9z5K8mQM4UerBiqmUvgBSzJDLQ3UGrUMTQNbEKdJfVxNbZyhGcHT8eWZEi3hgBxHfmoAOrv7MxWzhWVQR1xZo-dFq-aKNwZtgO7DxQsxZ_-CvSKrCEVztEpV6kGKlO8486RmUK5rUOWmWR3TvW-zKCKiYOsV72GQAJZI8yVmL9X2q-RDTa1fwzX2lESQ-bFl1AMoS8MGOh_McJaevCDGOvKNk0OJJowO6W0AeLAP4XtwtY3wH5DThOs--t3v97Av1Vvq74B-0f3YbXCPKq8a8F3lPL87KXM8Nog0K19TIX6_DJ9CLfcJkWW8qjQsRopDjRLdF8kArVvAPFQeQNt-2qyJLKWJPWoamXncVv8yi-MsTVq0La8DKYyFRzk6F5BNk_JMI8aWT5s7sGU7Ih6mci6M2pfxXizeIYp9RzavI9D2oax5ovSSP602s0rDUsHd8tRrdkxYm9lhoDv7zOn7Ot8Glf6kH2Cg6YmvK5NGIXij4j5h8BTU-6A3WndaH_JpkFkkQNVBrNyKXrI'
       },
     };
     console.log("form_data",formData)
     fetch(apiUrl, options).then(res=>{
       console.log("ressssss testtt",JSON.parse(res._bodyInit))
       if(JSON.parse(res._bodyInit).message!="Failed to recognize."){
        scanned_passport_image.full_name=JSON.parse(res._bodyInit).data[0].given_names+" "+JSON.parse(res._bodyInit).data[0].surname
        scanned_passport_image.passport_number=JSON.parse(res._bodyInit).data[0].document_no
        scanned_passport_image.skip_passport_img=d;

        console.log("testtushjshdjshdjsdhsjdhsjdhsdhjsdhj",scanned_passport_image.full_name)
        cur.setState({showCameraView: false});
        scanned_passport_image.scanned = true;
 
   if (this.props.travelInformation){
     if(Actions.currentScene=="Uploadpassport"){
 
     Actions.travelinsurance({user_id:this.props.user_id,insuranceCompaanyId:this.props.insuranceCompaanyId,companyOldPrice:this.props.companyOldPrice,companyDiscountRate:this.props.companyDiscountRate,travelInformation:this.props.travelInformation,total:this.props.total,addons:this.props.addons})
     }
   }
   else{
     if(Actions.currentScene=="Uploadpassport"){
       console.log(" scanned_passport_image2222", scanned_passport_image)  
       Actions.servantinsuranceinformation({
       user_id:this.props.user_id
     }) 
   }
 }
        }
      })
    
   

    var cur = this;
   
              if (
                cur.face == 1 &&
                (cur.license.name.val == "" ||
                  // cur.license.nameE.val == "" ||
                  cur.license.id.val == "" )
              ) {
                console.log("hreeeeeee")
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
                console.log(" scanned_passport_image", scanned_passport_image)
           
                   cur.setState({showCameraView: false});
                   scanned_passport_image.scanned = true;

              if (this.props.travelInformation){
                if(Actions.currentScene=="Uploadpassport"){

                Actions.travelinsurance({user_id:this.props.user_id,insuranceCompaanyId:this.props.insuranceCompaanyId,companyOldPrice:this.props.companyOldPrice,companyDiscountRate:this.props.companyDiscountRate,travelInformation:this.props.travelInformation,total:this.props.total,addons:this.props.addons})
                }
              }
              else{
                if(Actions.currentScene=="Uploadpassport"){
                  console.log(" scanned_passport_image2222", scanned_passport_image)  
                  Actions.servantinsuranceinformation({
                  user_id:this.props.user_id
                }) 
              }
            }
             } else {
                  cur.setState({loading: false, flip: false});
                  cur.face = 1;
  
                  scanned_passport_image.full_name=JSON.parse(res._bodyInit).data[0].given_names+" "+JSON.parse(res._bodyInit).data[0].surname
                  scanned_passport_image.passport_number=JSON.parse(res._bodyInit).data[0].document_no
                  scanned_passport_image.skip_passport_img=d;
                   cur.setState({showCameraView: false});

                }
              }
            }
  assignval(license, data, x, y) {
   
    if (Math.abs(y - license.name.y) <= 15) {

      license.name.val = license.name.val+" "+data;
    } else if (Math.abs(y - license.regtype.y) <= 15) {
      license.regtype.no = license.regtype.no + " " + data;
    } else if (Math.abs(y - license.id.y) <= 15) {
      license.id.val = license.id.val + " " + data;
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
        cur.license.name.val=""
        cur.license.id.val=""
        // alert(data.width.toString() + "-" +data.height.toString()+"-"+data.pictureOrientation.toString())
        // ImageEditor.cropImage(
        //   d.uri,
        //   cropData,
        //   uri => {
        //     ImageStore.getBase64ForTag(
        //       uri,
        //       base64data => {
        //         cur.uploadPost(base64data,d.uri);
        //       },
        //       err => {
        //       }
        //     );
        //   },
        //   err => {
        //   }
        // );
        const file = await FileSystem.readAsStringAsync(
          d.uri,
          {
              encoding: FileSystem.EncodingType.Base64,
          });
          cur.uploadPost(file,d.uri);
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
      let { image } = this.state;

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
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height:"100%"
                  }}
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
                      width: "100%",
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
    marginLeft: 0
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
               <CardItem style={[transparentBackground,{marginTop:40}]}>
               <View style={{ width: '100%', height: 110, justifyContent: 'center', alignItems: 'center', borderRadius: 0,  borderWidth: 0, backgroundColor: 'transform' }}>
               {this.props.typee=="Servant Insurance"?
               <Image style={{
                resizeMode: 'contain',
                height:172.8,width:278.3
                // justifyContent: 'cener',
            }} source={require('../../assets/servant-passport.png')} />
            :
            <Image style={{
              resizeMode: 'contain',
              height:172.8,width:278.3
              // justifyContent: 'cener',
          }} source={require('../../assets/Passport.png')} />}
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
    {image &&
        <Image source={{ uri: image }} style={{ width: 290, height: 120, marginTop: 20, }} />}
</View> 

        </View>

               </CardItem>
               <CardItem style={[transparentBackground,{marginTop:30}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
 
                  onPress={() => this.start()}
                   >
                     <Text style={uploadLicenseText}>{strings('drivinglicense.upload_your_passport',lang)}</Text>
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

// export default DrivingLicense;
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
// START MAP STATE TO PROPS
const mapStateToProps = state => {
  const { lang } = state.sideBarReducer;
  const { information} = state.drivingLicenseReducer;
  const {ocrKeys}=state.homeReducer;
  return { information,lang,ocrKeys};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,{...drivingLicenseAction,...homeAction})(Uploadpassport);