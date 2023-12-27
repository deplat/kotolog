const express = require('express');
const router = express.Router();
const multer = require('multer');
const  upload = multer({ dest: 'uploads/'});
const kotoController = require('../../controllers/kotoController');

// Get All Cats (with filters)
router.get('/', kotoController.getAllCats);
// Get One Cat by ID
router.get('/:catId', kotoController.getOneCat);
// Add New Cat
router.post('/', kotoController.createNewCat);
// Update an Existing Cat by ID
router.patch('/:catId', kotoController.updateOneCat);
// Delete Cat by ID
router.delete('/:catId', kotoController.deleteOneCat);

module.exports = router;