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
import * as ImageManipulator from 'expo-image-manipulator';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// import {RNCamera} from 'react-native-camera';
import * as drivingLicenseAction from '../actions/drivingLicenseAction';
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import { scanned_driving_license } from '../App';
const dimensions=Dimensions.get('window');
class DrivingLicense extends Component{
  
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
                if(Actions.currentScene=="drivinglicense"){

                Actions.carinformation({user_id:this.props.user_id,category_id:this.props.category_id})}}}>
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
      fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC7dBAQszV4J28Z9q8YEvMRTDLBt5AHbxw", {
          method: "post",
          headers: headers,
          body: JSON.stringify(data1)
      })          
          .then(response => {
            response.json().then(async (jsn)=>{
       
              if(this.state.counter>3&&cur.license.name.val==""&&cur.license.type.val==""&&showCameraView){
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
                cur.setState({loading:true});
                var text=[];
                
                for(var x=1;x<jsn.responses[0].textAnnotations.length;x++)
                {
                  
                  var description = jsn.responses[0].textAnnotations[x].description;
                  var xval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].x);
                  var yval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].y);
                  cur.lines.push(description + "-" + xval.toString()+"-"+yval.toString());
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
                  else if(description=="خصوصي")
                  {
                    cur.license.regtype.x=xval;
                    cur.license.regtype.y=yval;
                  }
                  else if(description=="نوع")
                  {
                    cur.license.model.x=xval;
                    cur.license.model.y=yval;
                  }
                  else if(description=="اللون")
                  {
                    if(cur.license.color.x==0)
                    {
                      cur.license.color.x=xval;
                      cur.license.color.y=yval;
                    }
                  }
                  else if(description=="فئة")
                  {
                    cur.license.type.x=xval;
                    cur.license.type.y=yval;
                  }
                  else if(description=="سنة" || description=="الصنع")
                  {
                    cur.license.year.x=xval;
                    cur.license.year.y=yval;
                  }
                  else if(description=="مرخصة" || description=="لغاية")
                  {
                    cur.license.expiary.x=xval;
                    cur.license.expiary.y=yval;
                  }
                  else if(description=="الترخيص" || description=="مركز")
                  {
                    cur.license1.licensecenter.x=xval;
                    cur.license1.licensecenter.y=yval;
                  }
                  else if(description=="المحرك")
                  {
                    cur.license1.motor.x=xval;
                    cur.license1.motor.y=yval;
                  }
                  else if(description=="الشاصي")
                  {
                    cur.license1.chasy.x=xval;
                    cur.license1.chasy.y=yval;
                  }
                  else if(description=="التسجيل")
                  {
                    cur.license1.regiteration.x=xval;
                    cur.license1.regiteration.y=yval;
                  }
                  else if(description=="الوقود")
                  {
                    cur.license1.fueltype.x=xval;
                    cur.license1.fueltype.y=yval;
                  }
                  else if(description=="صنف")
                  {
                    cur.license.category.x=xval;
                    cur.license.category.y=yval;
                  }
                }
                for(var x=1;x<jsn.responses[0].textAnnotations.length;x++)
                {
                  var description = jsn.responses[0].textAnnotations[x].description;
                  var xval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].x);
                  var yval=Number.parseInt(jsn.responses[0].textAnnotations[x].boundingPoly.vertices[0].y);
                  if(description.indexOf("المركبة")==-1 && description.indexOf("اسم")==-1 && description.indexOf("المالك")==-1 && description!="فئة"
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

                if((cur.face==1 && (cur.license.name.val=="" || cur.license.regtype.no==""|| cur.license.year.val==""
                || cur.license.type.val==""||cur.license.model.val==""||cur.license.category.val=="")))
                {
                  cur.reset();
                  setTimeout(() => {
                    cur.setState({loading:false});
                    cur.lines=[];
                    cur.capture=true;
                  }, 1000);
                }
                else if((cur.face==2 && (cur.license1.fueltype.val=="")))
                {
                  setTimeout(() => {
                    cur.setState({loading:false});
                    //cur.lines=[];
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
                   
                      cur.face = 2
                        cur.capture=true;
                      
                    }, 300);
                    
                  }
                  else
                  {
                    cur.setState({loading:false,flip:false});
                    cur.face=1;
                    
                      cur.license.expiary.val=cur.license.expiary.val.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
                        return d.charCodeAt(0) - 1632;
                    });
     
                    scanned_driving_license.full_name=cur.license.name.val;
                    scanned_driving_license.car_type=cur.license.type.val;
                    scanned_driving_license.car_model=cur.license.model.val;
                    scanned_driving_license.fuel_type=cur.license1.fueltype.val;
                    scanned_driving_license.manufacturing_year=cur.license.year.val;
                    scanned_driving_license.end_date=cur.license.expiary.val;
                    scanned_driving_license.category=cur.license.category.val.replace("صنف","");
                    var l=cur.license.regtype.no.split("-")
                    
                    scanned_driving_license.license_no=l.length>1?l[1]:l[0];
                    scanned_driving_license.symbol=l[0];
                    cur.setState({showCameraView:false})
                    scanned_driving_license.scanned=true;
                    scanned_driving_license.driving_license_img_back=d
                
                    
                    Actions.carinformation({user_id:this.props.user_id,category_id:this.props.category_id})
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
    else if(Math.abs(y-license.regtype.y)<=15)
    {
      license.regtype.no=license.regtype.no+" "+data;
    }
    else if(Math.abs(y-license.address.y)<=15)
    {
      license.address.val=license.address.val+" "+data;
    }
    else if(Math.abs(y-license.year.y)<=15 && license.expiary.x<x)
    {
      license.year.val=license.year.val+" "+data;
    }
    else if(Math.abs(y-license.color.y)<=15)
    {
      license.color.val=license.color.val+" "+data;
    }
    else if(Math.abs(y-license.model.y)<=15 && license.model.val=="")
    {
      license.model.val=license.model.val+" "+data;
    }
    else if(Math.abs(y-license.type.y)<=15 && license.type.val.length<10)
    {
      license.type.val=license.type.val+" "+data;
    }
    else if(Math.abs(y-license.expiary.y)<=15 && license.expiary.x>x)
    {
      license.expiary.val=license.expiary.val+" "+data;
    }
    if(Math.abs(y-license.category.y)<=15)
    {
      license.category.val=license.category.val+" "+data;
    }
    return license;
  }
  assignval1(license,data,x,y){
    if(Math.abs(y-license.motor.y)<=18)
    {
      license.motor.val=license.motor.val+" "+data;
    }
    else if(Math.abs(y-license.fueltype.y)<=18 && license.fueltype.x>x)
    {
      license.fueltype.val=license.fueltype.val+" "+data;
    }
    else if(Math.abs(y-license.chasy.y)<=15)
    {
      license.chasy.val=license.chasy.val+" "+data;
    }
    else if(Math.abs(y-license.licensecenter.y)<=15 && license.licensecenter.x>x)
    {
      license.licensecenter.val=license.licensecenter.val+" "+data;
    }else if(Math.abs(y-license.regiteration.y)<=15  && license.licensecenter.x<x)
    {
      license.regiteration.val=license.regiteration.val+" "+data;
    }
    return license;
  }
  capture=true;
  async takePicture() {
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
        // ImageEditor.cropImage(d.uri,cropData,(uri)=>{
          
        //   ImageStore.getBase64ForTag(uri,(base64data)=>{
            
        //     cur.uploadPost(base64data,d.uri);
        //   },(err)=>{
        //   })
        // },(err)=>{
        // });
       
        const file = await FileSystem.readAsStringAsync(
          d.uri,
          {
              encoding: FileSystem.EncodingType.Base64,
          });
          cur.uploadPost(file,d.uri);
      
        
      });
      setTimeout(() => {if(x==false&&this.state.showCameraView){
        alert("يرجى إعادة المحاولة")
        this.setState({showCameraView:false})
      }}, 10000);
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
  return { information,lang};




  
}
// END MAP STATE TO PROPS
export default connect(mapStateToProps,{...drivingLicenseAction,...homeAction})(DrivingLicense);