import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import {registerUser, send_code_yp, verify_code_yp} from '../api/register';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      phoneNumber: '',
      password: '',
      code: '',
    };
  }

  sendCode = () => {
    if (!(/^1[3456789]\d{9}$/.test(this.state.phoneNumber))) {
      ToastAndroid.show('手机号码有误，请重填', ToastAndroid.SHORT);
      return;
    }
    send_code_yp(this.state.phoneNumber.toString())
        .then(res => res.json())
        .then(json => {
          console.log(json);
          ToastAndroid.show('发送验证码成功', ToastAndroid.SHORT);
        })
        .catch(e => {
          console.log(e);
        });
  };

  toRegister = () => {
    const {phoneNumber, code, userName, password} = this.state;
    if (!(phoneNumber && code && userName && password)) {
      ToastAndroid.show('请完善信息', ToastAndroid.SHORT);
      return;
    }
    verify_code_yp(phoneNumber.toString(), code)
        .then(res => res.json())
        .then(json => {
          registerUser(this.state.userName.toString(), this.state.password.toString(), json.result.verification_token)
              .then(res => res.json())
              .then(_ => {
                ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                this.props.navigation.pop();
              })
              .catch(e => {
                console.log(e);
              });
        })
        .catch(e => {
          console.log(e);
        });
  };

  render() {
    const {phoneNumber, password, userName, code} = this.state;
    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.innerView}>
              <View style={styles.itemView}>
                <Text style={styles.inputTitle}>昵称：</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'请输入昵称'}
                    placeholderTextColor="#ffffff"
                    value={userName}
                    onSubmitEditing={() => {
                      this.phoneInput.focus();
                    }}
                    onChangeText={(userName) => this.setState({userName})}
                />
              </View>
              <View style={styles.itemView}>
                <Text style={styles.inputTitle}>手机号：</Text>
                <TextInput
                    style={styles.textInput}
                    ref={node => this.phoneInput = node}
                    placeholder={'请输入手机号'}
                    placeholderTextColor="#ffffff"
                    keyboardType="number-pad"
                    value={phoneNumber}
                    onSubmitEditing={this.sendCode}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                />
              </View>
              <View style={styles.itemView}>
                <Text style={styles.inputTitle}>验证码：</Text>
                <TextInput
                    style={[styles.textInput, {width: 150, marginRight: 10}]}
                    placeholder={'请输入验证码'}
                    placeholderTextColor="#ffffff"
                    keyboardType="number-pad"
                    value={code}
                    onSubmitEditing={() => {
                      this.pwdInput.focus();
                    }}
                    onChangeText={(code) => this.setState({code})}
                />
                <Button title={'发送'} onPress={this.sendCode} color={'#7986cb'}/>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.inputTitle}>密码：</Text>
                <TextInput
                    style={styles.textInput}
                    ref={node => this.pwdInput = node}
                    placeholder={'请输入密码'}
                    placeholderTextColor="#ffffff"
                    keyboardType="number-pad"
                    value={password}
                    onSubmitEditing={this.toRegister}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
              </View>

              <View style={styles.buttonView}>
                <Button title={'注册'} onPress={this.toRegister} color={'#7986cb'}/>
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
    flex: 1,
    backgroundColor: '#8791d4',
  },
  innerView: {
    paddingTop: 75,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 17,
    borderRadius: 10,
    height: 49,
    width: 200,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 70,
  },
  buttonView: {
    paddingHorizontal: 35,
    marginTop: 35,
    paddingBottom: 10,
  },
});
