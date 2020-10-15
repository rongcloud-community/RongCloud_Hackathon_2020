import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import actionCreators from '../redux/action';
import ProgressHUD from '../common/ProgressHUD';

class Profile extends Component {

  handleExit = () => {
    const {onExit, navigation} = this.props;
    onExit(this.progressHUD, navigation);
  };

  render() {
    const {username, userphone} = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.titleViewWrap}>
            <Image source={require('../images/av.png')} resizeMode={'cover'} style={styles.av}/>
            <View>
              <Text numberOfLines={1} style={styles.title}>昵称：{username}</Text>
              <Text numberOfLines={1} style={styles.title2}>手机：{userphone}</Text>
            </View>
          </View>

          <View style={styles.actionViewWrap}>
            <Ionicons.Button name={'exit'} color={'#8BC34A'} size={26} backgroundColor={'#ffffff'}
                             onPress={this.handleExit}>
              退出登陆
            </Ionicons.Button>
          </View>

          <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
  userphone: state.login.userphone,
});

const mapDispatchToProps = dispatch => ({
  onExit: (progressHUD, navigation) => dispatch(actionCreators.onExit(progressHUD, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  titleViewWrap: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  actionViewWrap: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title2: {
    fontSize: 15,
    marginTop: 8,
  },
  av: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 200,
    paddingHorizontal: 15,
    marginBottom: 28,
    paddingBottom: 8,
  },
  actionText: {
    fontSize: 17,
    marginLeft: 50,
  },
});
