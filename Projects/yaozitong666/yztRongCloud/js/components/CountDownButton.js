import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  ViewPropTypes,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

/**
 * 倒计时组件
 * import CountDownButton from '../components/CountDownButton'
 * 使用示例
 * <CountDownButton
 *    style={{width: 120, marginRight: 10}}
 *    textStyle={{color: '#42a5f5'}}
 *    timerCount={60}
 *    timerTitle={'获取验证码'}
 *    enable={true}
 *    onClick={(shouldStartCounting) => {
 *                   // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
 *                   // requestSucc随机模拟发送验证码成功或失败
 *                   const requestSucc = Math.random() + 0.5 > 1;
 *                   shouldStartCounting(requestSucc)
 *                 }}
 *    timerEnd={() => {
 *                   console.log('倒计时结束')
 *                 }}/>
 */

export default class CountDownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerCount: this.props.timerCount || 60,
      timerTitle: this.props.timerTitle || '获取验证码',
      counting: false,
      selfEnable: true,
    };
    this._shouldStartCountting = this._shouldStartCountting.bind(this);
    this._countDownAction = this._countDownAction.bind(this);
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    onClick: PropTypes.func,
    disableColor: PropTypes.string,
    timerTitle: PropTypes.string,
    enable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    timerEnd: PropTypes.func,
    timerActiveTitle: PropTypes.array,
    isShooting: PropTypes.bool,
    executeFunc: PropTypes.func,
  };

  _countDownAction() {
    const codeTime = this.state.timerCount;
    const {timerActiveTitle, timerTitle, isShooting} = this.props;
    const now = Date.now();
    const overTimeStamp = now + codeTime * 1000 + 100;
    /*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() => {
      /* 切换到后台不受影响*/
      const nowStamp = Date.now();
      if (nowStamp >= overTimeStamp) {
        /* 倒计时结束*/
        this.interval && clearInterval(this.interval);
        this.setState({
          timerCount: codeTime,
          timerTitle: timerTitle || '获取验证码',
          counting: false,
          selfEnable: true,
        });
        if (this.props.timerEnd) {
          this.props.timerEnd();
        }
      } else {
        const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10);
        let activeTitle = `重新获取(${leftTime}s)`;
        if (timerActiveTitle) {
          if (timerActiveTitle.length > 1) {
            activeTitle = timerActiveTitle[0] + leftTime + timerActiveTitle[1];
          } else if (timerActiveTitle.length > 0) {
            activeTitle = timerActiveTitle[0] + leftTime;
          }
        }
        if (isShooting && leftTime === 0) {
          this.setState({
            timerCount: leftTime,
            timerTitle: '开始',
          });
        } else {
          this.setState({
            timerCount: leftTime,
            timerTitle: activeTitle,
          });
        }
      }
    }, 1000);
  }

  /**
   * shouldStartCountting：回调函数，接受一个Bool类型的参数
   * shouldStartCountting(true)，开始倒计，但按钮仍不可点击，直到倒计时结束
   * shouldStartCountting(false)， 按钮恢复可点击状态，但不会开始倒计时
   * @param shouldStart
   * @private
   */
  _shouldStartCountting(shouldStart) {
    if (this.state.counting) {
      return;
    }
    if (shouldStart) {
      this._countDownAction();
      this.setState({counting: true, selfEnable: false});
    } else {
      this.setState({selfEnable: true});
    }
  }

  componentDidMount() {
    const {executeFunc} = this.props;
    executeFunc && executeFunc(this._shouldStartCountting);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startManually = () => {
    const {enable} = this.props;
    const {counting, selfEnable} = this.state;
    if (!counting && enable && selfEnable) {
      this.setState({selfEnable: false});
      this._shouldStartCountting(true);
    }
  };

  render() {
    const {onClick, style, textStyle, enable, disableColor} = this.props;
    const {counting, timerTitle, selfEnable} = this.state;
    return (
        <View style={[{width: 120, height: 44}, style]}>
          <TouchableRipple
              disabled={counting}
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => {
                if (!counting && enable && selfEnable) {
                  this.setState({selfEnable: false});
                  onClick(this._shouldStartCountting);
                }
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          >
            <Text
                style={[{fontSize: 16}, textStyle, {color: ((!counting && enable && selfEnable) ? (textStyle ? textStyle.color : 'blue') : disableColor || 'gray')}]}>{timerTitle}</Text>
          </TouchableRipple>
        </View>
    );
  }
}
