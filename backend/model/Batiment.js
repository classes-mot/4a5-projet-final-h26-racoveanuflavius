import mongoose from 'mongoose';


const batimentSchema = mongoose.Schema({
  nom: { type: String },
  adresse: { type: String },
  danger: { type: [String] },
  dateAbandon: { type: Date },
  histoire: { type: String },
  imageUrl: { type: String},
});

export const Batiment = mongoose.model('Batiment', batimentSchema);