import { ModelUtenti } from "./Utenti";

export class ModelDevice{
    referenceKeyUtenti:ModelUtenti["primaryKeyUtenti"];
    primaryKeyDevice:number;
    nome:string;
    id_device:string;
      constructor(referenceKeyUtenti:number, nome:string, id_device:string){
          this.referenceKeyUtenti = referenceKeyUtenti;
          this.primaryKeyDevice= Math.random();
          this.nome= nome;
          this.id_device = id_device;
      }
  }