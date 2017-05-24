import React from 'react';
import { connect } from 'react-redux';
import { actionTypes } from '../../utils/constants';
import { selectTool } from '../../actions/menuActions';
import 'aframe';

const calculatePosition = (index, width, padding, length) =>
((index) * (width + padding)) - (((length-1) * (width+padding))/2);

const tools = [
  { name: actionTypes.ADD_VOXEL },
  { name: actionTypes.UPDATE_VOXEL },
  {name: "bar"},
  {name: "baz"}
];

export const Toolbar = (props) =>
  <a-plane width="0.5" height="0.15" depth="0.02" position="0 0.17 -0.35" rotation="-90 0 0" color="grey" opacity="0.3">
    {
      tools.map((tool, index) =>
        <a-plane
          key={index}
          position={ `${calculatePosition(index, 0.1, 0.01, tools.length)} 0 0.02` }
          width="0.1"
          height="0.1"
          onClick={ () => props.selectTool(tool.name) }
          opacity={ props.selectedTool === tool.name ? '0.5' : '0.2' }
        >
        </a-plane>
      )
    }
  </a-plane>;

const mapStateToProps = (state) => {
  return {
    selectedTool: state.tools.selectedTool
  };
};

const mapDispatchToProps = {
  selectTool
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);