import Criteria from './criterias/Criteria';

export default interface IDatabase {
  connect(databaseName: string): any;
  query(criteria: Criteria): any;
}