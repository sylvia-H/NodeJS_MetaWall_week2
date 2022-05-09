const successHandler = require('../helper/successHandlers');
const errorHandler = require('../helper/errorHandlers');
const Post = require('../model/post');

const PostController = {
  async getPosts(res) {
    const posts = await Post.find();
    successHandler(res, posts);
  },
  async createPosts(res, body) {
    try {
      const { author, content, tags, image, likes, comments, privacy } =
        JSON.parse(body);
      if (author !== undefined && content !== undefined) {
        await Post.create({
          author,
          content,
          tags,
          image,
          likes,
          comments,
          privacy,
        });
        this.getPosts(res);
      } else {
        errorHandler(res, 400, 4001);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async deleteAllPosts(res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async deletePosts({ req, res }) {
    try {
      const id = req.url.split('/').pop();
      await Post.findByIdAndDelete(id)
        .then(() => this.getPosts(res))
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async editPosts({ req, res, body }) {
    try {
      const id = req.url.split('/').pop();
      const editContent = JSON.parse(body);
      await Post.findByIdAndUpdate(id, editContent)
        .then(() => this.getPosts(res))
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
};

module.exports = PostController;
