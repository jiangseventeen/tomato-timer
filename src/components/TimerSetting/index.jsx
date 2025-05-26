import React, { useState, useEffect, useRef, useCallback } from "react";
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

import "./index.scss";

const TimerSetting = ({ visible, isPlay, onClose }) => {
  const [whiteNoise, setWhiteNoise] = useState([
    { type: "无", img: none, isActive: true, src: '' },
    { type: "海滩", img: beach, src: s_beach },
    { type: "雨夜", img: rainyNight, src: s_rainyNight },
    { type: "教室", img: classroom, src: s_classroom },
    { type: "滴答", img: tick, src: s_ticking }
  ]);

  const audioRef = useRef(null);

  // 初始化音频对象
  useEffect(() => {
    audioRef.current = new Audio();
    
    // 清理函数
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 根据播放状态控制音频
  useEffect(() => {
    if (isPlay) {
      playNoise();
    } else {
      pauseNoise();
    }
  }, [isPlay]);

  /**
   * 播放白噪声
   */
  const playNoise = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  }, []);

  /**
   * 暂停白噪声
   */
  const pauseNoise = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  /**
   * 切换白噪声
   */
  const switchNoise = useCallback((src) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    pauseNoise();
    audioRef.current.src = src;
    if (isPlay) {
      playNoise();
    }
  }, [isPlay, playNoise, pauseNoise]);

  /**
   * 选择一种白噪声
   */
  const handleChooseNoise = useCallback((index) => {
    const newWhiteNoise = whiteNoise.map((n, i) => ({
      ...n,
      isActive: i === index
    }));
    
    setWhiteNoise(newWhiteNoise);
    switchNoise(newWhiteNoise[index].src);
  }, [whiteNoise, switchNoise]);

  return (
    <Drawer
      title="设置番茄钟"
      placement="right"
      width={330}
      className="timer-setting"
      open={visible}
      onClose={onClose}
    >
      <h5 className="setting-title">白噪声</h5>
      <ul className="select-list">
        {whiteNoise.map((n, index) => (
          <li
            key={index}
            className={n.isActive ? "select-item active" : "select-item"}
            onClick={() => handleChooseNoise(index)}
          >
            <img alt={n.type} src={n.img} />
            {n.type}
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default TimerSetting;
