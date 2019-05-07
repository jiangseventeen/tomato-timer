import React, { Component } from "react";
import GhostButton from "./components/GhostButton";
import { Icon } from "antd";
import TimerSetting from "./components/TimerSetting";
import "./App.scss";

const TOMATO_TIME = 1500000;

class App extends Component {
  state = {
    restTime: TOMATO_TIME,
    isStarted: false,
    isPaused: false,
    isVisibleSetting: false
  };

  componentDidMount() {
    // this.startTimer();
    // this.restartTimer();
  }

  startTimer = () => {
    if (this.Timer) {
      clearInterval(this.Timer);
    }
    this.setState({
      isStarted: true
    });
    this.Timer = setInterval(() => {
      let restTime = this.state.restTime - 1000;
      if (restTime <= 0) {
        this.finishTimer();
        clearInterval(this.Timer);
      } else {
        this.setState({
          restTime
        });
      }
    }, 1000);
  };

  /**
   * 开始一个新的番茄钟
   */
  restartTimer = () => {
    this.setState({
      restTime: TOMATO_TIME,
      isStarted: true,
      isPaused: false
    });
    this.startTimer();
  };

  /**
   * 暂停当前番茄钟
   */
  pauseTimer = () => {
    this.Timer && clearInterval(this.Timer);
    this.setState({
      isPaused: true
    });
  };

  /**
   * 结束一个番茄钟
   */
  finishTimer = () => {
    this.setState({
      restTime: TOMATO_TIME,
      isStarted: false,
      isPaused: false
    });
  };

  /**
   * 继续番茄钟
   */
  continueTimer = () => {
    this.setState({
      isPaused: false
    });
    this.startTimer();
  };

  /**
   * 获取当前番茄钟的剩余时间
   * @param {Number} restTime 代表剩余时间的毫秒数
   */
  getRestTime = restTime => {
    let _tmpDate = new Date(restTime);
    return (
      _tmpDate
        .getMinutes()
        .toString()
        .padStart(2, "0") +
      ":" +
      _tmpDate
        .getSeconds()
        .toString()
        .padStart(2, "0")
    );
  };

  /**
   * 关闭设置面板
   */
  handleCloseSetting = () => {
    this.setState({
      isVisibleSetting: false
    });
  };

  /**
   * 打开设置面板
   */
  handleOpenSetting = () => {
    this.setState({
      isVisibleSetting: true
    });
  };

  render() {
    let { restTime, isStarted, isPaused, isVisibleSetting } = this.state;

    return (
      <div className="App">
        <div className="App-Timer">
          <p className="counter">{this.getRestTime(restTime)}</p>
          <div className="timer-control">
            {isStarted ? (
              isPaused ? (
                <div>
                  <GhostButton className="start" onClick={this.continueTimer}>
                    继续专注
                  </GhostButton>
                  <GhostButton className="restart" onClick={this.finishTimer}>
                    结束
                  </GhostButton>
                </div>
              ) : (
                <GhostButton onClick={this.pauseTimer}>暂停</GhostButton>
              )
            ) : (
              <GhostButton onClick={this.startTimer} ghost>
                开始专注
              </GhostButton>
            )}
          </div>
        </div>
        <Icon
          onClick={this.handleOpenSetting}
          className="icon-setting"
          type="setting"
        />
        <Icon className="icon-statistics" type="ellipsis" />
        <TimerSetting
          visible={isVisibleSetting}
          isPlay={!isPaused && isStarted}
          onClose={this.handleCloseSetting}
        />
      </div>
    );
  }
}

export default App;
