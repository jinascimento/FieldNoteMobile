export default class AnnotationSchema {
  static schema = {
    name: 'Annotation',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      description: 'string',
      longitude: 'float',
      latitude: 'float',
    },
  };
}
