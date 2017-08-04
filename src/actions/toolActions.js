import { actionTypes } from '../utils/constants';
import { degToRad } from '../utils/utils';
import * as THREE from 'three';

const addVoxel = (event, voxelOptions, gridName) => {
  // we should probably do some calculation stuff here and return an object with more specific information
  // so that we don't have to write the calculation in the reducer for every tool action we might have.
  const normal = event.detail.intersection.face.normal.clone();
  // const center = event.detail.intersection.object.getWorldPosition().clone();
  let rotation = event.target.getAttribute('rotation');
  rotation = degToRad(rotation);
  const euler = new THREE.Euler(rotation.x, rotation.y, rotation.z, "XYZ");
  let quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(euler);
  normal.applyQuaternion(quaternion);
  const intersection = event.detail.intersection.point.clone();
  return {
    type: actionTypes.ADD_VOXEL,
    event,
    voxelOptions: { ...voxelOptions },
    gridName,
    position: intersection,
    normal
  }
};

const updateVoxel = (event, voxelOptions, gridName) => {
  const position = event.target.getAttribute('position');
  position.x -= 0.5;
  position.y -= 0.5;
  position.z -= 0.5;
  return {
    type: actionTypes.UPDATE_VOXEL,
    event,
    voxelOptions: { ...voxelOptions},
    gridName,
    position
  }
};

const updateVoxelOptions = (voxelOptions) => {
  return {
    type: actionTypes.UPDATE_VOXEL_OPTIONS,
    voxelOptions: { ...voxelOptions }
  }
};


const toolActions = {
  [actionTypes.ADD_VOXEL]: addVoxel,
  [actionTypes.UPDATE_VOXEL]: updateVoxel,
  [actionTypes.UPDATE_VOXEL_OPTIONS]: updateVoxelOptions
};

export default toolActions;