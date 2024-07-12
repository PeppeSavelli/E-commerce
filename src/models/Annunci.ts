import { ModelUtenti } from "./Utenti";

export class ModelAnnunci  {
    primaryKeyAnnunci:number;
    data: Date;
    title:string;
    description:string;
    category:string;
    status:string;
    price:string;
    photo:string;
    address:string;
    sold:string;
    phone:string;
    referenceKeyUtenti: ModelUtenti["primaryKeyUtenti"];
  static primaryKeyAnnunci: number;
  constructor( title:string, description:string, category:string, status:string, price:string, photo:string, address:string, sold:string, phone:string, referenceKeyUtenti:number) {
        this.primaryKeyAnnunci= Math.random();
        this.data= new Date();
        this.title= title;
        this.description= description;
        this.category= category;
        this.status= status;
        this.price= price;
        this.photo= photo;
        this.address= address;
        this.sold= sold;
        this.phone= phone;
        this.referenceKeyUtenti= referenceKeyUtenti;
    }
}