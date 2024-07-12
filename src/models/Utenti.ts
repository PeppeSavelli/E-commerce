export class ModelUtenti {
    id_device:[];
    primaryKeyUtenti:number;
    username: string;
    email:string;
    password:string;
      constructor(email:string, password:string) {
          this.id_device = [];
          this.primaryKeyUtenti = Math.random();
          this.username = email.split('@')[0];
          this.email= email;
          this.password= password;
      }
  } 