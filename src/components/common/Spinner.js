import React from 'react';
import { View, ActivityIndicator, Text} from 'react-native';

const Spinner = (props) => {

renderSpinner = ()=>
{
  if (props.frame) {
  return  <View style={styles.spinnerContainer}>
      <ActivityIndicator size={props.size || 'large'} color={props.color}/>
       <Text style={styles.textStyle}>LOADING ...</Text>
     </View>
  }
  else {
  return <View>
         <ActivityIndicator size={props.size || 'large'}  color={props.color} />
         </View>
  }
}
return (
  <View style={[styles.spinnerStyle,props.style]}>
    {renderSpinner()}
  </View>
)
};


const styles ={
  spinnerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  spinnerContainer:{
    padding:15,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'rgba(0, 0, 0, 0.75)'
  },
  textStyle:{
    color:'#fff',
    marginTop:10,
    marginBottom:5,
    fontWeight:'bold'
  }
}
export {Spinner}
