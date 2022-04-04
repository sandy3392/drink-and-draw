const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');




const Thought = model('Store', thoughtSchema);

module.exports = Store;