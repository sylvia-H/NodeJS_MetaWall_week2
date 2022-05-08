const errorHandler = require('../helper/errorHandlers');
const PostController = require('../controllers/posts');

const routes = async (req, res) => {
  const { url, method } = req;

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  if (url === '/posts') {
    switch (method) {
      case 'GET':
        PostController.getPosts(res);
        break;

      case 'POST':
        req.on('end', () => {
          PostController.createPosts(res, body);
        });
        break;

      case 'DELETE':
        PostController.deleteAllPosts(res);
        break;

      case 'OPTIONS':
        res.writeHead(200, headers);
        req.end();
        break;

      default:
        errorHandler(res, 405);
        break;
    }
  } else if (url.startsWith('/posts/')) {
    switch (method) {
      case 'DELETE':
        PostController.deletePosts({ req, res });
        break;

      case 'PATCH':
        req.on('end', () => {
          PostController.editPosts({ req, res, body });
        });
        break;

      default:
        errorHandler(res, 405);
        break;
    }
  } else {
    errorHandler(res, 404);
  }
};

module.exports = routes;
