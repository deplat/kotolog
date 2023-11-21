const express = require('express');
const router = express.Router();
const kotoController = require('../../controllers/kotoController');

router.get('/', kotoController.getAllCats);

router.get('/:catId', kotoController.getOneCat);

router.post('/', kotoController.createNewCat);

router.patch('/:catId', kotoController.updateOneCat);

router.delete('/:catId', kotoController.deleteOneCat);

module.exports = router;