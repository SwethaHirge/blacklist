const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
number: {
    type: String,
    required: true
},
isBlocked: {
    type: Boolean,
    default: true
}
});

const blacklistModel = mongoose.model('Blacklist', blacklistSchema);

module.exports = blacklistModel;