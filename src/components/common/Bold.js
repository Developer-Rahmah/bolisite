import React from 'react';
import { Text } from 'react-native';

const Bold = (props) =>
{
  const { bold } = styles;
  return <Text style={bold}> {props.children}</Text>
}

const styles ={
  bold:{
    fontWeight:'bold'
  }
}

export { Bold };
