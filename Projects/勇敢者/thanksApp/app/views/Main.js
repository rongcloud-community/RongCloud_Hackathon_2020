import React, {Component} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import * as IMClient from 'react-native-rongcloud-imlib/src';
import AsyncStorage from '@react-native-community/async-storage';
import {getAllFriend, getUserInfo, logout} from '../api/main';

class Main extends Component {
  constructor(props) {
    super(props);
    this.userId = props.navigation.getParam('userId', '');
    this.state = {
      userName: '',
      list: [],
    };
    this.cookie = null;
  }

  componentDidMount() {
    this.getCookie();

    this._navListener = this.props.navigation.addListener('willFocus', () => {
      if (this.cookie) {
        this.updateList();
      }
    });
  }

  componentWillUnmount() {
    this._navListener && this._navListener.remove();
  }

  updateList = () => {
    Promise.all([this.getList(), this.getConversations()])
        .then(results => {
          let list = [];
          let addressBookList = results[0];
          let conversations = results[1];
          conversations.forEach(conversation => {
            let conversationObj = {};
            conversationObj.latestMessage = conversation.latestMessage.content;
            conversationObj.targetId = conversation.targetId;
            conversationObj.sentTime = this.conversionTime(conversation.sentTime);

            if (conversation.senderUserId === this.userId) {
              conversationObj.senderUserName = '我';
            } else {
              addressBookList.forEach(value => {
                if (value.user.id === conversation.senderUserId) {
                  conversationObj.senderUserName = value.user.nickname;
                }
              });
            }

            addressBookList.forEach(value => {
              if (value.user.id === conversation.targetId) {
                conversationObj.displayName = value.user.nickname;
              }
            });
            if (conversationObj.displayName) {
              list.push(conversationObj);
            }
          });

          this.setState({list});
        })
        .catch(e => {
          ToastAndroid.show(e.toString(), ToastAndroid.SHORT);
        });
  };

  getUserInfo = () => {
    getUserInfo(this.userId, this.cookie)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          this.setState({userName: json.result.nickname});
        })
        .catch(e => {
          console.log('getUserInfo ', e);
        });
  };

  getList = () => {
    return new Promise((resolve, reject) => {
      getAllFriend(this.cookie)
          .then(res => res.json())
          .then(json => {
            resolve(json.result);
          })
          .catch(e => {
            reject(e);
            console.log('getList ', e);
          });
    });
  };

  getConversations = () => {
    return new Promise((resolve, reject) => {
      IMClient.getConversationList([1]).then(conversations => {
        resolve(conversations);
        console.log('conversations ', conversations);
      }).catch(e => {
        reject(e);
      });
    });
  };

  getCookie = () => {
    AsyncStorage.getItem('cookie').then(result => {
      this.cookie = result;
      this.getUserInfo();
      this.updateList();
    }).catch(e => {
      console.log(e);
    });
  };

  conversionTime = (time) => {
    let date = new Date(time);
    let h = date.getHours() + ':';
    let m = date.getMinutes();
    return h + m;
  };

  openMenu = () => {
    this.myDrawerLayout.openDrawer();
  };

  toLogout = () => {
    logout(this.cookie)
        .then(res => res.json())
        .then(_ => {
          IMClient.disconnect();
          this.props.navigation.replace('Login');
        })
        .catch(e => {
          console.log(e);
        });
  };

  onConversationClick = (conversation) => {
    this.props.navigation.push('Chat', {
      name: conversation.displayName,
      targetId: conversation.targetId,
    });
  };

  renderItem = ({item}) => {
    return (
        <View style={styles.conversationView} key={item.sentTime}>
          <TouchableOpacity onPress={() => this.onConversationClick(item)}>
            <View style={styles.userNameViewWrap}>
              <Image source={require('../images/touxian.png')} style={styles.touxian}/>
              <Text style={styles.displayName}>{item.displayName}</Text>
            </View>
            <View style={styles.conversationTextView}>
              <Text style={styles.message}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>{item.senderUserName}: {item.latestMessage}</Text>
              <Text style={styles.sendTime}>{item.sentTime}</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  };

  render() {
    const {userName, list} = this.state;
    const navigationView = (
        <View style={styles.navigationContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../images/touxian.png')} style={{width: 80, height: 80}}/>
            <Text style={[styles.title, {marginBottom: 15, marginTop: 10}]}>{userName}</Text>
          </View>
          <View style={{marginBottom: 16, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Button title={'通讯录'} onPress={() => {
              this.props.navigation.push('AddressBook', {
                userId: this.userId,
              });
            }} color={'#7986cb'}/>
            <Button title={'搜索用户'} onPress={() => {
              this.props.navigation.push('Search');
            }} color={'#7986cb'}/>
          </View>
          <View style={{marginBottom: 16}}>
            <Button title={'退出'} onPress={this.toLogout} color={'#7986cb'}/>
          </View>
        </View>
    );
    return (
        <DrawerLayoutAndroid
            ref={ref => this.myDrawerLayout = ref}
            drawerWidth={220}
            drawerPosition={'left'}
            renderNavigationView={() => navigationView}
        >
          <View style={styles.container}>
            <View style={styles.titleView}>
              <TouchableOpacity onPress={this.openMenu}>
                <Image source={require('../images/menu.png')}
                       style={{height: 30, width: 30, tintColor: '#ffffff', marginRight: 15}}/>
              </TouchableOpacity>
              <Text style={styles.title}>你好～ {userName}</Text>
            </View>

            <FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={item => item.sentTime}
                ListEmptyComponent={() => {
                  return (
                      <Text style={styles.emptyText}>这里空空如也～ 去通讯录找好友聊聊天吧～</Text>
                  );
                }}
            />
          </View>
        </DrawerLayoutAndroid>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8791d4',
  },
  title: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 22,
  },
  titleView: {
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 25,
    backgroundColor: '#8791d4',
    alignItems: 'center',
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#8791d4',
    padding: 8,
  },
  body: {padding: 16},
  conversationTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  conversationView: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 9,
    marginHorizontal: 8,
    elevation: 4,
    backgroundColor: '#7986cb',
    marginVertical: 8,
  },
  userNameViewWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touxian: {
    height: 35,
    width: 35,
    marginRight: 15,
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  message: {
    width: '50%',
    color: '#ffffff',
  },
  sendTime: {
    color: '#ffffff',
  },
  emptyText: {
    color: '#ffffff',
    marginLeft: 25,
    marginTop: 15,
  },
});
