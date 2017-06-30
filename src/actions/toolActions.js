import { actionTypes } from '../utils/constants';
import * as THREE from 'three';

const addVoxel = (event, voxelOptions, gridName) => {
  // we should probably do some calculation stuff here and return an object with more specific information
  // so that we don't have to write the calculation in the reducer for every tool action we might have.
  const normal = event.detail.intersection.face.normal.clone();
  const center = event.detail.intersection.object.getWorldPosition().clone();
  const intersection = event.detail.intersection.point.clone();
  const newPos = getAxialVector(center, normal, intersection);
  console.log(intersection);
  return {
    type: actionTypes.ADD_VOXEL,
    event,
    voxelOptions: { ...voxelOptions },
    gridName,
    position: intersection
  }
};

const updateVoxel = (event, voxelOptions, gridName) => {
  const position = event.target.getAttribute('position');
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

const getAxialVector = function(center, normal){
  center.addVectors(center, normal);
  return { x:center.x, y:center.y, z:center.z };
};

// const getAxialVector = function(center, normal, intersection, voxelSize=1){
//   console.log('intersection: ', intersection);
//   console.log('normal: ', normal);
//   intersection.add(normal.multiplyScalar(voxelSize/2));
//   intersection.divideScalar(voxelSize);
//   intersection.floor();
//   intersection.multiplyScalar(voxelSize * 1.5);
//
//   console.log('newpos: ', intersection);
//
//   return {
//     x:`${intersection.x}`,
//     y:`${intersection.y}`,
//     z:`${intersection.z}`
//   };
// };