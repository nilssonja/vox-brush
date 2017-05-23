import React from 'react';
import { connect } from 'react-redux';

const tools = [
  { name: "Add Voxel"},
  { name: "Select Color"},
  {name: "foo"},
  {name: "bar"},
  {name: "baz"}
];

export const Toolbar = (props) =>
  <a-plane width="0.5" height="0.15" depth="0.02" position="0 0.17 -0.35" rotation="-90 0 0" color="grey" opacity="0.3">
    {
      tools.map((tool, index) =>
        <a-plane
          position={`${calculatePosition(index, 0.1, 0.01, tools.length)} 0 0.02`}
          width="0.1"
          height="0.1">

        </a-plane>
      )
    }
  </a-plane>;


export default connect()(Toolbar);

const calculatePosition = (index, width, padding, length) =>
  ((index) * (width + padding)) - (((length-1) * (width+padding))/2);