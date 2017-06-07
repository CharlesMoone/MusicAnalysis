import * as at from 'constants/actionsTypes';


export function someActions(result) {
  return dispath => {
    dispath({
      result,
      type: at.SOMEACTIONS,
    });
  };
}