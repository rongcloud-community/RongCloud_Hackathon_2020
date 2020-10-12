import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Button,
  Image,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProgressHUD from '../common/ProgressHUD';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import actionCreators from '../redux/action';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      userphone: '',
    };
  }

  componentDidMount() {
    PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
    );

    IMClient.init('k51hidwqkv14b');

    StatusBar.setBackgroundColor('#ffffff');
    StatusBar.setBarStyle('dark-content');
  }

  doLogin = () => {
    const {onLogin, navigation} = this.props;
    const {
      userphone,
      password,
    } = this.state;
    onLogin(this.progressHUD, navigation, userphone, password);
  };

  toRegisterPage = () => {
    this.props.navigation.push('Register');
  };

  render() {
    const {
      userphone,
      password,
    } = this.state;
    return (
        <View style={styles.container}>
          <Image source={require('../images/logo.png')} style={styles.logoImage}/>
          <View style={styles.viewContainer}>
            <View style={styles.view2Container}>
              <Text style={styles.inputTitle}>+86</Text>

              <TextInput style={styles.textInput}
                         placeholder={'请输入手机号'}
                         onSubmitEditing={() => {
                           this.passwordInput.focus();
                         }}
                         keyboardType="number-pad"
                         value={userphone}
                         onChangeText={userphone => this.setState({userphone})}/>
            </View>
            <View style={styles.view2Container}>
              <AntDesign name='lock' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请输入密码'}
                         keyboardType="number-pad"
                         secureTextEntry
                         value={password}
                         onChangeText={password => this.setState({password})}
                         onSubmitEditing={this.doLogin}
              />
            </View>
          </View>
          <View style={styles.view3Container}>
            <Button title={'登陆'} color={'#8BC34A'} onPress={this.doLogin}/>
          </View>

          <View style={styles.view4Container}>
            <TouchableOpacity onPress={this.toRegisterPage}>
              <Text style={styles.registerText}>去注册</Text>
            </TouchableOpacity>
          </View>

          <ProgressHUD ref={(ref) => this.progressHUD = ref}/>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: (progressHUD, navigation, userphone, password) => dispatch(actionCreators.onLogin(progressHUD, navigation, userphone, password)),
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 90,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  view2Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 16,
    marginLeft: 8,
    width: 180,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b2b8bc',
    borderRadius: 8,
    paddingLeft: 8,
  },
  view3Container: {
    width: 220,
    alignSelf: 'center',
    marginTop: 20,
  },
  view4Container: {
    height: 100,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#000000',
  },
});
