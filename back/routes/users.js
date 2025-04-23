const { Router } = require('express');

const imagesMiddleware = require('../middleware/images');
const {
  getById,
  editUser,
} = require('../controllers/users').users;

const router = Router();

router.get('/:id', getById);
router.put('/', imagesMiddleware.single('file'), editUser);

module.exports = router;
