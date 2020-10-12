import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default class ProgressHUD extends Component {
  static propTypes = {
    onModalHideCallback: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      hasText: false,
      text: '',
    };
  }

  show(text) {
    if (this.state.isShow) {
      return;
    }
    let hasText = false;
    if (text !== undefined && text != null && text !== '') {
      hasText = true;
    }
    this.setState({
      isShow: true,
      text: text,
      hasText: hasText,
    });
  }

  hide() {
    if (!this.state.isShow) {
      return;
    }
    this.setState({
      isShow: false,
    });
  }

  _onModalHideCallback = () => {
    if (this.props.onModalHideCallback) {
      this.props.onModalHideCallback();
    }
  };

  render() {
    const {isShow} = this.state;
    return (
        <Modal animationIn="fadeIn"
               animationOut="fadeOut"
               useNativeDriver
               statusBarTranslucent
               supportedOrientations={['portrait', 'landscape']}
               isVisible={isShow}
               style={hudStyles.container}
               onModalHide={this._onModalHideCallback}
        >
          <View style={hudStyles.hud}>
            <ActivityIndicator size='large' color='white'/>
            {this.state.hasText ? <Text style={hudStyles.text}>{this.state.text}</Text> : null}
          </View>
        </Modal>
    );
  }
}

const hudStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hud: {
    backgroundColor: 'black',
    borderRadius: 10,
    opacity: 0.6,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
