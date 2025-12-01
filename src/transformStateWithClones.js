'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = {};

  for (const key in state) {
    currentState[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = {};

    for (const key in currentState) {
      newState[key] = currentState[key];
    }

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      const extraData = action.extraData;

      for (const key in extraData) {
        newState[key] = extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      for (let j = 0; j < keysToRemove.length; j++) {
        delete newState[keysToRemove[j]];
      }
    }

    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
