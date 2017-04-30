import React, { Component } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import 'aframe';

const ControllerMenu = () => {
  return(<a-entity>
    <a-plane scale="0.35 0.35 0.02" position="0 0.17 0" rotation="-90 0 0"
             text="width: 2; align: center; color: black; value: Left"><ColorPicker/></a-plane>
    <a-plane scale="0.35 0.35 0.02" position="0 -0.17 0" rotation="90 0 0"
             text="width: 2; align: center; color: black; value: Right"><ColorPicker/></a-plane>
    <a-plane scale="0.35 0.35 0.02" position="0.17 0 0" rotation="0 90 0"
             text="width: 2; align: center; color: black; value: Top"><ColorPicker/></a-plane>
    <a-plane scale="0.35 0.35 0.02" position="-0.17 0 0" rotation="0 -90 0"
             text="width: 2; align: center; color: black; value: Bottom"><ColorPicker/></a-plane>
    <a-plane scale="0.35 0.35 0.02" position="0 0 0.17" rotation="0 0 0"
             text="width: 2; align: center; color: black; value: Front"><ColorPicker/></a-plane>
    <a-plane scale="0.35 0.35 0.02" position="0 0 -0.17" rotation="-180 0 0"
             text="width: 2; align: center; color: black; value: Back"><ColorPicker/></a-plane>
  </a-entity>)
};


export default ControllerMenu;