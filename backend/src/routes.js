const express = require('express');
const router = express.Router();

const SolutionController = require('./controllers/SolutionController');
const upload = require('./multer');

router.post('/solutions', upload.array('files'), SolutionController.create);
router.get('/solutions', SolutionController.index);

module.exports = router;