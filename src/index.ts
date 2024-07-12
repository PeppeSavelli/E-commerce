import express, { Request, Response } from "express";
import { E_commerce } from "./App";

const app2 = new E_commerce();
const app = express();
app.use(express.json());


const routerApi = express.Router();
const routerUsers = express.Router();

app.get("/users", function (req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Token is required" });
    else return res.status(200).json([]);
});

app.get("/", function(req: Request, res: Response){
    return res.sendFile(__dirname + "/index.html");
});

app.post("/api/users/register", function(req: Request, res: Response){
    if (!req.body.email) return res.status(400).json({ message: "Missing mail!" });
    if (!req.body.password) return res.status(400).json({ message: "Missing password!" });
    const success = app2.register(req.body.email, req.body.password);
    if (success) return res.status(200).json("Registrazione avvenuta con successo!");
    return res.status(400).json("Utente già registrato");
});
app.post("/api/auth/login", function(req: Request, res: Response){
    if (!req.body.email) return res.status(400).json({ message: "Missing mail!" });
    if (!req.body.password) return res.status(400).json({ message: "Missing password!" });
    const result = app2.login(req.body.email, req.body.password, req.body.id_device, req.body.nomeDevice);
    if (!result) return res.status(400).json("Login fallito");
    return res.status(200).json({ message: "Login effettuato con successo!", token: result });
});
app.delete("/api/auth/logout", function(req: Request, res: Response){
    const token = req.headers.authorization;
    if (!token) return res.status(400).json("token non esistente!");
    const ret = app2.logout(Number(token));
    if (!ret) return res.status(400).json("Logout fallito");
    return res.status(200).json({ message: "Logout effettuato con successo!"});
});

app.post("/api/ads", function(req: Request, res: Response){
    const token = Number(req.headers.authorization);
    if (!token) return res.status(400).json("token non esistente!");
    const ad = app2.createAd(req.body.title, req.body.description, req.body.category, req.body.status, req.body.price, req.body.photo, req.body.address, req.body.sold, req.body.phone,req.body.referenceKeyUtenti, token);
    if (ad) return res.status(200).json("Annuncio creato con successo!");
    return res.status(400).json("Impossibile creare l'annuncio, riprovare!");
});
app.get("/api/ads", function(req: Request, res: Response){
    return res.json(app2.ads);
});

app.put("/api/ads/:primaryKeyAnnuncio", function(req: Request, res: Response){
    const token = Number(req.headers.authorization);
    if (!token) return res.status(200).json("token non esistente");
    const ad = app2.updateAd(Number(req.params.primaryKeyAnnuncio) ,req.body.title, req.body.description, req.body.category, req.body.status, req.body.price, req.body.photo, req.body.address, req.body.sold, req.body.phone,token);
    if (ad) return res.status(200).json("Annuncio modificato con successo!");
    return res.status(400).json("Impossibile creare l'annuncio, riprovare!");
});

app.get("/api/users", function(req: Request, res: Response){
    return res.json(app2.users);
});

routerApi.use("/users", routerUsers);
app.use("/api", routerApi);

app.listen(3000, function(){
    console.log("Server is running on http://localhost:3000")
});