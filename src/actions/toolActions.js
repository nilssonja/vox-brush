import { actionTypes } from '../utils/constants';
import * as THREE from 'three';

const addVoxel = (event, voxelOptions) => {
  // we should probably do some calculation stuff here and return an object with more specific information
  // so that we don't have to write the calculation in the reducer for every tool action we might have.
  const normal = event.detail.intersection.face.normal;
  const point = event.detail.intersection.point;
  const newPos = getAxialVector(point, normal);
  console.log(newPos);
  return {
    type: actionTypes.ADD_VOXEL,
    event,
    voxelOptions,
    x: Math.floor(newPos.x),
    y: Math.floor(newPos.y),
    z: Math.floor(newPos.z)
  }
};

const updateVoxel = (event, voxelOptions) => {
  const pos = event.target.getAttribute('position');
  return {
    type: actionTypes.UPDATE_VOXEL,
    event,
    voxelOptions: { ...voxelOptions, color: 'blue' },
    x: Math.floor(pos.x),
    y: Math.floor(pos.y),
    z: Math.floor(pos.z)
  }
};


const toolActions = {
  [actionTypes.ADD_VOXEL]: addVoxel,
  [actionTypes.UPDATE_VOXEL]: updateVoxel
};

export default toolActions;

var getAxialVector = function(targetPos, normal){
  var center = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
  var normal = new THREE.Vector3(normal.x, normal.y, normal.z);
  center.addVectors(center, normal);
  return { x:center.x, y:center.y, z:center.z };
};