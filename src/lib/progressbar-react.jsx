import React, { Component } from 'react';
import './progressbar-react.css';

class ReactProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      L: 0
    }
  }

  componentDidMount() {
    var $progressBtn = this.refs.progressBtn;
    var $progressBar = this.refs.progressBar;
    var outerWidth = $progressBar.offsetWidth;
    var $line = this.refs.progressInner;

    $progressBtn.onmousedown = (ev) => {
      var ev = ev || window.event;
      var disX = ev.clientX - $progressBtn.offsetLeft;

      document.onmousemove = (ev) => {
        var ev = ev || window.event;
        var L = ev.clientX - disX;
        if(L <= 0){
          L = 0;
        } else if(L >= $progressBar.offsetWidth - $progressBtn.offsetWidth){
          L = $progressBar.offsetWidth - $progressBtn.offsetWidth;
        }
        this.setState({  
          L: Math.ceil(L*100/outerWidth)
        },() => {
          $progressBtn.style.left =  this.state.L+ '%';
          $line.style.width = this.state.L + '%';
        });
      }
      document.onmouseup = () => {
        document.onmousemove = null;
      };
      return false;
    }
  }

  render() {
    return (
      <div className="react-progress">
        <div ref='progressBar' className="react-outer-progress">
          <div 
            ref='progressInner' 
            style={{width: this.state.L + '%'}}
            className="react-inner-progress"
          ></div>
          <div
            ref='progressBtn' 
            style={{left: this.state.L + '%'}} 
            className="react-inner-progress-btn"
          ></div> 
        </div>
      </div>
    )
  }
}

export default ReactProgress;