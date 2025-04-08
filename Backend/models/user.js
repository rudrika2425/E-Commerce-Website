const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Map, of: Number, default: {} },
    date: { type: Date, default: Date.now }
  });

const Users = mongoose.model('Users', UserSchema);

module.exports=Users;
