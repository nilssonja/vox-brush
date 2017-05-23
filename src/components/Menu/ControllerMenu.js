import React from 'react';
import { connect } from 'react-redux'
import ColorPicker from '../ColorPicker/ColorPicker';
import Toolbar from '../Toolbar/Toolbar';
import 'aframe';

const ControllerMenu = (props) =>
  <a-entity>
    <a-box scale="0.2 0.2 0.2" color={props.selectedColor}></a-box>
    <Toolbar/>
    <a-plane scale="0.35 0.35 0.02" position="0 0.17 0" rotation="-90 0 0" color="grey" opacity="0.3"><ColorPicker/></a-plane>
  </a-entity>;

const mapStateToProps = (state) => {
    return {
      selectedColor: state.voxels.voxelOptions.color
    }
  };


export default connect(mapStateToProps)(ControllerMenu);