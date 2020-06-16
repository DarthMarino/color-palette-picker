import React from 'react';
import {Button} from './Button';

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: [0,100, 100] }
    this.handleClick = this.handleClick.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
  }
  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }
  hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;     
    var g = (bigint >> 8) & 255;     
    var b = bigint & 255;      
    return [r,g,b]
  }
  handleColorPicker(pick) {
    this.setState({color:this.hexToRgb(pick.target.value.split('#')[1])})
  }
  handleClick() {
    this.setState({color: this.chooseColor()})
  }
  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>
          Your color is {this.formatColor(this.state.color)}.
        </h1>
        <button onClick={this.handleClick} light={this.isLight()}>Randomize Color</button>
        <input onChange={this.handleColorPicker} type="color"></input>
      </div>
    );
  }
}

export default Random