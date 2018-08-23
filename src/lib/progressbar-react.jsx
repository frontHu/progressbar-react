import React, { Component } from 'react';
import './progressbar-react.css';

class ReactProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PERCENT: 0, //进度
      BAR_LEFT: 0, //进度条的百分比
      BTN_LEFT: 0 //拖动按钮的百分比
    }
    this.progressContainer = null;
    this.progressBtn = null;
    this.propgressInner = null;
    this.progressBtnWidth = 0;
    this.propgressContainerWidth = 0;
  }

  componentDidMount() {
    this.init();
    this.dragMove();
    // this.clickMove();
  }
  
  //初始化
  init() {
    this.progressContainer = document.querySelector('#outer-progress');
    this.progressBtn = document.querySelector('#btn-progress');
    this.progressBtnWidth = this.progressBtn.offsetWidth;
    this.progressContainerWidth = this.progressContainer.offsetWidth;
  }

  //设置进度条
  setPercent(PERCENT) {
    this.setState({
      PERCENT, 
      BAR_LEFT: `${Math.floor(Math.round(PERCENT * 100 / this.progressContainerWidth))}%`,
      BTN_LEFT: Math.floor(Math.round(PERCENT - this.progressBtnWidth / 2))
    });
  }

  //拖动进度条
  dragMove() {
    this.progressBtn.onmousedown = (ev) => {
      ev.stopPropagation();
      var ev = ev || window.event;
      var disX = ev.clientX - this.progressBtn.offsetLeft;

      document.onmousemove = (ev) => {
        ev.stopPropagation();
        var ev = ev || window.event;
        var L = ev.clientX - disX;
        if (L <= 0) {
          L = 0;
        } else if (L >= this.progressContainerWidth) {
          L = this.progressContainerWidth;
        }
        this.setPercent(L);
      }

      document.onmouseup = (ev) => {
        ev.stopPropagation();
        document.onmousemove = null;
      }

      return false;
    }
  }

  //点击进度条
  clickMove() {
    this.progressContainer.onclick = (e) => {
      e.stopPropagation();
      let PERCENT = e.clientX - this.getOffsetLeft(this.progressContainer);
      if(PERCENT <= 0) {
        PERCENT = 0;
      }else if(PERCENT >= this.progressContainerWidth-this.progressBtnWidth) {
        PERCENT = this.progressContainerWidth-this.progressBtnWidth;
      }
      this.setPercent(PERCENT);
    }
  }

  //获取offsetLeft
  getOffsetLeft(target) {
    let left = 0;
    if(target.offsetParent) {
      left += target.offsetLeft;
      target = target.offsetParent;
    }
    return left;
  }

  render() {
    console.log(this.state.BAR_LEFT, this.state.PERCENT, this.state.PERCENT)
    return (
      <div className="react-progress">
        <div id="outer-progress" className="react-outer-progress" >
          <span
            id='inner-progress'
            className="react-inner-progress"
            style={{ width: this.state.BAR_LEFT}}
          >
          </span>
          <span
              id='btn-progress'
              className="react-inner-progress-btn"
              style={{ left: this.state.BAR_LEFT}}
            ></span>
        </div>
      </div>
    )
  }
}

export default ReactProgress;