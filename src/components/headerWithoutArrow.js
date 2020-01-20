import React, { Component } from 'react';
import {Dimensions,Image,Platform} from 'react-native';
import { connect } from 'react-redux';
import { Header, Left, Body, Right, Button, Text,Icon, CardItem } from 'native-base';
import { isLoggIn } from "../actions/authAction";
import {centerStyle,headerStyle,menuIcon} from '../theme';
const dimensions=Dimensions.get('window');
import {scanned_id_image} from "../App";

class HeaderCustomWithoutArrow extends Component {
  componentDidMount(){
    this.props.isLoggIn()
  
  }
    render(){
      const {user,show_icon}=this.props;

        return(
            
            <Header style={headerStyle}>
        <Left>
            
        </Left>
        {Platform.OS=="ios"?
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
          }}
        >
          <Image
            source={require("../assests/images/logo2.png")}
            style={{height: 150, width: 150}}
          />
        </Body>
        :
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
            marginLeft:50
          }}
        >
          <Image
            source={require("../assests/images/logo2.png")}
            style={{height: 150, width: 150}}
          />
        </Body>
}
   {Platform.OS=="android"? 

<Right style={{marginTop:30}}>
  {user.isLoggedIn ? (
    <Button transparent onPress={this.props.openDrawer}>
      <Icon name="menu" style={menuIcon} />
    </Button>
  ) : null}
</Right>
:
<Right>
{user.isLoggedIn ? (
  <Button transparent onPress={this.props.openDrawer}>
    <Icon name="menu" style={menuIcon} />
  </Button>
) : null}
</Right>}
   
          </Header>
        )
    }
}
// export default HeaderCustom;
const mapStateToProps = state =>
{
  const { user } = state.authReducer;
  const { show_icon } = state.homeReducer;


  return { user,show_icon};
}
export default connect(mapStateToProps,{isLoggIn})(HeaderCustomWithoutArrow);