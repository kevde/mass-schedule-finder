import Criteria from './Criteria';

export default class CriteriaFactory {

  createBasic(collectionName: string) {
    return new Criteria(collectionName);
  }
}