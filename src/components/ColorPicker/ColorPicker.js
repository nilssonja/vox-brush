import React, { Component } from 'react';
import * as THREE from 'three';
import 'aframe';

class ColorPicker extends Component {
  registerHueTool(element) {
    if(element) {
      this.canvas = element;
      let context = this.canvas.getContext('2d');

      let imgData = context.createImageData(this.canvas.width, this.canvas.height);
      let color = new THREE.Color();
      for (let i = 0; i < imgData.data.length; i += 4) {
        let x = Math.floor((i % (this.canvas.width * 4)) / 4);
        let y = Math.floor(i / (this.canvas.width * 4));
        color.setHSL(x / this.canvas.width, 1, y / this.canvas.height);
        imgData.data[i] = color.r * 255;
        imgData.data[i + 1] = color.g * 255;
        imgData.data[i + 2] = color.b * 255;
        imgData.data[i + 3] = 255;
      }

      context.putImageData(imgData, 0, 0);
    }
  }

  registerSaturationTool(element) {
    //more stuff goes here
  }

  selectHue(event) {
    let intersectionPoint = event.detail.intersection.point;
    let objectPosition = event.detail.intersection.object.getWorldPosition();
    let objectScale = event.detail.intersection.object.getWorldScale();
    console.log(event.detail);
    console.log(objectPosition, objectScale);
  };

  render() {
    return (
      <a-entity>
        <a-plane width="0.7" height="0.5" position="-0.1 0 0.1" material="shader: flat; src: #hueCanvas" onClick={this.selectHue.bind(this)}/>
        <a-plane width="0.1" height="0.5" position="0.4 0 0.1" material="shader: flat; src: #hueCanvas" onClick={this.selectHue.bind(this)}/>
        {/*<a-plane material="shader: flat; src: #saturationCanvas"/>*/}
        <canvas style={{display: "none"}} id="hueCanvas" ref={this.registerHueTool.bind(this)}/>
        <canvas style={{display: "none"}} id="saturationCanvas" ref={this.registerSaturationTool.bind(this)}/>
      </a-entity>
    )
  }
}

export default ColorPicker;