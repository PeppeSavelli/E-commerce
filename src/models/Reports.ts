import { ModelAnnunci } from "./Annunci";
import { ModelUtenti } from "./Utenti";

export class ModelReports {
    primaryKeyReports:number;
    referenceKeyUtenti:ModelUtenti["primaryKeyUtenti"];
    referenceKeyAnnunci:ModelAnnunci["primaryKeyAnnunci"];
    description:string;
    status:string;
      constructor(referenceKeyUtenti:number, referenceKeyAnnunci:number, description:string, status:string) {
          this.primaryKeyReports= Math.random();
          this.referenceKeyUtenti=referenceKeyUtenti;
          this.referenceKeyAnnunci = referenceKeyAnnunci;
          this.description = description;
          this.status= status;
      }
  }