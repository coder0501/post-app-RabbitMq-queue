

// models/BlogPost.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);







//Practice

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//   title:{type: String, required: true},
//   author: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//   createdAt: {type:Date, default:Date.now}
// });

// const blogPostSchema = new Schema({
//   title:{type: String, required: true},
//   describe: {type:String, required:true},
//   author: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//   comments: [commentSchema],

// });









