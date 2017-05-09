import { actionTypes } from '../utils/constants';
import * as THREE from 'three';

const defaultTools = {
  selectedTool: actionTypes.ADD_VOXEL,
  selectedColor: new THREE.Color()
};

export default function tools(tools = defaultTools, action) {
  switch(action.type) {
    case actionTypes.SELECT_TOOL:
      return {
        selectedTool: action.selectedTool
      };
    default:
      return tools;
  }
}