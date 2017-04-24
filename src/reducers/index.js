import { combineReducers } from 'redux';
import tools from './toolsReducer';
import voxels from './voxelReducer';

const reducers = combineReducers({
  tools,
  voxels
});

export default reducers;
