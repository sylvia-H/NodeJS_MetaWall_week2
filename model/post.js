const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, '未填寫貼文作者名'],
    },
    content: {
      type: String,
      required: [true, '未填寫貼文內容'],
    },
    tags: [
      {
        type: String,
        default: 'general',
      },
    ],
    image: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    privacy: {
      type: String,
      default: 'private',
      enum: ['public', 'club', 'private'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'posts',
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
