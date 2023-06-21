const router = require('express').Router();
const cardsController = require('../controllers/cards');
const usersValidate = require('../middlewares/validate');

router.get('/', cardsController.getCards);
router.post('/', usersValidate.validateCardCreate, cardsController.createCard);
router.delete('/:cardId', usersValidate.validateCardId, cardsController.deleteCard);
router.put('/:cardId/likes', usersValidate.validateCardId, cardsController.likeCard);
router.delete('/:cardId/likes', usersValidate.validateCardId, cardsController.dislikeCard);

module.exports = router;
