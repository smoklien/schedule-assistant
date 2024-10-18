const { Schema, model } = require('mongoose');

const messengerSchema = new Schema({
    userId: { type: String, trim: true, required: true },
    userMessage: { type: String, trim: true },
    llmReply: { type: String, trim: true }
},
    { timestamps: true }
);

module.exports = model('Messenger', messengerSchema);