import {DocAPI} from "./DocAPI";
import { ModelAnnunci } from "./models/Annunci";
import { ModelAuth } from "./models/Auth";
import { ModelDevice } from "./models/Device";
import { ModelFavorites } from "./models/Favorites";
import { ModelRecensioni } from "./models/Recensioni";
import { ModelReports } from "./models/Reports";
import { ModelUtenti } from "./models/Utenti";

export class E_commerce {
    users:Array<ModelUtenti> = [];
    ads:Array<ModelAnnunci>= [];
    reviews:Array<ModelRecensioni> = [];
    auth:Array<ModelAuth>= [];
    reports:Array<ModelReports>= [];
    favorites:Array<ModelFavorites>= [];
  id_device: Array<ModelDevice> = [];
  getUserbyUserID: any;
    static register: any;

    register(email: string, password: string) {
        const userFound = this.users.find(function(user){
            if(user.email === email) return true;
            return false;
        });
        if(!!userFound){
        console.log("Utente già registrato!");
        return false;
        }
            else{
                const newUser = new ModelUtenti(email, password);
                this.users = [...this.users, newUser];
                console.log("Registrazione effettuata con successo");
                return true;
            }
          
    }

    login(email: string, password: string, id_device: string, nomeDevice: string ) {
       const userFound: any= this.users.find(function (user) {
            if(email === user.email && password === user.password) return true;
            return false;
        });
        if(!!userFound){
          console.log("Utente già registrato!");
            const newAuth = new ModelAuth(userFound.primaryKeyUtenti);
            this.auth = [...this.auth, newAuth]
            return newAuth.token;
        }
        else console.log("Utente non registrato");

            
                if(userFound.id_device.lenght >= 2)
                    console.log("dispositivi massimi raggiunti");
               else {
                const newDevice = new ModelDevice(userFound.primaryKeyUtenti, nomeDevice, id_device);
                this.id_device = [...this.id_device, newDevice];
               } 
                
                
        }
    logout(token: number) {
          const authFound = this.auth.find(auth => auth.token === token);
          if (authFound) {
              this.auth = this.auth.filter(auth => auth.token !== token); 
              console.log("Logout effettuato con successo");
              return true;
          } else {
              console.log("token non valido");
              return false;
          }
      }
    listUsers(){
      return this.users;
      }
    createAd( title: string,description: string,category: string, status: string, price: string, photo: string,address:string,sold:string, phone: string,referenceKeyUtenti: number,token: number) {
        //crea un'annuncio
        const authFound  = this.getAuthByToken(token);
      
          if (!authFound ) {
            console.log("token non valido!");
            return false;
          } else {
            const ad = new ModelAnnunci(title, description, category, status, price, photo, address, sold, phone, referenceKeyUtenti);
            this.ads = [...this.ads, ad];
            console.log('Annuncio creato con successo!');
            return true;
          }
      }

    updateAd(primaryKeyAnnunci:number, title:string, description:string, category:string, status:string, price:string,photo:string, address: string, sold: string, phone:string, token:number) {
        // Verifica il token
        const auth = this.getAuthByToken(token);

        if (!auth) {
            console.log("token non valido!");
            return false;
        } else {
            // Mappare l'array ads e aggiornare l'annuncio con la chiave primaria corrispondente
            let adUpdated = false;
            this.ads = this.ads.map(ad => {
                if (ad.primaryKeyAnnunci === primaryKeyAnnunci) {
                    adUpdated = true;
                    return { ...ad, title, description, category, status, price, photo, address, sold, phone };
                } else {
                    return ad;
                }
            });
          }
          return true;
    }

    deleteAd(primaryKeyAnnunci:number, token:number){
        //Controlla il token, trova l'annuncio tramite l'id ed elimina l'annuncio
        const auth = this.getAuthByToken(token);

        if(!auth){
            console.log("token non valido!");
           }else{
            this.ads= this.ads.filter(function(ad){
                if(ad.primaryKeyAnnunci == primaryKeyAnnunci) return false;
                return true;
            });
           }
    }

    listAd(){
    return this.ads;
    }

    createReview(title:string, description:string, rating:string, referenceKeyAnnunci:number, token:number){
        //Controlla il token, traghetta l'annuncio e legge i dati
        const auth = this.getAuthByToken(token);
        const newReviews = new ModelRecensioni(referenceKeyAnnunci, title, description, rating, token);

        if(!auth){
            console.log("token non valido!");
           }else{
            this.reviews= [...this.reviews, newReviews];
            console.log("Reviews creata correttamente");
           }
    }

    updateReview(primaryKeyRecensioni:number, title:string, description:string, rating:string, token:number){
        const auth = this.getAuthByToken(token);
       
        if(!auth){
         console.log("token non valido!");
        }else {
         this.reviews= this.reviews.map(function (reviews){
             if(reviews.primaryKeyRecensioni == primaryKeyRecensioni){
             return {...reviews, title: title, description:description, rating:rating};
             }
             return {...reviews};
         });
        }
     }

    deleteReview(primaryKeyRecensioni:number, token:number) {
        const auth = this.getAuthByToken(token);

        if(!auth){
            console.log("token non valido!");
           }else{
            this.reviews= this.reviews.filter(function(reviews){
                if(reviews.primaryKeyRecensioni == primaryKeyRecensioni) return false;
                return true;
            });
           }
    }

    deleteAccount(primaryKeyUtenti:number, token:number) {
        const auth = this.getAuthByToken(token);

        if(!auth){
            console.log("token non valido!");
           }else{
            this.users= this.users.filter(function(user){
                if(user.primaryKeyUtenti == primaryKeyUtenti) return false;
                return true;
            });
           }
    }
    
