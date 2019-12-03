export function annotationRequest() {
  return {
    type: '@annotation/ANNOTATION_REQUEST',
  };
}

export function annotationRequestSuccess(annotations) {
  return {
    type: '@annotation/ANNOTATION_REQUEST_SUCCESS',
    payload: { annotations },
  };
}
