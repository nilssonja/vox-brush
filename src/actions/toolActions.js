import { actionTypes } from '../utils/constants';
import * as THREE from 'three';

const addVoxel = (event, voxelOptions) => {
  // we should probably do some calculation stuff here and return an object with more specific information
  // so that we don't have to write the calculation in the reducer for every tool action we might have.
  const normal = event.detail.intersection.face.normal;
  const point = event.detail.intersection.object.getWorldPosition();
  const newPos = getAxialVector(point, normal);
  return {
    type: actionTypes.ADD_VOXEL,
    event,
    voxelOptions: { ...voxelOptions },
    x: newPos.x,
    y: newPos.y,
    z: newPos.z
  }
};

const updateVoxel = (event, voxelOptions) => {
  const pos = event.target.getAttribute('position');
  return {
    type: actionTypes.UPDATE_VOXEL,
    event,
    voxelOptions: { ...voxelOptions},
    x: pos.x,
    y: pos.y,
    z: pos.z
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

const getAxialVector = function(targetPos, normal){
  let center = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
  center.addVectors(center, normal);
  return { x:center.x, y:center.y, z:center.z };
};