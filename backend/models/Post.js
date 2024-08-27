const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema for the Post document.
 */
const postSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  message: { type: String, required: true },
  context: { type: String },
  tags: [String],
  location: String,
  images: [String],
  externalLinks: [String],
  numLikes: { type: Number, default: 0 },
  numBookmarks: { type: Number, default: 0 },
  numViews: { type: Number, default: 0 },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
