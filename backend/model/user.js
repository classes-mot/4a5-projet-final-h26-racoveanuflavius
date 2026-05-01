import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batiment' }],
});

export const User = mongoose.model('User', userSchema);