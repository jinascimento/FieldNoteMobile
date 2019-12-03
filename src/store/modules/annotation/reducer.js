import produce from 'immer';

const INITIAL_STATE = {
  annotations: [],
};

export default function annotation(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@annotation/ANNOTATION_REQUEST':
        break;
      case '@annotation/ANNOTATION_REQUEST_SUCCESS':
        draft.annotations = action.payload.annotations;
        break;
      default:
        return state;
    }
  });
}
