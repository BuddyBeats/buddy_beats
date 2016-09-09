const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const boardSchema = new Schema({
  name: { type: String },// ,required: true, unique: true
  board: { type: Array, }, // required: true 
});


module.exports = mongoose.model('Board', boardSchema);


