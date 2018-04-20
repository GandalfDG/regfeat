var express = require('express');
var router = express.Router();

var member_controller = require('../controllers/memberController');

router.get('/', member_controller.member_list);

module.exports = router;