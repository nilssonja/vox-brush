import { actionTypes } from '../utils/constants';
import { set } from '../utils/objUtil';

const defaultVoxels = {
  at: {
    '-4': {
      0: {
        '-1': {
          color: 'red'
        },
        0: {
          color: 'green'
        },
        1: {
          color: 'blue'
        }
      }
    }
  }
};

export default function voxels(voxels = defaultVoxels, action) {
  switch(action.type) {
    case actionTypes.ADD_VOXEL:
      console.log(action.event.detail.intersection);
      return set(`at.${action.z}.${action.y}.${action.x}`, { ...voxels }, action.voxelOptions);
    case actionTypes.UPDATE_VOXEL:
      return set(`at.${action.z}.${action.y}.${action.x}`, { ...voxels }, action.voxelOptions);
    default:
      return voxels;
  }
}

export function getVoxels(voxels) { //have to do some crazy array stuff to get a flat array of voxels out of the state
  return [].concat(...Object.keys(voxels.at).map((layer) =>
      [].concat(...Object.keys(voxels.at[layer]).map((row) =>
        [].concat(...Object.keys(voxels.at[layer][row]).map((voxel) => ({
          ...voxels.at[layer][row][voxel],
          position: `${parseFloat(voxel)} ${parseFloat(row)} ${parseFloat(layer)}`
        })))))));
}