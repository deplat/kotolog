// const { text } = require('body-parser');
const mongoose =  require('mongoose')

const catSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  // age in month
  age: {
    required: true,
    type: Number
  },
  sex: {
    required: true,
    type: String,
    enum: ['m', 'f']
  },
  color: {
    required: true,
    type: String
  },
  shortInfo: {
    required: false,
    type: String
  },
  fullInfo: {
    required: false,
    type: String
  },
  features: {
    requied: false,
    type: String
  },
  /*
  images: [
    {
      url: {
        // requied: true,
        type: String
      },
      altText: {
        // requied: true,
        type: String
      }
    }
  ]
  */ 
},
{
  collection: 'cats',
  timestamps: true
});
/*
catSchema.virtual('photos').get( () => {
  return this.images.map(function (image) {
    return image.url;
  });
});

catSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.images = ret.images || [];
    ret.photos = ret.images.map( (image) => {
      return image.url;
    });
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});
*/
module.exports = mongoose.model('Cat', catSchema);