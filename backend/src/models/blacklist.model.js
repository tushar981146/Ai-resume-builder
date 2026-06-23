const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: [true, 'Token is required'] },
    expiresAt: { type: Date, required: [true, 'Expiration date is required'] }
}, { timestamps: true });

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;