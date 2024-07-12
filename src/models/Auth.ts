import { ModelUtenti } from "./Utenti";

export class ModelAuth {
    token: number;
    referenceKeyUtenti:ModelUtenti["primaryKeyUtenti"];
    primaryKeyAuth: number;
      constructor(referenceKeyUtenti:number) {
          this.primaryKeyAuth = Math.random();
          this.token= Math.random();
          this.referenceKeyUtenti= referenceKeyUtenti;
      }
  }