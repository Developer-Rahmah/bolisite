import React, {Component} from "react";
import {Dimensions, Image,Platform,TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
} from "native-base";
import {Actions} from "react-native-router-flux";
import {isLoggIn} from "../actions/authAction";
import {headerStyle, menuIcon} from "../theme";
import {getShowIconText} from "../actions/homeAction";
import * as sideBarAction from '../actions/sideBarAction';

import {scanned_id_image} from "../App";

// import Icon from "react-native-vector-icons/FontAwesome";
const dimensions = Dimensions.get("window");
class HeaderCustom extends Component {
  componentDidMount() {
    this.props.isLoggIn();
  }
  render() {
    const {user, show_icon} = this.props;
test=()=>{
  Actions.pop()
  scanned_id_image.scanned=false

}
    return (
     
           <Header style={headerStyle}>
           {Platform.OS=="android"? 

                   <TouchableWithoutFeedback onPress={() => Actions.pop()
                    // scanned_id_image.scanned=false
    // scanned_id_image.full_name=""
    // scanned_id_image.id_number=""
    // scanned_id_image.skip_id_img=""
    // scanned_id_image.date_of_birth=""
                  //  }
                   }>

        <Left style={{marginLeft: 8,marginTop:30}}>
          <Icon
            name="md-arrow-back"
            style={{color: "#fff"}}
            // onPress={() => Actions.pop()}
          />
        </Left>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={() =>{
           if(Actions.currentScene=="UploadID")
           {
             Actions.pop()
             this.props.resetLifeCompletely()
             this.props.resetHealthCompletely()
             this.props.resetCancerCompletely()

          }
          else if(Actions.currentScene=="Uploadpassport"){
            Actions.pop()
            this.props.resetServantCompletely()
            this.props.resetTravelCompletely()

          }
          else if(Actions.currentScene=="drivinglicense2"){
            Actions.pop()
            this.props.resetCarCompletely()
      

          }
          else{
            Actions.pop()

          }
          }
          // scanned_id_image.scanned=false
          // scanned_id_image.full_name=""
          // scanned_id_image.id_number=""
          // scanned_id_image.skip_id_img=""
          // scanned_id_image.date_of_birth=""
          // }
        }>

        <Left style={{marginLeft: 8}}>
          <Icon
            name="md-arrow-back"
            style={{color: "#fff"}}
            // onPress={() => Actions.pop()}
          />
        </Left>
        </TouchableWithoutFeedback>
    }

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
    );
  }
}
// export default HeaderCustom;
const mapStateToProps = state => {
  const {user} = state.authReducer;
  const {show_icon} = state.homeReducer;

  return {user, show_icon};
};
export default connect(mapStateToProps, {isLoggIn, getShowIconText,...sideBarAction})(
  HeaderCustom
);
