const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    switch (req.baseUrl) {
      case '/api/news':
        cb(null, './public/images/news-images/');
        break;
      case '/api/auth':
      case '/api/users':
        cb(null, './public/images/user-avatar/');
        break;
      default:
        cb(null, './public/images/');
        break;
    }
  },
  filename(req, file, cb) {
    const extName = path.parse(file.originalname).ext;
    cb(null, `${Date.now()}${extName}`);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
