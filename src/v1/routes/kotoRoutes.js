const express = require('express');
const router = express.Router();
const multer = require('multer');
const  upload = multer({ dest: 'uploads/'});
const kotoController = require('../../controllers/kotoController');


router.get('/', kotoController.getAllCats);

router.get('/:catId', kotoController.getOneCat);

router.post('/', upload.single('photos'), kotoController.createNewCat);

router.patch('/:catId', kotoController.updateOneCat);

router.delete('/:catId', kotoController.deleteOneCat);

module.exports = router;