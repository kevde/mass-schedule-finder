 import * as NoSQL from 'nosql';
 import * as Q from 'q';
 import IDatabase from './IDatabase';
 import Criteria from './criterias/Criteria';

 export default class NoSqlDatabase implements IDatabase {
   connect(databaseName: string) {
     return NoSQL.load(`${__dirname}/../../resources/database/${databaseName}.nosql`);
   }

   query(criteria: Criteria) {
     const connection = this.connect(criteria.databaseName);
     const deferred = Q.defer();
     connection.find().make((builder) => {
       builder.callback((err, response) => (err) ? deferred.reject(err) : deferred.resolve(response))
     });
     return deferred.promise;
   }

   save(criteria: Criteria, entityObject: any) {
     const connection = this.connect(criteria.databaseName);
     const deferred = Q.defer();
     connection.insert(entityObject).callback((err) => (err) ? deferred.reject(err) : deferred.resolve(entityObject));
     return deferred.promise;
   }
 }