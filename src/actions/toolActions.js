import { actionTypes } from '../utils/constants';

const addVoxel = (event, voxelOptions) => {
  // we should probably do some calculation stuff here and return an object with more specific information
  // so that we don't have to write the calculation in the reducer for every tool action we might have.
  return {
    type: actionTypes.ADD_VOXEL,
    event,
    voxelOptions
  }
};


const toolActions = {
  [actionTypes.ADD_VOXEL]: addVoxel
};

export default toolActions;
