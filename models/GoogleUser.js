const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')
const googleUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }, 
   date: {
    type: Date,
    default: Date.now,
  },
  googleId:{
    type: String,
  }
});
googleUserSchema.plugin(findOrCreate);
module.exports = mongoose.model('GoogleUser', googleUserSchema);
