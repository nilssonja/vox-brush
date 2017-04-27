import React, { Component } from 'react';
import 'aframe';
import 'aframe-controller-cursor-component';

class ViveControllers extends Component {

  registerController(element) {
    if(element){
      element.addEventListener('menudown', () => {
        element.setAttribute('controller-cursor', '');
      })
    }
  }

  render() {
    return (
      <a-entity>
        <a-entity vive-controls="hand: right" ref={this.registerController.bind(this)}></a-entity>
        <a-entity vive-controls="hand: left"></a-entity>
        <a-entity oculus-touch-controls="hand: left"></a-entity>
        <a-entity oculus-touch-controls="hand: right" ref={this.registerController.bind(this)}></a-entity>
      </a-entity>
    );
  }
}

export default ViveControllers;