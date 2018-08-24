import React, { Component } from 'react';
import './progressbar-react.css';

class ReactProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PERCENT: this.props.percent, //进度
      BAR_LEFT: 0, //进度条的百分比
      BTN_LEFT: 0 //拖动按钮的百分比
    }
    this.progressContainer = null;
    this.progressBtn = null;
    this.propgressInner = null;
    this.progressBtnWidth = 0;
    this.propgressContainerWidth = 0;
    this.color = this.props.color ? this.props.color : '#1890ff';
    this.seekTo = this.props.seekTo ? this.props.seekTo : ()=>{}
  }

  componentDidMount() {
    this.init();
    this.dragMove();
    this.clickMove();
  }
  
  //初始化
  init() {
    this.progressContainer = document.querySelector('#outer-progress');
    this.progressBtn = document.querySelector('#btn-progress');
    this.progressBtnWidth = this.progressBtn.offsetWidth;
    this.progressContainerWidth = this.progressContainer.offsetWidth;
  }

  //设置进度
  setPercent(L) {
    this.setState({
      PERCENT: Math.floor(Math.round(L * 100 / this.progressContainerWidth)), 
      BAR_LEFT: L
    }, () => {
      this.seekTo();
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
      let L = e.clientX - this.getOffsetLeft(this.progressContainer);
      if(L <= 0) {
        L = 0;
      }else if(L >= this.progressContainerWidth-this.progressBtnWidth) {
        L = this.progressContainerWidth-this.progressBtnWidth;
      } 
      this.setPercent(L);
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
    console.log(this.state.PERCENT)
    return (
      <div className="react-progress">
        <div id="outer-progress" className="react-outer-progress" >
          <span
            id='inner-progress'
            className="react-inner-progress"
            style={{
              width: `${this.state.PERCENT}%`,
              backgroundColor: this.color
            }}
          >
          </span>
          <span
              id='btn-progress'
              className="react-inner-progress-btn"
              style={{left: `${this.state.PERCENT}%`, marginLeft: this.state.PERCENT===100?'-6px':''}}
            >
              <span 
                className="react-inner-progress-btn-inner"
                style={{
                  backgroundColor: this.color
                }}
              ></span>
            </span>
        </div>
      </div>
    )
  }
}

export default ReactProgress;