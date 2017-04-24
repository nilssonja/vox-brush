import { actionTypes } from '../utils/constants';

const defaultVoxels = {
  at: {
    '-4': {
      0.5: {
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
      console.log(action);
      return voxels;
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