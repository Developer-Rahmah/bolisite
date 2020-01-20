import React, { Component } from 'react';
import {ActivityIndicator,ImageBackground,Dimensions,Image,TouchableOpacity,Alert,Keyboard,StatusBar,ImageEditor,Animated,ImageStore,Platform} from 'react-native';
import {CardItem,Body,Button,Text,Right,Left, Icon, Content,View,Drawer} from 'native-base';
import {uploadButton,licenseImage,continueText,uploadLicenseText,skipButton,skipText,continueButton} from '../assests/styles/drivingLicenseStyles';
import {transparentBackground,centerStyle} from '../theme';
import * as homeAction from '../actions/homeAction';
import Header from './header';
import SideBar from "./sideBar";
import Header2 from './headerWithoutArrow';

import {Actions} from "react-native-router-flux";
import {  ImagePicker, Camera, Permissions,ImageManipulator,Audio } from 'expo';
import axios from 'axios';

// import {RNCamera} from 'react-native-camera';
import * as drivingLicenseAction from '../actions/drivingLicenseAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import { scanned_driving_license } from '../App';
const dimensions=Dimensions.get('window');
class DrivingLicense2 extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      showCameraView:false ,
       type: Camera.Constants.Type.back,
       fadeAnim: 0,
       doneimg: require('../assests/images/empty.png'),
            image: null,
            cameraPermission: null,
            cameraRollPermission: null,
            loading:false,
            flip:false,
            text1:"جارى قراءة الوجه الأمامى",
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
    this.soundObject.loadAsync(require('../assests/sounds/ding.mp3'));
}

  closeDrawer = () => {
    this.drawer._root.close();

  };

  

  openDrawer = () => {
    
    this.drawer._root.open();
    setTimeout(() => Keyboard.dismiss());
  };
    render(){
      scanned_driving_license.full_name=scanned_driving_license.full_name.replace('اسم','');
      scanned_driving_license.full_name=scanned_driving_license.full_name.replace('المملكة الأردنية الهاشمية','');

      scanned_driving_license.full_name = scanned_driving_license.full_name.replace('المالك','');
      scanned_driving_license.full_name = scanned_driving_license.full_name.replace('Vehicle License','');

      scanned_driving_license.full_name = scanned_driving_license.full_name.replace(':','');
      scanned_driving_license.full_name = scanned_driving_license.full_name.replace('المالى','');
      let { image } = this.state;

      const {lang}=this.props;
        return(

            <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height: "100%"}}>
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
            {this.state.showCameraView?
            <View style={{flex: 1,flexDirection: 'column',backgroundColor: 'black',width:dimensions.width,height:dimensions.height}}>
  
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 1,flexDirection:'column',justifyContent: 'flex-start',alignItems: 'center',height:"100%"}}
          type={Camera.Constants.Type.back}
          flashMode={Camera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          
        >
 
        {Platform.OS=="android"?
        <View style={{backgroundColor:'rgba(1,1,1,0.6)',flex:1,width:'100%'}}>
        <TouchableOpacity onPress={()=>this.setState({showCameraView:false})} style={{marginLeft:8,backgroundColor: "rgba(1,1,1,0.6)",width:dimensions.width}}>
        <Text style={{fontFamily: "TajawalBold0",color:"#fff"}}>Cancel</Text>
      </TouchableOpacity>
        </View>
     :
     <View style={{backgroundColor:'rgba(1,1,1,0.6)',flex:1,width:'100%',margin:0}}>
     <TouchableOpacity onPress={()=>this.setState({showCameraView:false})} style={{marginLeft:5,marginTop:5,width:dimensions.width}}>
     <Text style={{fontFamily: "TajawalBold0",color:"#fff"}}>Cancel</Text>
   </TouchableOpacity>
     </View>

        }
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:0,margin:0,width:'100%',height:Dimensions.get("window").width*.95*2/3}}>

          <View style={{backgroundColor:'rgba(1,1,1,0.6)',height:Dimensions.get("window").width*.95*2/3,width:'2.5%',margin:0}}/>
          <View style={{backgroundColor:'transparent',justifyContent:'center',alignItems:'center',borderColor:"#fcfcfc",borderWidth:1,borderRadius:2,margin:0,width:'95%',height:Dimensions.get("window").width*.95*2/3,minWidth:200,minHeight:100}}>
            {this.state.loading?<ActivityIndicator size="large" color="#fcfcfc" /> : null}
            <Image source={this.state.doneimg} style={{width:128,height:128}}/>
            <Text style={{opacity:this.state.flip ? 1 : this.state.fadeAnim,fontSize:16,color:'#e7f6f8',fontFamily:'TajawalBold0'}}>{this.state.text3}</Text>
          </View> 
          <View style={{backgroundColor:'rgba(1,1,1,0.6)',height:Dimensions.get("window").width*.95*2/3,width:'2.5%',justifyContent:'center',alignItems:'center',margin:0}}/>
        </View>
        <View style={{backgroundColor:'rgba(1,1,1,0.6)',flex:1,width:'100%',margin:0,paddingTop:20,justifyContent:'flex-start',alignItems:'center'}}>
          <Text style={{opacity:this.state.flip ? 1 : this.state.fadeAnim,fontSize:16,color:'#e7f6f8',fontFamily:'TajawalBold0'}}>{this.state.text1}</Text>
          <Text style={{opacity: this.state.fadeAnim,fontSize:16,color:'#e7f6f8',fontFamily:'TajawalBold0',opacity:this.state.fadeAnim}}>{this.state.text2}</Text>          
        </View>
        
        <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
        </View>
        
        </Camera>


      </View>
      :null}
      {!this.state.showCameraView?
      <View style={transparentBackground}>
               <CardItem style={[transparentBackground,{marginTop:30}]}>
               <View style={{ width: '100%', height: 110, justifyContent: 'center', alignItems: 'center', borderRadius: 0,  borderWidth: 0, backgroundColor: 'transform' }}>
               <Image style={{
                resizeMode: 'contain',
                height:172.8,width:278.3
                // justifyContent: 'cener',
            }} source={require('../../assets/Driving-license.png')} />
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
    {image &&
        <Image source={{ uri: image }} style={{ width: 290, height: 120, marginTop: -130, }} />}
</View> 

        </View>
    
               </CardItem>
               <CardItem style={[transparentBackground,{marginTop:20}]}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
                  onPress={()=>this.start()}
                  //onPress={()=>{ this._takePicture() } }
                   >
                     <Text style={uploadLicenseText}>{strings('drivinglicense.upload_car_license',lang)}</Text>
                   </Button>
                 </Body>
               </CardItem>
            
                        <CardItem style={transparentBackground}>
                 <Body style={centerStyle}>
                   <Button style={uploadButton} block 
               onPress={() => {                   
                scanned_driving_license.scanned=false;
                if(Actions.currentScene=="drivinglicense2"){

                Actions.carinformation2({user_id:this.props.user_id,category_id:this.props.category_id})}}}>
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

  
  soundObject = null;
  start(){
    console.log("in start")
    this.setState({showCameraView: true})
    this.capture=true;
    setInterval(() => {
      if(this.capture)
      {
        this.takePicture();
      }
    }, 300);
  }
  license={
    regtype:{
      x:0,
      y:0,
      val:"خصوصي",
      no:"",
      symbol:""
    },
    name:{
      x:0,
      y:0,
      val:""
    },expiary:{
      x:0,
      y:0,
      val:""
    },
    address:{
      x:0,
      y:0,
      val:""
    },
    type:{
      x:0,
      y:0,
      val:""
    },
    color:{
      x:0,
      y:0,
      val:""
    },
    model:{
      x:0,
      y:0,
      val:""
    },
    year:{
      x:0,
      y:0,
      val:""
    },
    category:{
      x:0,
      y:0,
      val:""
    }
    
    
  }
  license1={
    regiteration:{
      x:0,
      y:0,
      val:""
    },
    licensecenter:{
      x:0,
      y:0,
      val:""
    },
    motor:{
      x:0,
      y:0,
      val:""
    },
    chasy:{
      x:0,
      y:0,
      val:""
    },
    fueltype:{
      x:0,
      y:0,
      val:""
    }
    

  }
  reset(){
    this.license={
      regtype:{
        x:0,
        y:0,
        val:"خصوصي",
        no:"",
        symbol:""
      },
      name:{
        x:0,
        y:0,
        val:""
      },expiary:{
        x:0,
        y:0,
        val:""
      },
      address:{
        x:0,
        y:0,
        val:""
      },
      type:{
        x:0,
        y:0,
        val:""
      },
      color:{
        x:0,
        y:0,
        val:""
      },
      model:{
        x:0,
        y:0,
        val:""
      },
      year:{
        x:0,
        y:0,
        val:""
      },
      category:{
        x:0,
        y:0,
        val:""
      }
    }
    this.license1={
      regiteration:{
        x:0,
        y:0,
        val:""
      },
      licensecenter:{
        x:0,
        y:0,
        val:""
      },
      motor:{
        x:0,
        y:0,
        val:""
      },
      chasy:{
        x:0,
        y:0,
        val:""
      },
      fueltype:{
        x:0,
        y:0,
        val:""
      }
  
    }
  }
  lines=[];
  face = 1;
  uploadPost(imagedata,d) {
    

    let data1={
      'requests':[]
    }
    data1.requests.push(
        {
        image: {
          content:imagedata
          },
          features: []         
        }
      );
        data1.requests[0].features.push({
          type:"DOCUMENT_TEXT_DETECTION"
          })
          
      var headers = {
        'Content-Type': 'application/json',
      }
      data1.requests[0].image.content=imagedata
      var cur=this;
      fetch(`https://vision.googleapis.com/v1/images:annotate?key=${this.props.ocrKeys[1].api}`, {
          method: "post",
          headers: headers,
          body: JSON.stringify(data1)
      })          
          .then(response => {
            response.json().then(async (jsn)=>{
              console.log("cur.license5555555555555",cur.license)
              console.log("scanned_driving_license.full_name555555",scanned_driving_license.full_name)
              //alert(JSON.stringify(jsn));
              if(this.state.counter>3&&cur.license.name.val==""&&cur.license.type.val==""&&this.state.showCameraView){
                Alert.alert("","خطأ")
         this.setState({showCameraView:false});
       
          }
              if((cur.face == 1 && (JSON.stringify(jsn).indexOf("المملكة")==-1 ||
              JSON.stringify(jsn).indexOf("الداخلية")==-1))
            || (cur.face == 2 && (JSON.stringify(jsn).indexOf("المحرك")==-1 ||
            JSON.stringify(jsn).indexOf("الترخيص")==-1)))
              {
                setTimeout(() => {
                  cur.capture=true;
                }, 1000);
                this.setState({counter:this.state.counter+1})

              }
              else
              {
                //alert("1");
                cur.setState({loading:true});
                var text=[];
                
                for(var x=1;x<jsn.responses[0].textAnnotations.length;x++)
                {
                  
                  var description = jsn.responses[0].textAnnotations[x].description;
                  var xval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].x);
                  var yval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].y);
                  cur.lines.push(description + "-" + xval.toString()+"-"+yval.toString());
                  //console.log(description + "-" + xval.toString()+"-"+yval.toString())
                  if(description=="اسم" || description=="المالك")
                  {
                    cur.license.name.x=xval;
                    cur.license.name.y=yval;
                  }
                  else if(description=="العنوان")
                  {
                    cur.license.address.x=xval;
                    cur.license.address.y=yval;
                  }
  
                }
                for(var x=1;x<jsn.responses[0].textAnnotations.length;x++)
                {
                  var description = jsn.responses[0].textAnnotations[x].description;
                  var xval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].x);
                  var yval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].y);
                  if(description.indexOf("المركبة")==-1 && description.indexOf("اسم")==-1 
                  && description.indexOf("المالك")==-1 && description!="فئة"
                  && description!="العنوان" && description.indexOf("نوع")==-1 && description.indexOf("اللون")==-1 && description.indexOf("رخصة") ==-1
                  && description.indexOf("غاية")==-1 && description!="سنة" && description!="الصنع" && description!="الفرعي"
                  && description!="الترخيص" && description!="مركز" && description!="الشاصي" && description!="المحرك" && description.indexOf("ستعمال")==-1
                  && description.indexOf("رقم")==-1 && description!="التسجيل" && description!="التسجيل"&& description!="خصوصي"&&description.indexOf("غاىة")==-1
                  && description.indexOf(":")==-1 && description.indexOf("الوقود")==-1 && description.indexOf("صفة")==-1 && description.indexOf("+")==-1)
                  {
                    if(cur.face == 1)
                    {
                      cur.license=cur.assignval(cur.license,description,xval,yval);
               
             
                    }
                    else
                    {
                      cur.license1=cur.assignval1(cur.license1,description,xval,yval);
                    }
                  }
                }

                if((cur.face==1 && (cur.license.name.val=="" )))
                {
                  cur.reset();
                  setTimeout(() => {
                    cur.setState({loading:false});
                    cur.lines=[];
                    cur.capture=true;
                  }, 1000);
                }
         
                else
                {
                  if(cur.face==1)
                  {
                    setTimeout(() => {
                      cur.setState({
                        loading:false,
                        doneimg:require('../assests/images/checkmark1.png'),
                        text1:"تم قراءة الوجه الأمامى",
                        text2:"جارى قراءة الوجه الخلفى",
                        flip:true
                      })
                      scanned_driving_license.driving_license_img=d
                      try {
                        cur.soundObject.playAsync();
                      } catch (error) {
                      }
                      setTimeout(() => {
                        cur.setState({doneimg:require('../assests/images/rotate1.png'),text3:"من فضلك اقلب الرخصة",})
                        setTimeout(() => {
                          cur.setState({doneimg:require('../assests/images/empty.png'),text3:"",})
                        }, 4000);
                      }, 3000);
                      //Alert.alert("","الرجاء قلب الرخصة")
                      console.log(cur.license)
                      cur.face = 2
                        cur.capture=true;
                      //cur.lines.push("--");
                      
                    }, 300);
                    
                  }
                  else
                  {
                    cur.setState({loading:false,flip:false});
                    cur.face=1;
                
                    scanned_driving_license.full_name=cur.license.name.val.replace('المالك','');
             
                    scanned_driving_license.full_name = cur.license.name.val.replace('المالك','');
                    scanned_driving_license.full_name = cur.license.name.val.replace('Vehicle License','');

                    scanned_driving_license.full_name = cur.license.name.val.replace(':','');
                    scanned_driving_license.full_name = cur.license.name.val.replace('المالى','');

                    cur.setState({showCameraView:false})
                    scanned_driving_license.scanned=true;
                    scanned_driving_license.driving_license_img_back=d
             
                    
                    Actions.carinformation2({user_id:this.props.user_id,category_id:this.props.category_id})
                    cur.license.name.val=""
                  }
                }
              }
            },(err)=>{alert(JSON.stringify(err))})
            
            
          
          
          })
          .catch(err => {
            
          })
  }
  assignval(license,data,x,y){
    if(Math.abs(y-license.name.y)<=15)
    {
      license.name.val=license.name.val+" "+data;
    }

    return license;
  }
  assignval1(license,data,x,y){

    return license;
  }
  capture=true;
  async takePicture() {
    console.log("takeee")
    var x=false
    if (this.camera && this.capture) {
      this.capture=false;
      
      const options = { quality: 1, base64: true};
      var cur=this;
      this.camera.takePictureAsync(options).then(async (data) => {
        x=true
        var d=await ImageManipulator.manipulateAsync(data.uri,[{resize: {width:1200}}],{base64: true})
  
      var yoffset=d.height/2-d.width*.95*2/6
      var snappheight=d.width*.95*2/3
      const cropData = {
        offset:{x:d.width*.05,y:yoffset}, 
        size:{width:d.width*.95, height:snappheight}
      }
      var cur=this;
      // cur.license.name.val=""
        ImageEditor.cropImage(d.uri,cropData,(uri)=>{
          
          ImageStore.getBase64ForTag(uri,(base64data)=>{
            console.log("jfkdhfkddsdshdjshdjshdshkshkhkdhkhkhksd",d.uri)
            cur.uploadPost(base64data,d.uri);
          },(err)=>{
            //alert(JSON.stringify(err))
          })
        },(err)=>{
          //alert(JSON.stringify(err))
        });
       
        
      
        
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
  const { information} = state.drivingLicenseReducer;
  const {ocrKeys}=state.homeReducer;
  return { information,lang,ocrKeys};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,{...drivingLicenseAction,...homeAction})(DrivingLicense2);