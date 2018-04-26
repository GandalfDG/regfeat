var express = require('express');
var router = express.Router();

var member_controller = require('../controllers/memberController');

router.get('/', member_controller.member_list);

// member create routes
router.get('/create', member_controller.member_create_form);
router.post('/create', member_controller.member_create);

module.exports = router;