import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';

class About extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#ffffff');
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.topViewWrap}>
            <Image source={require('../images/logo2.png')} style={styles.logoImage}/>
            <Text style={styles.appName}>聊天宝</Text>
            <Text style={styles.appVersion}>V 1.0</Text>
          </View>
          <View style={styles.bottomViewWrap}>
            <Text style={styles.companyName}>yaozitong666</Text>
            <Text style={styles.copyRight}>Copyright © 2020</Text>
          </View>
        </View>
    );
  }
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topViewWrap: {
    flex: 0.35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomViewWrap: {
    flex: 0.65,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoImage: {
    height: 80,
    width: 80,
  },
  appName: {
    fontSize: 18,
    marginTop: 20,
  },
  appVersion: {
    color: '#7b7b7d',
    marginTop: 5,
  },
  companyName: {
    fontSize: 16,
    marginBottom: 5,
  },
  copyRight: {
    marginBottom: 30,
  },
});

