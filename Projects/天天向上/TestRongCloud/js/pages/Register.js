import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, TextInput, View, ToastAndroid} from 'react-native'
import Api from "../api/Api";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      phone: '',
      password: '',
      code: ''
    }
  }

  toRegister = () => {
    if (!this.state.phone || !this.state.code || !this.state.userName || !this.state.password) {
      return
    }
    ToastAndroid.show('正在注册，请稍等...', ToastAndroid.SHORT)
    fetch(Api.VERIFY_CODE, {
      method: "POST", body: JSON.stringify({
        phone: this.state.phone.toString(),
        region: '86',
        code: this.state.code
      }), headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          fetch(Api.REGISTER_URL, {
            method: "POST", body: JSON.stringify({
              nickname: this.state.userName.toString(),
              password: this.state.password.toString(),
              verification_token: json.result.verification_token
            }), headers: {
              'Content-Type': 'application/json',
              Accept: "application/json"
            }
          })
              .then(res => res.json())
              .then(json => {
                console.log(json)
                ToastAndroid.show('注册成功！', ToastAndroid.SHORT)
                this.props.navigation.pop()
              })
              .catch(e => {
                console.log(e)
              });
        })
        .catch(e => {
          console.log(e)
        });
  }

  sendCode = () => {
    if (!(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      ToastAndroid.show('手机号码有误，请重填', ToastAndroid.SHORT);
      return
    }
    ToastAndroid.show('正在发送验证码', ToastAndroid.SHORT)
    let url = Api.SEND_CODE;
    fetch(url, {
      method: "POST", body: JSON.stringify({
        phone: this.state.phone.toString(),
        region: '86'
      }), headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          ToastAndroid.show('发送验证码成功', ToastAndroid.SHORT)
        })
        .catch(e => {
          console.log(e)
        });
  }

  render() {
    const {phone, password, userName, code} = this.state
    return (
        <View style={styles.container}>
          <ScrollView>
            <Image source={require('../images/logo.png')} style={styles.logo}/>

            <View style={styles.infoView}>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}>昵称：</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'请输入昵称'}
                    placeholderTextColor="#cacaca"
                    value={userName}
                    onSubmitEditing={() => {
                      this.phoneInput.focus();
                    }}
                    onChangeText={(userName) => this.setState({userName})}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}>手机号：</Text>
                <TextInput
                    style={styles.textInput}
                    ref={node => this.phoneInput = node}
                    placeholder={'请输入手机号'}
                    placeholderTextColor="#cacaca"
                    keyboardType="number-pad"
                    value={phone}
                    onSubmitEditing={this.sendCode}
                    onChangeText={(phone) => this.setState({phone})}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}>验证码：</Text>
                <TextInput
                    style={[styles.textInput, {width: 150, marginRight: 10}]}
                    placeholder={'请输入验证码'}
                    placeholderTextColor="#cacaca"
                    keyboardType="number-pad"
                    value={code}
                    onSubmitEditing={() => {
                      this.pwdInput.focus();
                    }}
                    onChangeText={(code) => this.setState({code})}
                />
                <Button title={'发送'} onPress={this.sendCode}/>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}>密码：</Text>
                <TextInput
                    style={styles.textInput}
                    ref={node => this.pwdInput = node}
                    placeholder={'请输入密码'}
                    placeholderTextColor="#cacaca"
                    keyboardType="number-pad"
                    value={password}
                    onSubmitEditing={this.toRegister}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
              </View>

              <View style={styles.loginBtnView}>
                <Button title={'注册'} onPress={this.toRegister}/>
              </View>
            </View>
          </ScrollView>
        </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 200,
    height: 60.1,
    alignSelf: 'center',
    marginTop: 80
  },
  infoView: {
    paddingTop: 80,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 17,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
    height: 49,
    width: 200,
    paddingLeft: 10
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  loginBtnView: {
    paddingHorizontal: 35,
    marginTop: 35
  },
});
