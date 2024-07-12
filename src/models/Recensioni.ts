import { ModelAnnunci } from "./Annunci";
import { ModelUtenti } from "./Utenti";

export class ModelRecensioni {
    referenceKeyUtenti: ModelUtenti["primaryKeyUtenti"];
    title:string;
    description:string;
    rating:string;
    data: Date;
    referenceKeyAnnunci: ModelAnnunci["primaryKeyAnnunci"];
    primaryKeyRecensioni: number;
    constructor(referenceKeyUtenti:number, title:string, description:string, rating:string, referenceKeyAnnunci:number) {
        this.primaryKeyRecensioni= Math.random();
        this.referenceKeyUtenti= referenceKeyUtenti;
        this.title= title;
        this.description= description;
        this.rating= rating;
        this.data= new Date();
        this.referenceKeyAnnunci= referenceKeyAnnunci;
    }
}