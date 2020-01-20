
import React, { Component } from 'react';
import {ImageBackground,Dimensions,ScrollView,View,Image,Keyboard,StatusBar,TouchableWithoutFeedback,Platform,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text, Icon,Right,Left,Card,Label,Drawer,CheckBox} from 'native-base';
import {transparentBackground,centerStyle,buttonStyle,buttonText,labelStyle} from '../theme';
import * as lifeInsuranceAction from '../actions/lifeInsuranceAction';
import Header from './header';
import SideBar from "./sideBar";
import { connect } from 'react-redux';
import {strings} from '../../Locales/i18n';
import DropdownAlert from 'react-native-dropdownalert';


const dimensions=Dimensions.get('window');
class LifeInsuranceQuestion extends Component{
  constructor(props){
    super(props);
    this.state ={
      form_submitted: false,

      isYesChecked:false,isNoChecked:false
  }
  }
countYes=(value)=>{
value.No=false
    value.Yes=!value.Yes
    this.setState({isYesChecked: value.Yes});

  }
  countNo=(value)=>{
 value.Yes=false
    value.No=!value.No
    this.setState({isNoChecked: value.No});
    

  }
    goFromLifeInsuranceQuestion=()=>{
      
      var arr=[]
      this.setState({form_submitted:true})
      const {questions,lang}=this.props;
      for(var i=0;i<questions.length;i++)
      {
        if(questions[i].Yes==false&&questions[i].No==false){
          // this.dropdown.alertWithType('error',strings('message.error',lang), strings('message.fill_message',lang));
arr.push(questions[i])
        }
      
      }
      if(arr.length<=0){
      this.props.goFromLifeInsuranceQuestion(this.props.lifeInsuranceInformation,this.props.user_id,questions,this.props.id_image)

      }
      else{
    this.dropdown.alertWithType('error',strings('message.error',lang), strings('message.fill_message',lang));

      }

        }
        closeDrawer = () => {
            this.drawer._root.close();
        
          };
        
          
        
          openDrawer = () => {
            
            this.drawer._root.open();
            setTimeout(() => Keyboard.dismiss());
          };
    render(){
      const {lang,questions}=this.props
console.log("this.props.id_imageeeeee",this.props.id_image)
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

       
                      {questions.map((item, index) => {
                                  item.Yes=Boolean(item.Yes)
                                  item.No=Boolean(item.No)


                      return (
              //  lang=='ar'?
              <View style={{backgroundColor:'transparent',borderColor:'transparent'}}>

                     <View style={{marginRight:lang=='ar'?20:null,marginLeft:lang=='en'?20:null,marginTop:20}} key={item.id}>
          
                          <Label style={{textAlign:lang=='ar'?"right":"left",color:this.state.form_submitted==true&&item.Yes==false&&item.No==false?"red":"#171717",fontFamily:'TajawalBold0',lineHeight:25}}>{item.questions}</Label>
                      </View>
                      {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

                      <TouchableWithoutFeedback onPress={() =>this.countYes(item)}>


               <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr"}]}  >
             
          {/* <Right style={{justifyContent:'flex-end'}}> */}
          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
                 <CheckBox
              
              style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
              checked={item.Yes}
              color="#003580"
              onPress={() =>this.countYes(item)
            
              }
            />
   <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",marginBottom:10}]}>{strings('health_insurance.yes',lang)}</Label>


                 </View>
               </CardItem>
               </TouchableWithoutFeedback>
               :
               <TouchableWithoutFeedback onPress={() =>this.countYes(item)}>


               <CardItem style={[transparentBackground,{flexDirection:"row-reverse"}]}  >
             
          {/* <Right style={{justifyContent:'flex-end'}}> */}
          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
          <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color:"#171717",marginBottom:15}]}>{strings('health_insurance.yes',lang)}</Label>

                 <CheckBox
              
              style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
              checked={item.Yes}
              color="#003580"
              onPress={() =>this.countYes(item)
            
              }
            />


                 </View>
               </CardItem>
               </TouchableWithoutFeedback>
  }
                        {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

               <TouchableWithoutFeedback onPress={() =>this.countNo(item)}>

               <CardItem style={[transparentBackground,{direction:lang=='ar'?"rtl":"ltr",marginTop:-25}]} bordered >
             
             {/* <Right style={{justifyContent:'flex-end'}}> */}
             <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
          
                      <CheckBox
                 
                 style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
                 checked={item.No}
                 color="#003580"
                 onPress={() =>this.countNo(item)
               
                 }
               />
      <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717",marginBottom:10}]}>{strings('health_insurance.no',lang)}</Label> 
    
   
                    </View>
                   
             {/* </Right> */}
                  </CardItem>
     
                  </TouchableWithoutFeedback>
                  :
                  <TouchableWithoutFeedback onPress={() =>this.countNo(item)}>

                  <CardItem style={[transparentBackground,{flexDirection:"row-reverse",marginTop:-25}]} bordered >
                
                {/* <Right style={{justifyContent:'flex-end'}}> */}
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}}>
                <Label style={[labelStyle,{textAlign:lang=='ar'?"right":"left",color: "#171717",marginBottom:12}]}>{strings('health_insurance.no',lang)}</Label> 

             
                         <CheckBox
                    
                    style={{marginRight:15,borderRadius:50,justifyContent:'center',alignItems:'center',paddingRight:4,marginBottom :15}}
                    checked={item.No}
                    color="#003580"
                    onPress={() =>this.countNo(item)
                  
                    }
                  />
       
      
                       </View>
                      
                {/* </Right> */}
                     </CardItem>
        
                     </TouchableWithoutFeedback>
                }
    
                  
                 
  </View>

                      );
                })}
          

                     {lang=="en"?
                <CardItem style={transparentBackground}>
                  <Body style={centerStyle}>
       
                           <TouchableOpacity style={{margin: 15, width:Dimensions.get('window').width/1.08,height:44,backgroundColor:'#003580',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:5}}
            onPress={this.goFromLifeInsuranceQuestion}>
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
            onPress={this.goFromLifeInsuranceQuestion}>
                             <Icon name='md-arrow-back' style={{color:'#fff',marginTop:-4,marginEnd:7,resizeMode: 'contain'}}/>
   
              <Text style={[buttonText,{marginBottom:Platform.OS=="android"?12:null}]}>{strings('drivinglicense.continue',lang)}</Text>
            </TouchableOpacity>
                    </Body>
                    </CardItem>
                    :null}

            </ScrollView>
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

    return {lang};
  }
  // END MAP STATE TO PROPS
  
  
  export default connect(mapStateToProps,lifeInsuranceAction)
    (LifeInsuranceQuestion);