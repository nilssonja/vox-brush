import React from 'react';
import Voxel from '../Voxel/Voxel';
import {getVoxels} from '../../reducers/voxelReducer';
import { stringifyVector } from '../../utils/utils';
import 'aframe';

const grid = ({voxels, position={x:0, y:0, z:0}, rotation={x:0, y:0, z:0}, scale={x:1, y:1, z:1}, isSelected, gridName}) => {
  return(
    <a-entity
      position={ stringifyVector(position) }
      rotation={ stringifyVector(rotation) }
      scale={ stringifyVector(scale) }
    >
      {
        getVoxels(voxels).map((voxelOptions, index) =>
          <Voxel voxelOptions={ voxelOptions } key={ index } isClickable={ isSelected } gridName={ gridName } />
        )
      }
    </a-entity>
  )
};

export default grid;