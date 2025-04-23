const { Router } = require('express');

const imagesMiddleware = require('../middleware/images');
const {
  getAllNews,
  getById,
  addNews,
  deleteNews,
} = require('../controllers/news').news;

const router = Router();

router.get('/', getAllNews);
router.get('/:id', getById);
router.post('/', imagesMiddleware.single('file'), addNews);
router.delete('/:id', deleteNews);

module.exports = router;
