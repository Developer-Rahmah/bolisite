import React, { Component } from 'react';
import {ImageBackground,Dimensions,Keyboard,StatusBar,Platform,TouchableOpacity} from 'react-native';
import {CardItem,Body,Button,Text,Right,Left, Icon,Item, Content,Input,CheckBox,Card,Textarea,Drawer} from 'native-base';
import {buttonStyle} from '../theme';
import {VerticalWrapper} from "./common/VerticalWrapper";
import { connect } from 'react-redux';
import * as helpAction from '../actions/helpAction';
const dimensions=Dimensions.get('window');
import {strings} from '../../Locales/i18n';
import DropdownAlert from 'react-native-dropdownalert';
import Header from './header';
import SideBar from "./sideBar";
import Communications from "react-native-communications";

class Help extends Component{
    componentDidUpdate (){
        const { submittion_msg} = this.props;
         if (submittion_msg != null) {
           setTimeout(()=> this.props.resetHelpMessage(),300);
         }
      }
   componentWillMount(){
    this.props.getInfo();

   }
        //START DROPDOWN MESSAGES
      onError = (error) => {
          const {lang}=this.props
        if (error) {
        console.log("error",error)
        this.dropdown.alertWithType('error', strings('message.error',lang), error);
      }
    }
    
      onSuccess = success => {
          const {lang}=this.props
        if (success) {
        this.dropdown.alertWithType('success', strings('message.success',lang), success);
      }
    }
     
    //END DROPDOWN MESSAGES
         //START SHOW ALERT FUNC
         showAlert = () => {
          const {submittion_msg} = this.props;
          if (submittion_msg != null) {
            if (submittion_msg.isError) {
              this.onError(submittion_msg.msg);
            } else if (submittion_msg.isSuccess) {
              this.onSuccess(submittion_msg.msg);
            } else {
              return;
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
 contactUs=()=>{
   const {email,subject,message,lang,user_id}=this.props;
   this.props.submitMessage(email,subject,message,user_id,strings('message.fill_message',lang),strings('message.email_not_valid',lang));

 }
  render(){
  const{subject,email,message,lang,info}=this.props;
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
        <Card>
        <CardItem>
            <Body>
              <VerticalWrapper>
                <Icon name="md-chatboxes"  style={{fontSize:60,color:'#fb4'}}/>
              </VerticalWrapper>
          </Body>
          </CardItem>
          {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

         <CardItem style={{direction:lang=='ar'?"rtl":"ltr"}}>
              <Left>
              <Text 
                style={{fontFamily:'TajawalBold0'}}
                 >
                 {strings('help.email',lang)}
                 </Text> 
              </Left>
              <Right>
              <TouchableOpacity onPress={() => Communications.email([info.email],null,null,'My Subject','My body text')}>

              <Text 
                style={{fontFamily:'TajawalBold0'}}
                 >
               {info.email}
                 </Text>
</TouchableOpacity>
                 </Right>
            </CardItem>
            :
            <CardItem style={{flexDirection:"row-reverse"}}>
            <Right>

            <Text 
              style={{fontFamily:'TajawalBold0'}}
               >
               {strings('help.email',lang)}
               </Text> 
            </Right>
            <Left>
            <TouchableOpacity onPress={() => Communications.email([info.email],null,null,'My Subject','My body text')}>

            <Text 
              style={{fontFamily:'TajawalBold0'}}
               >
             {info.email}
               </Text>
               </TouchableOpacity>
               </Left>
          </CardItem>
          }
                    {Platform.OS=="ios"||(Platform.OS=="android"&&lang=='en')?

            <CardItem style={{direction:lang=='ar'?"rtl":"ltr"}}>
              <Left>
              <Text style={{fontFamily:'TajawalBold0'}}>{strings('help.phone',lang)}</Text>

              </Left>
              <Right>
                <TouchableOpacity onPress={()=>Communications.phonecall(info.phone, true)}>
              <Text style={{fontFamily:'TajawalBold0'}}>{info.phone}</Text>
              </TouchableOpacity>
                 </Right>
            </CardItem>
            :
            <CardItem style={{flexDirection:"row-reverse"}}>
            <Right>

            <Text style={{fontFamily:'TajawalBold0'}}>{strings('help.phone',lang)}</Text>

            </Right>
            <Left>
                          <TouchableOpacity onPress={()=>Communications.phonecall(info.phone, true)}>

            <Text style={{fontFamily:'TajawalBold0'}}>{info.phone}</Text>
            </TouchableOpacity>

               </Left>
          </CardItem>
        }
       
            <CardItem>
            <Body>
              <VerticalWrapper>
                <Text style={{color:'#003580',fontFamily:'TajawalRegular0'}}>{strings('header.help',lang)}</Text>
              </VerticalWrapper>
          </Body>
          </CardItem>

                      <CardItem>
                        <Body>
             
                       <Item>
             <Input placeholder={strings('help.email',lang)} autoCorrect={false}
               value={email}
               onChangeText={(value) => this.props.getHelpText({prop:'email',value})}
               style={{paddingLeft:10,fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}}
             />
             <Icon active name='md-mail' style={{color:'gray'}} />
                       </Item>
                       <Item>
                  <Input placeholder={strings('help.subject',lang)}  autoCorrect={false}
                   value={subject}
                   onChangeText={(value) => this.props.getHelpText({prop:'subject',value})}
                   style={{paddingLeft:10,fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}}
                    />
                      </Item>
                       <Item>
                     <Textarea placeholder={strings('help.message',lang)}  style={{height: 100, width:'100%',fontSize:18,fontFamily:'TajawalRegular0',textAlign:lang=='ar'?"right":"left"}}
                       value={message}
                       onChangeText={(value) => this.props.getHelpText({prop:'message',value})}
                        autoCorrect={false}
                      />
                       </Item>
                      </Body>
                      </CardItem>

                      <CardItem>
                        <Body>
                        <Button style={buttonStyle} onPress={this.contactUs} info block ><Text>{strings('help.submit',lang)} </Text></Button>
                        </Body>
                      </CardItem>

     

       
        </Card>
       
       
       
        </Content>
        <Text>{this.showAlert()}</Text>

<DropdownAlert replaceEnabled={true}  titleStyle={{textAlign:lang=='ar'? 'right':'left',fontFamily:'TajawalBold0',color:"#fff"}} messageStyle={{textAlign:lang=='ar'?'right':'left',fontFamily:'TajawalBold0',color:"#fff"}}imageStyle={{direction:'rtl'}} ref={(ref) => this.dropdown = ref}  />    
        </Drawer>
        
      </ImageBackground>
        )
    }
}
//START MAP STATE TO PROPS
const drawerStyles = {
  drawer: {shadowOpacity: 0, elevation: 0},
  main: {shadowOpacity: 0, elevation: 0}
};
const mapStateToProps = state=>
{
    const { lang } = state.sideBarReducer;

  const { subject, email, message, submittion_msg, loading,info } = state.helpReducer;
  return { subject, email, message, submittion_msg, loading ,lang,info};
};
//END MAP STATE TO PROPS

export default connect(mapStateToProps,helpAction)(Help);