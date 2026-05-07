import express from 'express';
import batimentsRoutes from "./routes/batiments-routes.js";
import authRoutes from "./routes/auth-routes.js";
import usersRoutes from "./routes/users-routes.js";
import cors from 'cors';
import errorHandler from './handler/error-Handler.js';
import { connectDB } from './util/bd.js';

const app = express();
app.use(express.json());
app.use(cors())


app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/buildings", batimentsRoutes);

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