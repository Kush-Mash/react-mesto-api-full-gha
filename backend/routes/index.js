const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserCreate, validateLogin } = require('../middlewares/validate');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateUserCreate, usersController.createUser);
router.post('/signin', validateLogin, usersController.login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

module.exports = router;
