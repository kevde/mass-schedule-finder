 export default class Criteria {
   databaseName: string;
   fetchAll: boolean;

   constructor(databaseName: string) {
     this.databaseName = databaseName;
     this.fetchAll = true;
   }
 }