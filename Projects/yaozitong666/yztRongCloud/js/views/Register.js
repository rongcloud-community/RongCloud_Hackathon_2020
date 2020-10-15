import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View, ToastAndroid, Button} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDownButton from '../components/CountDownButton';
import {sendMsg} from '../api/user';
import actionCreators from '../action';
import {connect} from 'react-redux';
import LoadingModal from '../components/LoadingModal';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      code: '',
      nickname: '',
      password: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#2c374f');
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toRegister = () => {
    const {onRegisterByPhoneAndPassword, navigation} = this.props;
    const {phoneNumber, code, nickname, password} = this.state;
    onRegisterByPhoneAndPassword(this.loadingModal, navigation, phoneNumber, code, nickname, password);
  };

  render() {
    const {phoneNumber, code, nickname, password} = this.state;
    return (
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>注册账号</Text>
          </View>

          <View style={styles.registerViewWrap}>
            <View style={styles.textInputView}>
              <MaterialCommunityIcons name='account' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请输入昵称'}
                         placeholderTextColor="#acb2b6"
                         onChangeText={nickname => this.setState({nickname})}
                         onSubmitEditing={() => {
                           this.phoneInput.focus();
                         }}
                         value={nickname}
              />
            </View>

            <View style={styles.textInputView}>
              <AntDesign name='phone' color={'#acb2b6'} size={26}/>

              <TextInput style={[styles.textInput, {width: 120}]}
                         ref={ref => this.phoneInput = ref}
                         placeholder={'请输入手机号'}
                         placeholderTextColor="#acb2b6"
                         keyboardType="number-pad"
                         onChangeText={phoneNumber => this.setState({phoneNumber})}
                         value={phoneNumber}
              />
              <CountDownButton
                  textStyle={styles.countBtnText}
                  timerCount={60}
                  enable={true}
                  onClick={(shouldStartCounting) => {
                    if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
                      shouldStartCounting(false);
                      ToastAndroid.show('手机号码有误，请重填', ToastAndroid.SHORT);
                    } else {
                      sendMsg(phoneNumber).then(res => {
                        ToastAndroid.show('验证码发送成功', ToastAndroid.SHORT);
                        shouldStartCounting(true);
                      }).catch(e => {
                        ToastAndroid.show(e, ToastAndroid.LONG);
                        shouldStartCounting(false);
                      });
                    }
                  }}/>
            </View>
            <View style={styles.textInputView}>
              <AntDesign name='message1' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请输入验证码'}
                         placeholderTextColor="#acb2b6"
                         keyboardType="number-pad"
                         onChangeText={code => this.setState({code})}
                         onSubmitEditing={() => {
                           this.passwordInput.focus();
                         }}
                         value={code}
              />
            </View>
            <View style={styles.textInputView}>
              <AntDesign name='lock' color={'#acb2b6'} size={26}/>

              <TextInput style={styles.textInput}
                         ref={ref => this.passwordInput = ref}
                         placeholder={'请输入密码'}
                         placeholderTextColor="#acb2b6"
                         keyboardType="number-pad"
                         secureTextEntry
                         onChangeText={password => this.setState({password})}
                         onSubmitEditing={this.toRegister}
                         value={password}
              />
            </View>
            <View style={styles.registerButtonView}>
              <Button title={'注册'} onPress={this.toRegister} color={'#27918e'}/>
            </View>
          </View>

          <LoadingModal ref={(ref) => this.loadingModal = ref}/>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRegisterByPhoneAndPassword: (loadingModal, navigation, phone, code, nickname, password) => dispatch(actionCreators.onRegisterByPhoneAndPassword(loadingModal, navigation, phone, code, nickname, password)),
});

export default connect(null, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c374f',
  },
  titleView: {
    flex: 0.18,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    marginLeft: 35,
  },
  registerViewWrap: {
    flex: 0.82,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#acb2b6',
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 8,
    width: 240,
    color: '#acb2b6',
  },
  countBtnText: {
    fontSize: 12,
    color: '#ffffff',
  },
  registerButtonView: {
    width: 280,
    marginTop: 15,
  },
});