    getAuthByToken(token:number){
      return this.auth.find((auth)=>auth.token === token);
    }

    addFavorite(token: number, referencesKeyAnnunci:number, referenceKeyUtenti:number) {
    const userAuth = this.getAuthByToken(token);
    if(!referenceKeyUtenti)console.log("token non valido!");
    else{
        const newFavorite = new ModelFavorites(referenceKeyUtenti, referencesKeyAnnunci);
    }
    
    const newFavorites = new ModelFavorites(
        referenceKeyUtenti,
        referencesKeyAnnunci
    );
    this.favorites = [...this.favorites,newFavorites];
    console.log("Annuncio aggiunto ai preferiti");
    }

    editUsername(newUsername:string, token:number) {
        // modifica username
        const userAuth = this.getAuthByToken(token);
        if(!!userAuth){
        if(!userAuth.referenceKeyUtenti)console.log("token non valido!");
            else{
                this.users= this.users.map(function (users){
                    if(users.primaryKeyUtenti == userAuth.referenceKeyUtenti){
                    return {...users, username:newUsername};
                    }
                    return {...users};
                });
             }
            } else {
              console.log("Utente non valido!");
            }
    }
      markSold(primaryKeyAnnunci:number, token:number, referenceKeyUtenti: number) {
        //metti annuncio come venduto
        const auth = this.getAuthByToken(token);
        if(!!auth)
        {
          function OnFind(ad: ModelAnnunci)
          {
            if(ad.primaryKeyAnnunci == primaryKeyAnnunci){
              return true;
            }else{
            return false;
            }
          }
          const adFound = this.ads.find(OnFind);
          if(!!adFound)
          {
              if(adFound.referenceKeyUtenti == auth.referenceKeyUtenti)
              {
                if(!adFound.referenceKeyUtenti){
                this.ads.map(function(ad){
                      if(ad.primaryKeyAnnunci == primaryKeyAnnunci){
                        return {...ad, referenceKeyUtenti: referenceKeyUtenti};
                      }
                        return {...ad};
                      });
                      console.log("Annuncio modificato");
                }
                else{
                  console.log("Annuncio già venduto");
                }                     
              }else{
                console.log("Operazione non autorizzata.");
              }
          }else{
            console.log("Annuncio invalido");
          }
        }else{
          console.log("token non valido");
        }
    }
      adDetails(primaryKeyAd:number) {
        //dettagli dell'annuncio 

      }
    
      removeFavourite(referenceKeyAnnunci:number, token:number) {
        // rimuovi dai preferiti un preferito
        const auth = this.getAuthByToken(token);

        if(!auth){
            console.log("token non valido!");
           }else{
            this.favorites= this.favorites.filter(function(ad){
                if(ad.referenceKeyAnnunci == referenceKeyAnnunci) return false;
                return true;
            });
            console.log("Annuncio rimosso dai preferiti!");
           }
    }
      
      getPhoneNumber(token:number, referenceKeyAd:number){
        // rivela il numero di telefono dell'annuncio
      }

      registerDevice(id_device:string, token:number, name:string){
        const auth = this.getAuthByToken(token);
        const user = this.getUserbyUserID(id_device);
        user.devices = [...user.devices, new ModelDevice(user.primaryKeyDevice, name, id_device)];
      }
  /*getUserbyUserID(referenceKeyUtenti: number) {
    throw new Error("Method not implemented.");
  }

    getAuthByUserID(){ 
    return this.auth.find(function (auth) {
    {   
        if(auth.referenceKeyUtenti == primaryKeyUtenti){
            return true;
        }
        return false;
    }});
    }
    getUserbyUserID(referenceKeyUtenti:number){
      function onFind(user: { primaryKey: number; })
        {
            if(user.primaryKey == referenceKeyUtenti)
            {
                return true;
            }
            return false;
        }
        return this.users.find(OnFind);  
    }
    
  }*/
    }

  const apis = {
      login: new DocAPI("/api/auth/login", "POST", false),
      logout: new DocAPI("/api/auth/logout/{referenceKeyUser}", "DELETE", true),
      register: new DocAPI("/api/users/register", "POST", false),
      createAd: new DocAPI("/api/ads", "POST", true),
      listAd: new DocAPI("/api/ads", "GET", false),
      deleteAccount: new DocAPI("/api/users/{primaryKeyUser}", "DELETE", true),
      listByCategory: new DocAPI("/api/annunci?category=", "GET", true),
      adDetail: new DocAPI("/api/ads/{primaryKeyAnnunci}", "GET", true),
      updateAd: new DocAPI("/api/ads/{primaryKeyAnnunci}", "PUT", true),
      deleteAd: new DocAPI("/api/ads/{primaryKeyAnnunci}", "DELETE", true),
      listReviews: new DocAPI("/api/recensioni", "GET", false),
      updateReview: new DocAPI("/api/recensioni/{primaryKeyRecensioni}", "GET", true),
      createReview: new DocAPI("/api/recensioni", "POST", true),
      deleteReview: new DocAPI("/api/recensioni/{primaryKeyRecensioni}", "DELETE", true),
      listUserFavorites: new DocAPI("/api/users/{referenceKeyUtenti}/favorites", "GET", false),
      createFavorite: new DocAPI("/api/favorites", "POST", true),
      removeFavorite: new DocAPI("/api/favorites/{primaryKeyFavorite}", "DELETE", true),
      listUsers: new DocAPI("/api/users", "GET", true),
      user: new DocAPI("/api/users/{primaryKeyUser}", "GET", true),
      UserDevices: new DocAPI("/api/devices", "GET", true),
      device: new DocAPI("/api/devices/{id_device}", "GET", true),
  }