const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.post('/', newsController.createNewsPost);
router.get('/', newsController.getAllNewsPosts);
router.get('/search', newsController.searchNewsPosts);
router.put('/:id', newsController.updateNewsPost);
router.delete('/:id', newsController.deleteNewsPost);

module.exports = router;