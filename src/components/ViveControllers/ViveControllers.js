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
        <a-entity id="rightViveController" vive-controls="hand: right" ref={this.registerController.bind(this)}>
          <a-box></a-box>
        </a-entity>
        <a-entity id="leftViveController" vive-controls="hand: left"></a-entity>
      </a-entity>
    );
  }
}

export default ViveControllers;