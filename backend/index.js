import express from 'express';
import cors from 'cors';
import errorHandler from './handler/error-Handler.js';
import { connectDB } from './util/bd.js';

const app = express();
app.use(express.json());
app.use(cors())


app.use((req, res, next) => {
  const error = new Error('Route non trouvée');
  error.code = 404;
  next(error);
});

app.use(errorHandler);

await connectDB();

app.listen(3000, ()=>{
    console.log("Serveur sur le port", `http://localhost:3000`);
})