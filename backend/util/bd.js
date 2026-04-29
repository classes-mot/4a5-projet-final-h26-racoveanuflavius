import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  let uri = 'mongodb://localhost:27017/UrbexMania';

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connexion au BD réussie');
  } catch (err) {
    console.log('Connexion au BD échouéeco', err);
    process.exit(1);
  }
}; 
