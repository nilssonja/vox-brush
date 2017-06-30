import React, { Component } from 'react';
import toolActions from '../../actions/toolActions';
import TrackedControllers from '../TrackedControllers/TrackedControllers';
import Grid from '../Grid/Grid';
import { connect } from 'react-redux';
import 'aframe';
import './App.css';

class App extends Component {
  clickHandler(event) {
    this.props.toolAction(event, {}, this.props.selectedTool, this.props.selectedGrid);
  }

  render() {
    return (
      <a-scene style={{position: 'absolute', height: '100%', width: '100%'}} inspector stats>
        <TrackedControllers/>
        <a-sky color="#999"/>
        <a-plane color="black" onClick={this.clickHandler.bind(this)} position="0 -0.5 0" rotation="-90 0 0" scale="100 100 0"/>
        {
          Object.keys(this.props.grids)
            .map( gridName => ({ gridName, grid: this.props.grids[gridName] }))
            .map(({ gridName, grid }, index) =>
            <Grid
              key={ index }
              voxels={ grid.voxels }
              isSelected={ gridName === this.props.selectedGrid }
              position={ grid.position }
              rotation={ grid.rotation }
              scale={ grid.scale }
              gridName={ gridName }
            />
          )
        }
        <a-camera position="0 -0.5 0" cursor >
          <a-entity
            position="0 0 -0.1"
            geometry="primitive: ring; radiusInner: 0.001; radiusOuter: 0.002"
            material="color: black; shader: flat"
          />
        </a-camera>
      </a-scene>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    grids: state.voxels.grids,
    selectedGrid: state.voxels.selectedGrid,
    selectedTool: state.tools.selectedTool
  };
};

const mapDispatchToProps = ( dispatch, props ) => {
  return {
    toolAction: (event, voxelOptions, selectedTool, gridName) => dispatch(toolActions[selectedTool](event, voxelOptions, gridName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
