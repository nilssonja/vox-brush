import React, { Component } from 'react';
import * as THREE from 'three';
import 'aframe';
import { getCanvasPosition, getColorFromCanvas } from '../../utils/utils';

const getColor = ["#f00","#0f0","#00f","#fff"];

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: new THREE.Color()
    }
  }
  registerHueTool(element) {
    if(element) {
      this.hueCanvas = element;
      let context = this.hueCanvas.getContext('2d');

      let imgData = context.createImageData(this.hueCanvas.width, this.hueCanvas.height);
      let color = new THREE.Color();
      for (let i = 0; i < imgData.data.length; i += 4) {
        let x = Math.floor((i % (this.hueCanvas.width * 4)) / 4);
        let y = Math.floor(i / (this.hueCanvas.width * 4));
        color.setHSL(x / this.hueCanvas.width, 1, y / this.hueCanvas.height);
        imgData.data[i] = color.r * 255;
        imgData.data[i + 1] = color.g * 255;
        imgData.data[i + 2] = color.b * 255;
        imgData.data[i + 3] = 255;
      }

      context.putImageData(imgData, 0, 0);
    }
  }

  registerSaturationTool(element) {
    if(element) {
      this.saturationCanvas = element;
      let context = this.saturationCanvas.getContext('2d');
      let {width, height} = this.saturationCanvas;

      let color = new THREE.Color();
      let hsl = this.state.selectedColor.getHSL();
      let imgData = context.createImageData(width, height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        let y = Math.floor(i / (width * 4));
        color.setHSL(hsl.h, y / height, hsl.l);
        imgData.data[i] = color.r * 255;
        imgData.data[i + 1] = color.g * 255;
        imgData.data[i + 2] = color.b * 255;
        imgData.data[i + 3] = 255;
      }

      context.putImageData(imgData, 0, 0);
    }
  }

  selectHue(event) {
    let {x, y} = getCanvasPosition(
      event.detail.intersection.point,
      event.detail.intersection.object,
      this.hueCanvas
    );
    this.setState({selectedColor: getColorFromCanvas(x, y, this.hueCanvas)});
  };

  selectSaturation(event) {
    let {x, y} = getCanvasPosition(
      event.detail.intersection.point,
      event.detail.intersection.object,
      this.saturationCanvas
    );
    this.setState({selectedColor: getColorFromCanvas(x, y, this.saturationCanvas)});
  }

  render() {
    return (
      <a-entity>
        <a-plane width="0.7" height="0.5" position="-0.1 0 0.1" material="shader: flat; src: #hueCanvas" onClick={this.selectHue.bind(this)}/>
        <a-plane width="0.1" height="0.5" position="0.4 0 0.1" material="shader: flat; src: #saturationCanvas" onClick={this.selectSaturation.bind(this)}/>
        <a-plane
          width="0.5"
          height="0.1"
          position="0 0.4 0.1"
          material={`shader: flat; color: #${this.state.selectedColor.getHexString()}`}
        />
        <canvas
          style={{display: "none"}}
          id="hueCanvas"
          ref={this.registerHueTool.bind(this)}
          width="256"
          height="256"
        />
        <canvas
          style={{display: "none"}}
          id="saturationCanvas"
          ref={this.registerSaturationTool.bind(this)}
        />
      </a-entity>
    )
  }
}

export default ColorPicker;
