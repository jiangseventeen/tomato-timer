import React, { useState, useEffect, useRef, useCallback } from "react";
import GhostButton from "./components/GhostButton";
import {SettingOutlined} from '@ant-design/icons'
import TimerSetting from "./components/TimerSetting";
import "./App.scss";

const TOMATO_TIME = 1500000;

const App = () => {
  const [restTime, setRestTime] = useState(TOMATO_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisibleSetting, setIsVisibleSetting] = useState(false);
  
  const timerRef = useRef(null);

  /**
   * 获取当前番茄钟的剩余时间
   * @param {Number} restTime 代表剩余时间的毫秒数
   */
  const getRestTime = useCallback((restTime) => {
    const _tmpDate = new Date(restTime);
    return (
      _tmpDate.getMinutes().toString().padStart(2, "0") +
      ":" +
      _tmpDate.getSeconds().toString().padStart(2, "0")
    );
  }, []);

  // 清除定时器的副作用
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 动态更新浏览器标签页标题
  useEffect(() => {
    const timeDisplay = getRestTime(restTime);
    let title = "番茄计时器";
    
    if (isStarted) {
      if (isPaused) {
        title = `⏸️ ${timeDisplay} - 番茄计时器 (已暂停)`;
      } else {
        title = `${timeDisplay} - 番茄计时器 (专注中)`;
      }
    } else {
      title = `${timeDisplay} - 番茄计时器`;
    }
    
    document.title = title;
  }, [restTime, isStarted, isPaused, getRestTime]);

  /**
   * 结束一个番茄钟
   */
  const finishTimer = useCallback(() => {
    setRestTime(TOMATO_TIME);
    setIsStarted(false);
    setIsPaused(false);
  }, []);

  /**
   * 开始定时器
   */
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsStarted(true);

    timerRef.current = setInterval(() => {
      setRestTime(prevRestTime => {
        const newRestTime = prevRestTime - 1000;
        if (newRestTime <= 0) {
          clearInterval(timerRef.current);
          // 使用 setTimeout 来避免在 setState 回调中调用其他 setState
          setTimeout(() => {
            finishTimer();
          }, 0);
          return TOMATO_TIME;
        }
        return newRestTime;
      });
    }, 1000);
  }, [finishTimer]);

  /**
   * 开始一个新的番茄钟
   */
  const restartTimer = useCallback(() => {
    setRestTime(TOMATO_TIME);
    setIsStarted(true);
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  /**
   * 暂停当前番茄钟
   */
  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
  }, []);

  /**
   * 继续番茄钟
   */
  const continueTimer = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  /**
   * 关闭设置面板
   */
  const handleCloseSetting = useCallback(() => {
    setIsVisibleSetting(false);
  }, []);

  /**
   * 打开设置面板
   */
  const handleOpenSetting = useCallback(() => {
    setIsVisibleSetting(true);
  }, []);

  return (
    <div className="App">
      <div className="App-Timer">
        <p className="counter">{getRestTime(restTime)}</p>
        <div className="timer-control">
          {isStarted ? (
            isPaused ? (
              <div>
                <GhostButton className="start" onClick={continueTimer}>
                  继续专注
                </GhostButton>
                <GhostButton className="restart" onClick={finishTimer}>
                  结束
                </GhostButton>
              </div>
            ) : (
              <GhostButton onClick={pauseTimer}>暂停</GhostButton>
            )
          ) : (
            <GhostButton onClick={startTimer} >
              开始专注
            </GhostButton>
          )}
        </div>
      </div>
      <SettingOutlined
        onClick={handleOpenSetting}
        className="icon-setting"
        type="setting"
      />
      <TimerSetting
        visible={isVisibleSetting}
        isPlay={!isPaused && isStarted}
        onClose={handleCloseSetting}
      />
    </div>
  );
};

export default App; 