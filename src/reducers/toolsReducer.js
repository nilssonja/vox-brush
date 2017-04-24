import { actionTypes } from '../utils/constants';

const defaultTools = {
  selectedTool: actionTypes.ADD_VOXEL
};

export default function tools(tools = defaultTools, action) {
  switch(action.type) {
    default:
      return tools;
  }
}