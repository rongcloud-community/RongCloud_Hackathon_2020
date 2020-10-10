import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actionCreators from '../../actions';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button} from 'react-native-paper';

class Contacts extends Component {
  componentDidMount() {
    this._refreshData(true);

    this._navListener = this.props.navigation.addListener('focus', () => {
      this._refreshData(false);
    });
  }

  componentWillUnmount() {
    this._navListener();
  }

  _refreshData = (isShowLoading = true) => {
    const {onChangeContactsArr, myId} = this.props;
    onChangeContactsArr(myId, isShowLoading);
  };

  itemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  listFooterComponent = () => {
    return (
        <View style={styles.footView}>
          {
            this.props.contactsArr.length !== 0 ? <Text style={styles.footText}>- 到底啦 -</Text> : null
          }
        </View>
    );
  };

  listEmptyComponent = () => {
    return (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>快去添加好友聊天吧</Text>
        </View>
    );
  };

  toRoom = (item) => {
    if (item.status === 20) {
      this.props.navigation.push('Room', {
        targetName: item.user.nickname,
        targetId: item.user.id,
      });
    }
  };

  agree = (item) => {
    const {onAgreeOrIgnoreFriend} = this.props;
    onAgreeOrIgnoreFriend(false, item.user.id, () => {
      this._refreshData();
    });
  };

  ignore = (item) => {
    const {onAgreeOrIgnoreFriend} = this.props;
    onAgreeOrIgnoreFriend(true, item.user.id, () => {
      this._refreshData();
    });
  };

  _renderItem = ({item, index}) => {
    let status;
    switch (item.status) {
      case 20:
        status = '已添加好友';
        break;
      case 10:
        status = '已发送请求，需对方验证';
        break;
      case 11:
        status = '请求添加好友';
        break;
      case 21:
        status = '已忽略';
        break;
      case 30:
        status = '被删除';
        break;
    }
    console.log(item);
    return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => this.toRoom(item)}>
            <View style={styles.userInfoView}>
              <AntDesign name={'user'} size={35} color={'#FF9800'}/>
              <View>
                <Text style={styles.textTitle}>{item.user.nickname}</Text>
                <Text style={styles.textTitle2}>{item.user.phone}</Text>
              </View>
            </View>
            <Text style={styles.status}>{status}</Text>
            {
              item.status === 11 && item.message ?
                  <Text style={styles.message}>留言：{item.message}</Text> : null
            }
          </TouchableOpacity>

          {item.status === 11 ?
              <View style={styles.viewBottom}>
                <Button onPress={() => this.agree(item)} color={'#8BC34A'} mode={'contained'}>
                  同意
                </Button>
                <Button color={'#ef2d20'} onPress={() => this.ignore(item)} mode={'contained'}>
                  拒绝
                </Button>
              </View> : null
          }
        </View>
    );
  };

  render() {
    const {arrRefreshing, contactsArr} = this.props;
    let newArr = contactsArr.reverse();
    return (
        <View style={styles.container}>
          <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start'}}>
            <MaterialIcons.Button name={'person-add-alt-1'}
                                  color={'#FF9800'}
                                  size={26}
                                  backgroundColor={'#ffffff'}
                                  onPress={() => {
                                    this.props.navigation.push('Search');
                                  }}>
              添加朋友
            </MaterialIcons.Button>
          </View>


          <FlatList
              style={{marginTop: 15}}
              data={newArr}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              ListFooterComponent={this.listFooterComponent}
              ListEmptyComponent={this.listEmptyComponent}
              keyExtractor={item => item.user.id}
              onRefresh={this._refreshData}
              refreshing={arrRefreshing}/>

          <Spinner
              visible={this.props.contactsLoading}
              textContent={'加载中...'}
              textStyle={styles.spinnerTextStyle}
          />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  contactsArr: state.contacts.contactsArr,
  arrRefreshing: state.contacts.arrRefreshing,
  myId: state.login.myId,
  contactsLoading: state.contacts.contactsLoading,
});

const mapDispatchToProps = dispatch => ({
  onChangeContactsArr: (myId, isShowLoading) => dispatch(actionCreators.onChangeContactsArr(myId, isShowLoading)),
  onAgreeOrIgnoreFriend: (isIgnore, friendId, callback) => dispatch(actionCreators.onAgreeOrIgnoreFriend(isIgnore, friendId, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  newFriendView: {
    paddingVertical: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  newFriendText: {
    color: '#000000',
    fontSize: 17,
    marginLeft: 15,
  },
  mt10: {
    marginTop: 10,
  },
  footView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footText: {
    fontSize: 15,
    color: '#999999',
  },
  emptyView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999999',
  },
  item: {
    paddingHorizontal: 9,
    elevation: 4,
    width: '100%',
    paddingVertical: 9,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  viewBottom: {
    width: 160,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  av: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  userInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  textTitle2: {
    fontSize: 14,
    marginLeft: 5,
  },
  status: {
    fontSize: 15,
    marginLeft: 7,
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    marginTop: 15,
  },
});
