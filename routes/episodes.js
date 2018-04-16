var express = require('express');
var router = express.Router();

var episode_controller = require('../controllers/episodeController');

router.get('/', episode_controller.episode_list);

router.get('/:id', episode_controller.episode_detail);

router.get('/edit/:id', episode_controller.episode_update);

module.exports = router;