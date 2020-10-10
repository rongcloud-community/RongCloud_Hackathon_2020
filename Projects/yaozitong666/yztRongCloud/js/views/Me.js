import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import actionCreators from '../action';
import LoadingModal from '../components/LoadingModal';

class Me extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#eff0f1');
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toAboutPage = () => {
    this.props.navigation.push('About');
  };

  handleExit = () => {
    const {onExitApp, navigation} = this.props;
    onExitApp(this.loadingModal, navigation);
  };

  render() {
    const {userName, userPhone} = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.titleViewWrap}>
            <Image source={require('../images/bg.png')} resizeMode={'cover'} style={styles.bgImage}/>
            <View style={styles.titleView}>
              <Text numberOfLines={1} style={styles.title}>{userName}</Text>
            </View>
            <Text numberOfLines={1} style={styles.title}>{userPhone}</Text>
          </View>

          <View style={styles.actionViewWrap}>
            <TouchableOpacity onPress={this.toAboutPage}>
              <View style={styles.actionView}>
                <MaterialIcons name={'call-to-action'} color={'#6bd2df'} size={26}/>
                <Text style={styles.actionText}>关于</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleExit}>
              <View style={styles.actionView}>
                <MaterialIcons name={'exit-to-app'} color={'#fa6086'} size={26}/>
                <Text style={styles.actionText}>退出登陆</Text>
              </View>
            </TouchableOpacity>
          </View>

          <LoadingModal ref={(ref) => this.loadingModal = ref}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.getIn(['LoginState', 'userName']),
  userPhone: state.getIn(['LoginState', 'userPhone']),
});

const mapDispatchToProps = dispatch => ({
  onExitApp: (loadingModal, navigation) => dispatch(actionCreators.onExitApp(loadingModal, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Me);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  titleViewWrap: {
    flex: 0.3,
    elevation: 8,
  },
  actionViewWrap: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    elevation: 3,
    backgroundColor: '#ffffff',
  },
  titleView: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
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
