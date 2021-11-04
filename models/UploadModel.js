const mongoose = require('mongoose');

const schema = mongoose.Schema({
    path: { type: String }
});

module.exports = mongoose.model('Upload', schema)