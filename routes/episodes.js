var express = require('express');
var router = express.Router();

var episode_controller = require('../controllers/episodeController');

router.get('/', episode_controller.episode_list);