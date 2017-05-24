import { actionTypes } from '../utils/constants';

export const selectTool = (selectedTool) => {
  return{
    type: actionTypes.SELECT_TOOL,
    selectedTool: selectedTool
  }
};

const menuActions = {
  [actionTypes.SELECT_TOOL]: selectTool
};

export default menuActions;