const mongoose =  require('mongoose')

const catShema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  color: {
    required: true,
    type: String
  },
  sex: {
    required: true,
    type: String,
    enum: ['m', 'f']
  },
  age: {
    required: true,
    type: Number
  }
},
{
  collection: 'cats',
  timestamps: true
});


module.exports = mongoose.model('Cat', catShema);