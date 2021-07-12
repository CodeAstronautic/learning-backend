const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  userId:{
      type:String,
      required:true
  },
  title:{
      type:String,
      max:500
  } ,
  img:{
      type:String
  },
  topics:{
      type:String,
  },
  comments:{
      type:Array,
      default:[]
    },
    tags:{
        type:Array,
        default:[]
      },
      date:{
        type: Date,
        default: Date.now,
      }
},
    { timestamps: true })
    module.exports = mongoose.model("Post", PostSchema)