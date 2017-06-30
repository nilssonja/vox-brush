import { actionTypes } from '../utils/constants';
import { set, get } from '../utils/objUtil';
import * as THREE from 'three';

const defaultVoxels = {
  voxelOptions: {color: new THREE.Color()},
  selectedGrid: "default",
  grids: {
    default: {
      position: {x:0, y:0, z:0},
      rotation: {x:0, y:0, z:0},
      scale: {x:1, y:1, z:1},
      voxels: {
        '-4': {
          '0': {
            '-1': {
              color: 'red'
            },
            '0': {
              color: 'green'
            },
            '1': {
              color: 'blue'
            }
          }
        }
      }
    }
  }
};

export default function voxels(voxels = defaultVoxels, action) {
  const {x, y, z} = getGridCell(action.position, voxels.grids[action.gridName]);
  const path = `grids.${action.gridName}.voxels.${z}.${y}.${x}`;
  switch(action.type) {
    case actionTypes.ADD_VOXEL:
      return set(path, { ...voxels }, voxels.voxelOptions);
    case actionTypes.UPDATE_VOXEL:
      let voxel = get(path, { ...voxels });
      return set(path, { ...voxels }, {...voxel, ...voxels.voxelOptions});
    case actionTypes.UPDATE_VOXEL_OPTIONS:
      return set(`voxelOptions`, { ...voxels }, { ...voxels.voxelOptions, ...action.voxelOptions });
    default:
      return voxels;
  }
}

export function getVoxels(voxels) { //have to do some crazy array stuff to get a flat array of voxels out of the state
  return [].concat(...Object.keys(voxels).map((layer) =>
      [].concat(...Object.keys(voxels[layer]).map((row) =>
        [].concat(...Object.keys(voxels[layer][row]).map((voxel) => ({
          ...voxels[layer][row][voxel],
          position: `${parseFloat(voxel)} ${parseFloat(row)} ${parseFloat(layer)}`
        })))))));
}

const getGridCell = ( position={x:0, y:0, z:0}, grid ) => {
  position = new THREE.Vector3(position.x, position.y, position.z);
  if(grid) {
    let gridRotation = new THREE.Euler( grid.rotation.x, grid.rotation.y, grid.rotation.z, 'XYZ' );
    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(gridRotation);


    position.subVectors(position, grid.position);
    position.applyQuaternion(quaternion.inverse());
    position.divide(grid.scale);
    position.floor();
  }

  console.log(position);

  return {
    x: position.x,
    y: position.y,
    z: position.z
  };
};

const snap = val => val > 0 ? Math.floor(val) : Math.ceil(val);
