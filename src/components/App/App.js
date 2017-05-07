import React, { Component } from 'react';
import Voxel from '../Voxel/Voxel';
import { getVoxels } from '../../reducers/voxelReducer';
import toolActions from '../../actions/toolActions';
import TrackedControllers from '../TrackedControllers/TrackedControllers';
import { connect } from 'react-redux';
import 'aframe';
import './App.css';

class App extends Component {
  clickHandler(event) {
    this.props.toolAction(event, {}, this.props.selectedTool);
  }

  render() {
    return (
      <a-scene style={{position: 'absolute', height: '100%', width: '100%'}} inspector stats>
        <TrackedControllers/>
        <a-sky color="#999"/>
        <a-plane color="black" onClick={this.clickHandler.bind(this)} rotation="-90 0 0" scale="100 100 0"/>
        {
          getVoxels(this.props.voxels).map((voxelOptions, index) => <Voxel { ...voxelOptions } key={ index } />)
        }
        <a-camera cursor >
          <a-entity
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.001; radiusOuter: 0.01"
            material="color: black; shader: flat"
          />
        </a-camera>
      </a-scene>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    voxels: state.voxels,
    selectedTool: state.tools.selectedTool
  };
};

const mapDispatchToProps = ( dispatch, props ) => {
  return {
    toolAction: (event, voxelOptions, selectedTool) => dispatch(toolActions[selectedTool](event, voxelOptions))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
