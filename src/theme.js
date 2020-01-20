import { StyleSheet,Dimensions } from 'react-native';
const dimensions=Dimensions.get('window');

module.exports  = StyleSheet.create({
 centerStyle:{
    justifyContent:'center',alignItems:'center'
 },
 transparentBackGround:{
    backgroundColor:"transparent",
    borderWidth:1,
    borderRadius:5
 },
 blueBackgroundColor:{
   backgroundColor: "#003580"
 },
 buttonStyle:{
   backgroundColor:'#003580',justifyContent:'center',marginTop:10
},

buttonText:{
   color:"#fcfcfc",fontSize:16,fontFamily:'TajawalBold0',justifyContent:'center',alignItems:'center',marginTop:5, lineHeight: 30,
},
cardItemWithMargin:{
   backgroundColor:"transparent",marginTop:50
},
inputStyle:{
   borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:45
},

transparentBackground:{
   backgroundColor:"transparent"
},
transparentBorder:{
borderColor:"transparent"
},
phoneInputStyle:{
   borderRadius:5,marginBottom:5,backgroundColor:"#fff",textAlign:"right",height:45,width:dimensions.width/1.1
},
touchableOpacityText:{
   color:"#171717",fontSize:13,fontFamily:'TajawalBold0'
},
servicesText:{
   color:"#003580",
   fontSize:21,
   fontFamily:'TajawalBlack0',lineHeight:30
},
servicesText2:{
   color:"#003580",
   fontSize:18,
   fontFamily:'TajawalBlack0',lineHeight:30
},
sevicesCardItemStyle:{
   backgroundColor:"#fff",
   height:66
},
pickerStyle:{
   borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:45,width:dimensions.width/1.1
},
pickerStyle2:{
   borderRadius:5,marginBottom:5,backgroundColor:"#fff",height:45,width:"50%"
},

datePickerStyle:{
   width:'100%',backgroundColor:"#fff",borderColor:"#fff"
},
headerStyle:{
   backgroundColor:"#003580",height:108.3,width:dimensions.width
},
menuIcon:{
   color:'#FFF',fontSize:35,fontWeight:'bold'
},
whiteBackground:{
   backgroundColor:"#fff"
},
successBackground:{
   backgroundColor:"green"
},
labelStyle:{
   textAlign:'right',marginBottom:5,fontFamily:'TajawalRegular0',lineHeight:25
}
  })