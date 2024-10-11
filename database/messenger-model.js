const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    text: { type: String, trim: true, required: true },
    userID: { type: String, trim: true, required: true }
},
    { timestamps: true }
);

module.exports = model('Message', messageSchema);