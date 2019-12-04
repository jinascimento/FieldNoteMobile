import Realm from 'realm';

import AnnotationSchema from '../schemas/AnnotationSchema';

export default function getRealm() {
  return Realm.open({
    schema: [AnnotationSchema],
    schemaVersion: 1,
  });
}
