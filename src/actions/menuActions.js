import { actionTypes } from '../utils/constants';

const selectTool = (event, selectedTool) => {
  return{
    type: actionTypes.SELECT_TOOL,
    selectedTool: selectedTool,
    event
  }
};

const menuActions = {
  [actionTypes.SELECT_TOOL]: selectTool
};

export default menuActions;