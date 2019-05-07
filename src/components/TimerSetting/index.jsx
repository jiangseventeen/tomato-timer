import React, { Component } from "react";
import { Drawer } from "antd";

// images
import none from "../../assets/images/none.png";
import beach from "../../assets/images/beach.png";
import classroom from "../../assets/images/classroom.png";
import rainyNight from "../../assets/images/rainy-night.png";
import tick from "../../assets/images/tick.png";

// sounds
import s_rainyNight from '../../assets/sound/rainy-night.m4a';
import s_ticking from '../../assets/sound/ticking.mp3';
import s_classroom from '../../assets/sound/classroom.mp3';
import s_beach from '../../assets/sound/beach.mp3';

import "antd/lib/drawer/style/css";
import "./index.scss";


class TimerSetting extends Component {
  state = {
    whiteNoise: [
      { type: "无", img: none, isActive: true, src: '' },
      { type: "海滩", img: beach, src: s_beach },
      { type: "雨夜", img: rainyNight, src: s_rainyNight },
      { type: "教室", img: classroom, src: s_classroom },
      { type: "滴答", img: tick, src: s_ticking }
    ]
  };

  componentDidMount () {
    this.audio = new Audio();
  }

  componentDidUpdate () {
    this.props.isPlay ? this.playNoise() : this.pauseNoise();
  }

  /**
   * 选择一种白噪声
   */
  handleChooseNoise = (index) => {
    let whiteNoise = this.state.whiteNoise.map(n => {
      n.isActive = false;
      return n;
    });
    whiteNoise[index].isActive = true;
    this.setState({
      whiteNoise
    });
    this.switchNoise(whiteNoise[index].src);
  };

  /**
   * 切换白噪声
   */
  switchNoise = src => {
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.pauseNoise();
    this.audio.src = src;
    this.playNoise();
  }

  /**
   * 播放白噪声
   */
  playNoise = () => {
    this.audio && this.audio.play();
  }

  /**
   * 暂停白噪声
   */
  pauseNoise = () => {
    this.audio && this.audio.pause();
  }

  render() {
    let { whiteNoise } = this.state;
    return (
      <Drawer
        title="设置番茄钟"
        placement="right"
        width={330}
        className="timer-setting"
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <h5 className="setting-title">白噪声</h5>
        <ul className="select-list">
          {whiteNoise.map((n, index) => (
            <li
              key={index}
              className={n.isActive ? "select-item active" : "select-item"}
              onClick={() => this.handleChooseNoise(index)}
            >
              <img alt={n.type} src={n.img} />
              {n.type}
            </li>
          ))}
        </ul>
      </Drawer>
    );
  }
}

export default TimerSetting;
