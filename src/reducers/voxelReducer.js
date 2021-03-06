import { actionTypes } from '../utils/constants';
import { set, get } from '../utils/objUtil';
import { degToRad } from '../utils/utils';
import * as THREE from 'three';

const defaultVoxels = {
  voxelOptions: {color: new THREE.Color()},
  selectedGrid: "default",
  grids: {
    default: {
      position: {x:0, y:0, z:0},
      rotation: {x:0, y:0, z:0},
      scale: {x:0.5, y:0.5, z:0.5},
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
  let path;
  switch(action.type) {
    case actionTypes.ADD_VOXEL:
      const {x, y, z} = getGridCell({position: action.position, grid: voxels.grids[action.gridName], normal: action.normal});
      path = `grids.${action.gridName}.voxels.${z}.${y}.${x}`;
      return set(path, { ...voxels }, voxels.voxelOptions);
    case actionTypes.UPDATE_VOXEL:
      path = `grids.${action.gridName}.voxels.${action.position.z}.${action.position.y}.${action.position.x}`;
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
          position: `${parseFloat(voxel) + 0.5} ${parseFloat(row) + 0.5} ${parseFloat(layer) + 0.5}`
        })))))));
}

const getGridCell = ( {position={x:0, y:0, z:0}, grid, normal={x:0, y:0, z:0}} ) => {
  position = new THREE.Vector3(position.x, position.y, position.z);
  normal = new THREE.Vector3(normal.x, normal.y, normal.z);
  if(grid) {
    let gridRads = degToRad(grid.rotation);
    let gridRotation = new THREE.Euler( gridRads.x, gridRads.y, gridRads.z, 'XYZ' );
    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(gridRotation);
    let halfScale = new THREE.Vector3(grid.scale.x, grid.scale.y, grid.scale.z).multiplyScalar(0.5);
    normal.multiply(halfScale);

    position.addVectors(position, normal);
    position.subVectors(position, grid.position);
    position.applyQuaternion(quaternion.inverse());
    position.divide(grid.scale);
    position.floor();
  }

  return {
    x: position.x,
    y: position.y,
    z: position.z
  };
};
