import express from 'express';
import router from "./routes";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const port: number = 3002;
const app: any = express();

var corsOptions = {
  origin: 'http://localhost:61117',
  credentials: true };

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(cookieParser());
app.use("/api", router);


app.listen(port, () => {
  console.log(`listen http://localhost:${port}`)
});


mongoose.connect('mongodb://localhost:27017/J5');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB.');
});