import React, {Component} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Api from "../api/Api";
import * as IMClient from "../components/IMLib";
import AsyncStorage from '@react-native-community/async-storage';
import FormItem from "../components/form-item";

class Home extends Component {
  constructor(props) {
    super(props);
    this.userId = props.route.params?.userId ?? '';
    this.userToken = props.route.params?.userToken ?? '';
    this.state = {
      userName: '',
      conversationList: [],
    }
    this.cookie = null;
  }

  componentDidMount() {
    this.getMyStringValue().then(r => {
      this.cookie = r
      this.getUserInfo()
      this.updateConversation()
    })

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.cookie && this.updateConversation()
    });
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  updateConversation = () => {
    Promise.all([this.getAllFriendList(), this.getConversations()])
        .then(results => {
          let conversationList = []
          let friendList = results[0]
          let conversations = results[1]
          conversations.forEach(conversation => {
            let conversationObj = {}
            conversationObj.latestMessage = conversation.latestMessage.content
            conversationObj.targetId = conversation.targetId
            conversationObj.sentTime = this.timeToDate(conversation.sentTime)

            if (conversation.senderUserId === this.userId) {
              conversationObj.senderUserName = '我'
            } else {
              friendList.forEach(friend => {
                if (friend.user.id === conversation.senderUserId) {
                  conversationObj.senderUserName = friend.user.nickname
                }
              })
            }

            friendList.forEach(friend => {
              if (friend.user.id === conversation.targetId) {
                conversationObj.displayName = friend.user.nickname
              }
            })

            if (conversationObj.displayName) {
              conversationList.push(conversationObj)
            }
          })

          this.setState({conversationList});
        })
        .catch(e => {
          console.log(e)
          ToastAndroid.show('获取会话失败！' + e.toString(), ToastAndroid.SHORT)
        })
  }

  getUserInfo = () => {
    fetch(Api.USER_INFO + this.userId, {
      credentials: 'include',
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        cookie: this.cookie
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({userName: json.result.nickname});
        })
        .catch(e => {
          console.log('getUserInfo ', e)
        });
  }

  getAllFriendList = () => {
    return new Promise((resolve, reject) => {
      fetch(Api.ALL_FRIEND, {
        method: "GET",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          cookie: this.cookie
        }
      })
          .then(res => res.json())
          .then(json => {
            resolve(json.result)
          })
          .catch(e => {
            reject(e)
            console.log('getAllFriendList ', e)
          });
    })
  }

  getConversations = () => {
    return new Promise((resolve, reject) => {
      IMClient.getConversationList([1]).then(conversations => {
        resolve(conversations)
        console.log('conversations ', conversations);
      }).catch(e => {
        reject(e)
      })
    })
  };

  getMyStringValue = async () => {
    try {
      return await AsyncStorage.getItem('cookie')
    } catch (e) {
      console.log(e)
    }
  }

  timeToDate = (time) => {
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s
  }

  openMenu = () => {
    this.drawerLayoutRef.openDrawer()
  }

  toLogout = () => {
    fetch(Api.LOGOUT_URL, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        cookie: this.cookie
      }
    })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          IMClient.disconnect()
          this.props.navigation.replace('Login')
        })
        .catch(e => {
          console.log(e)
        });
  }

  toFriendList = () => {
    this.props.navigation.push('FriendList', {
      userId: this.userId
    })
  }

  toAddFriend = () => {
    this.props.navigation.push('AddFriend')
  }

  onConversationClick = (conversation) => {
    this.props.navigation.push('ChatRoom', {
      userName: conversation.displayName,
      otherSideId: conversation.targetId
    })
  }

  render() {
    const {userName, conversationList} = this.state
    const navigationView = (
        <View style={styles.navigationContainer}>
          <Text style={[styles.title, {marginBottom: 15}]}>欢迎您！{userName}</Text>
          <FormItem>
            <Button title={'好友列表'} onPress={this.toFriendList}/>
          </FormItem>
          <FormItem>
            <Button title={'添加好友'} onPress={this.toAddFriend}/>
          </FormItem>
          <FormItem>
            <Button title={'退出登陆'} onPress={this.toLogout}/>
          </FormItem>
        </View>
    )
    return (
        <DrawerLayoutAndroid
            ref={ref => this.drawerLayoutRef = ref}
            drawerWidth={300}
            drawerPosition={'right'}
            renderNavigationView={() => navigationView}
        >
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.title}>会话列表</Text>
              <MaterialIcons.Button
                  name="menu-open"
                  backgroundColor="#3b5998"
                  onPress={this.openMenu}
              />
            </View>

            <ScrollView contentContainerStyle={styles.body} ref={ref => this.scrollViewRef = ref}>
              {conversationList.length === 0 && <Text style={styles.item}>一个会话也没有哦，快去找好友聊天吧～</Text>}
              {
                conversationList.map(conversation => {
                  return (
                      <View style={styles.conversationView} key={conversation.sentTime}>
                        <TouchableOpacity onPress={() => this.onConversationClick(conversation)}>
                          <Text style={styles.displayName}>{conversation.displayName}</Text>
                          <View style={styles.conversationTextView}>
                            <Text style={styles.message}
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}>{conversation.senderUserName}: {conversation.latestMessage}</Text>
                            <Text style={styles.sentTime}>{conversation.sentTime}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </DrawerLayoutAndroid>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    padding: 8
  },
  body: {padding: 16},
  conversationView: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    marginBottom: 9
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  conversationTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  message: {
    width: '50%',
  },
  sentTime: {}
});
