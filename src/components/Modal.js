import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReactModal from "react-native-modal";

export default class Modal extends Component {
  state = {
    isModalVisible: true
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1,padding:25}}>
        <ReactModal style={{backgroundColor:"#617AF5",flex:3}} isVisible={this.state.isModalVisible} hideModalContentWhileAnimating={true} backdropOpacity={0.0}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </ReactModal>
      </View>
    );
  }
}
