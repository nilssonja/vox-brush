import React from 'react';
import { connect } from 'react-redux';
import toolActions from '../../actions/toolActions';
import 'aframe';

const Voxel = ( props ) =>
  <a-box
    { ...props }
    onClick={ (event) => props.toolAction(event, props, props.selectedTool) }
  />;

const mapStateToProps = ( state ) => {
  return {
    selectedTool: state.tools.selectedTool
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    toolAction: (event, voxelOptions, selectedTool) => dispatch(toolActions[selectedTool](event, voxelOptions))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Voxel);