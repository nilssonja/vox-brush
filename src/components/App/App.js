import React, { Component } from 'react';
import Voxel from '../Voxel/Voxel';
import 'aframe';
import './App.css';

class App extends Component {
  clickHandler(event) {
    console.log('You clicked the box!', event);
  }

  render() {
    return (
      <a-scene stats>
        <a-sky color="#FFF"/>
        <a-plane color="black" onClick={this.clickHandler.bind(this)} rotation="-90 0 0" scale="100 100 0"/>
        <Voxel />
        <a-camera cursor
                  position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                  material="color: black; shader: flat">
        </a-camera>
      </a-scene>
    );
  }
}

export default App;
