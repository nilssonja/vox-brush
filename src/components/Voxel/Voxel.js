import React from 'react';
import { connect } from 'react-redux';
import toolActions from '../../actions/toolActions';
import 'aframe';

const Voxel = ( {voxelOptions, selectedTool, isClickable, toolAction, gridName} ) =>
  isClickable ?
    <a-box
      { ...voxelOptions }
      onClick={ (event) => toolAction(event, voxelOptions, selectedTool, gridName) }
    /> : <a-box { ...voxelOptions } />;


const mapStateToProps = ( state ) => {
  return {
    selectedTool: state.tools.selectedTool
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    toolAction: (event, voxelOptions, selectedTool, gridName) =>
      dispatch(toolActions[selectedTool](event, voxelOptions, gridName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Voxel);