const mongoose = require('mongoose');
const Todo = new mongoose.Schema({
    data: {
        type: String
    },
    id:{
        type: String
    }
  });
  
module.exports = mongoose.model('Todo', Todo);