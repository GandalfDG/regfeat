var Episode = require('../models/episode');
var Member = require('../models/member');
var Feature = require('../models/feature');
var Jingle = require('../models/jingle');

exports.feature_create = function(req, res, next) {
    res.render('feature_create');
};