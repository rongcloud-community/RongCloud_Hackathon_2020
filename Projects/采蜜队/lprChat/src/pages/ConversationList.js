import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import actionCreators from '../redux/action';
import {connect} from 'react-redux';
import * as IMClient from 'react-native-rongcloud-imlib/src/index';

class ConversationList extends Component {
  componentDidMount() {
    this._refreshData(true);

    this._navListener = this.props.navigation.addListener('willFocus', () => {
      this._refreshData(false);
    });

    this.listener = IMClient.addReceiveMessageListener(message => {
      const {content} = message.message;
      if (content.content && content.content.length > 999) {
        content.content = content.content.substr(0, 100) + '...';
      }

      const {onChangeMessage, allMessageObj, userId} = this.props;
      console.log(userId, message);
      onChangeMessage(allMessageObj, message);
      this._refreshData(false);
    });
  }

  componentWillUnmount() {
    this.listener.remove();
    this._navListener && this._navListener.remove();
  }

  _refreshData = (isShowLoading = true) => {
    const {onChangeConversationsList, userId} = this.props;
    onChangeConversationsList(userId, isShowLoading);
  };

  itemSeparatorComponent = () => {
    return <View style={{height: 6}}/>;
  };

  listFooterComponent = () => {
    return (
        <View style={styles.bottomfoot}>
          {
            this.props.conversationList.length !== 0 ? <Text style={styles.footText}>- 我是有底线的 -</Text> : null
          }
        </View>
    );
  };

  listEmptyComponent = () => {
    return (
        <View style={styles.testview}>
          <Text style={styles.testtext}>这里啥也没有，快去找好友聊天吧</Text>
        </View>
    );
  };

  toRoom = (item) => {
    this.props.navigation.push('Room', {
      username: item.displayName,
      targetId: item.targetId,
    });
  };

  _renderItem = ({item, index}) => {
    return (
        <TouchableOpacity onPress={() => this.toRoom(item)}>
          <View style={styles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/av.png')} style={styles.av}/>
              <View style={{marginLeft: 8}}>
                <Text style={styles.displayName}>{item.displayName}</Text>
                <View style={styles.textView2}>
                  <Text style={styles.text}>{item.senderUserName} : </Text>
                  <Text style={styles.text}>{item.latestMessage}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sendtime}>{item.sentTime}</Text>
          </View>
        </TouchableOpacity>
    );
  };

  render() {
    const {conversationListRefreshing, conversationList} = this.props;
    return (
        <View style={styles.container}>
          <FlatList
              style={styles.flatview}
              data={conversationList}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this.itemSeparatorComponent}
              ListFooterComponent={this.listFooterComponent}
              ListEmptyComponent={this.listEmptyComponent}
              keyExtractor={item => item.sentTime + Math.random()}
              onRefresh={this._refreshData}
              refreshing={conversationListRefreshing}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  conversationListRefreshing: state.conversationList.conversationListRefreshing,
  conversationList: state.conversationList.conversationList,
  allMessageObj: state.conversationList.allMessageObj,
  userId: state.login.userId,
});

const mapDispatchToProps = dispatch => ({
  onChangeConversationsList: (userId, isShowLoading) => dispatch(actionCreators.onChangeConversationsList(userId, isShowLoading)),
  onChangeMessage: (allMessageObj, message) => dispatch(actionCreators.onChangeMessage(allMessageObj, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatview: {
    marginTop: 10,
  },
  bottomfoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footText: {
    fontSize: 15,
    color: '#999999',
  },
  testview: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testtext: {
    fontSize: 18,
    color: '#999999',
  },
  av: {
    height: 50,
    width: 50,
  },
  textView2: {flexDirection: 'row', alignItems: 'center'},
  displayName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#3b3838',
  },
  sendtime: {
    alignSelf: 'flex-end',
  },
  item: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginHorizontal: 9,
    paddingVertical: 8,
    elevation: 3,
  },
});
