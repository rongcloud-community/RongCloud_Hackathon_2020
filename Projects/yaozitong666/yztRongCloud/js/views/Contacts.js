import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actionCreators from '../action';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

class Contacts extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setBackgroundColor('#eff0f1');
      StatusBar.setBarStyle('dark-content');
    });
    this._refreshData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toNewFriendList = () => {
    this.props.navigation.push('NewFriendList');
  };

  //刷新数据
  _refreshData = () => {
    const {onChangeContactFriendList, userId} = this.props;
    onChangeContactFriendList(userId);
  };

  _getImmutableItem = (data, index) => {
    return data.get(index);
  };

  _getImmutableItemCount = (data) => {
    return data.size;
  };

  _separator = () => {
    return <View style={{height: 6}}/>;
  };

  _footer = () => {
    return (
        <View style={styles.bottomfoot}>
          {
            this.props.contactFriendList.size !== 0 ? <Text style={styles.footText}>- 我是有底线的 -</Text> : null
          }
        </View>
    );
  };

  _listEmpty = () => {
    return (
        <View style={styles.noListView}>
          <Text style={styles.noListText}>这里啥也没有，快去添加好友吧</Text>
        </View>
    );
  };

  toChatRoom = (item) => {
    this.props.navigation.push('ChatRoom', {
      userName: item.get('user').get('nickname'),
      targetId: item.get('user').get('id'),
    });
  };

  _renderItem = ({item, index}) => {
    let LeftContent = props => <MaterialCommunityIcons name={'badge-account'} size={26} color={'#27918e'}/>;
    return (
        <View style={{paddingHorizontal: 15}}>
          <TouchableOpacity onPress={() => this.toChatRoom(item)}>
            <Card>
              <Card.Title title={item.get('user').get('nickname')} left={LeftContent}/>
            </Card>
          </TouchableOpacity>
        </View>
    );
  };

  render() {
    const {contactFriendListRefreshing, contactFriendList} = this.props;
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.toNewFriendList}>
            <View style={styles.newFriendView}>
              <AntDesign name={'adduser'} color={'#f5776c'} size={26}/>
              <Text style={styles.newFriendText}>新的朋友</Text>
            </View>
          </TouchableOpacity>

          <VirtualizedList
              style={styles.mt10}
              data={contactFriendList}
              renderItem={this._renderItem}
              getItem={this._getImmutableItem}
              getItemCount={this._getImmutableItemCount}
              ItemSeparatorComponent={this._separator}
              ListFooterComponent={this._footer}
              ListEmptyComponent={this._listEmpty}
              keyExtractor={item => item.get('user').get('id')}
              onRefresh={this._refreshData}
              refreshing={contactFriendListRefreshing}/>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  contactFriendList: state.getIn(['ContactsState', 'contactFriendList']),
  contactFriendListRefreshing: state.getIn(['ContactsState', 'contactFriendListRefreshing']),
  userId: state.getIn(['LoginState', 'userId']),
});

const mapDispatchToProps = dispatch => ({
  onChangeContactFriendList: (userId) => dispatch(actionCreators.onChangeContactFriendList(userId)),
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
  noListView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noListText: {
    fontSize: 18,
    color: '#999999',
  },
});
