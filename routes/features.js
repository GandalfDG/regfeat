var express = require('express');
var router = express.Router();

var feature_controller = require('../controllers/featureController');

router.get('/create', feature_controller.feature_create);
router.post('/create', feature_controller.feature_save);

module.exports = router;