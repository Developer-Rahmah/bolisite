import React,{Component} from 'react';
import {Image,ImageBackground,Dimensions,View} from 'react-native';
const dimensions=Dimensions.get('window');
class SplashScreen extends Component{
    render(){
return(
    <ImageBackground source={require('../assests/images/splash–1.png')} style={{width:dimensions.width,height:'100%'}}>
    <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row",display:"flex",marginTop:250}}>
     <Image
           source={require('../assests/images/Artboard–3.png')}
          />
</View>
    </ImageBackground>
)
    }
}
export default SplashScreen
