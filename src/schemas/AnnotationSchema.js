export default class AnnotationSchema {
  static schema = {
    name: 'Annotation',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      noted_at: 'date',
      description: 'string',
      longitude: 'float',
      latitude: 'float',
    },
  };
}
