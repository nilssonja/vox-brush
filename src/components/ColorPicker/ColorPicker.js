import React, { Component } from 'react';
import * as THREE from 'three';
import 'aframe';
import { connect } from 'react-redux';
import menuActions from '../../actions/menuActions';
import toolActions from '../../actions/toolActions';
import { actionTypes } from '../../utils/constants';
import { getCanvasPosition, getColorFromCanvas } from '../../utils/utils';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAction: props.menuAction,
      selectedColor: props.selectedColor ? props.selectedColor : new THREE.Color()
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
    this.state.menuAction(event, actionTypes.UPDATE_VOXEL);
    let selectedColor = getColorFromCanvas(x, y, this.hueCanvas);
    this.setState({selectedColor});
    this.props.changeColor(selectedColor);
  };

  selectSaturation(event) {
    let {x, y} = getCanvasPosition(
      event.detail.intersection.point,
      event.detail.intersection.object,
      this.saturationCanvas
    );
    let selectedColor = getColorFromCanvas(x, y, this.saturationCanvas);
    this.setState({selectedColor});
    this.props.changeColor(selectedColor);
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
          width="128"
          height="128"
        />
      </a-entity>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    selectedColor: state.tools.selectedColor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menuAction: (event, selectedTool) => {
      dispatch(menuActions[actionTypes.SELECT_TOOL](event, selectedTool))
    },
    changeColor: (selectedColor) => {
      dispatch(toolActions[actionTypes.UPDATE_VOXEL_OPTIONS]({
        color: `#${selectedColor.getHexString()}`
      }))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);