import React, { Component } from 'react';
import './progressbar-react.css';

class ReactProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PERCENT: this.props.percent
    }
    this.progressContainer = null; //外层进度条容器
    this.progressBtn = null; //拖动按钮
    this.propgressInner = null; //内层进度条容器
    this.progressBtnWidth = 0; //拖动按钮宽度
    this.propgressContainerWidth = 0; //外层进度条容器宽度
    this.color = this.props.color ? this.props.color : '#1890ff'; //设置进度条颜色
    this.seekTo = this.props.seekTo ? this.props.seekTo : ()=>{}; //设置进度条跳转后触发事件
  }

  componentDidMount() {
    this.init();
    this.dragMove();
    this.clickMove();
  }

  componentWillReceiveProps(nextProps) {
    let { percent } = nextProps;
    this.setState({ PERCENT: percent });
  }
  
  //初始化
  init() {
    this.progressContainer = document.querySelector('#outer-progress');
    this.progressBtn = document.querySelector('#btn-progress');
    this.progressBtnWidth = this.progressBtn.offsetWidth;
    this.progressContainerWidth = this.progressContainer.offsetWidth;
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
    this.progressContainer.onmousedown = (e) => {
      e.stopPropagation();
      let L = e.clientX - this.getOffsetLeft(this.progressContainer);
      if(L <= 0) {
        L = 0;
      }else if(L >= this.progressContainerWidth) {
        L = this.progressContainerWidth;
      } 
      this.setPercent(L);
    }
  }

  //设置进度
  setPercent(L) {
    this.setState({
      PERCENT: (L * 100 / this.progressContainerWidth), 
    }, () => {
      this.seekTo(this.state.PERCENT);
    });
  }

  //获取offsetLeft
  getOffsetLeft(target) {
    let left = 0;
    while(target.offsetParent) {
      left += target.offsetLeft;
      target = target.offsetParent;
    }
    return left;
  }


  render() {
    return (
      <div className="react-progress">
        <div id="outer-progress" className="react-outer-progress" >
          <div
            id='inner-progress'
            className="react-inner-progress"
            style={{ width: `${this.state.PERCENT}%`, backgroundColor: this.color }}
          >
            <span id='btn-progress' className="react-inner-progress-btn">
              <span className="react-inner-progress-btn-inner" style={{ backgroundColor: this.color }}></span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default ReactProgress;