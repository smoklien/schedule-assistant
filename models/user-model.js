const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age: { type: Number, default: 18 }
},
    { timestamps: true }
);

module.exports = model('User', userSchema);