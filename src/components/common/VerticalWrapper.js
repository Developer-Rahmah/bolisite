import React from 'react';
import { View } from 'react-native';

const VerticalWrapper = (props)=>
{
  const { wrapperStyle } = styles;
  return (
     <View style={[wrapperStyle,props.style]}>
      { props.children }
     </View>
  );
}

const styles ={
   wrapperStyle:
  {
    alignSelf:'center',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'column',
    flex:1
  }
}

export { VerticalWrapper };
