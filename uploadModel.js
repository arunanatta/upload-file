const mongoose = require('mongoose');
const fs = require('fs');
mongoose.connect('mongodb://localhost/users');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

let uploadSchema = new Schema({
    name: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    size: {
      type: Number,
    },
    base64: {
      type: String,
    }
});

module.exports = mongoose.model('upload',uploadSchema);

module.exports.base64_encode = function(file) {
  return new Promise((resolve, reject) => {
    if(file == undefined){
      reject('no file found');
    } else {
      let encodedData = fs.readFileSync(file, 'base64');
      fs.unlink(file);
      resolve(encodedData.toString('base64'));
    }
  })
} 
