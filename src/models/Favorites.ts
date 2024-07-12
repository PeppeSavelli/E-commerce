import { ModelAnnunci } from "./Annunci";
import { ModelUtenti } from "./Utenti";

export class ModelFavorites  {
    primaryKeyFavorites:number;
    referenceKeyUtenti:ModelUtenti["primaryKeyUtenti"];
    referenceKeyAnnunci:ModelAnnunci["primaryKeyAnnunci"];
      constructor(referenceKeyUtenti:number, referenceKeyAnnunci:number) {
          this.primaryKeyFavorites = Math.random();
          this.referenceKeyUtenti= referenceKeyUtenti;
          this.referenceKeyAnnunci=referenceKeyAnnunci;
      }
  }