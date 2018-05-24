var Episode = require('../models/episode');
var Member = require('../models/member');
var Feature = require('../models/feature');
var Jingle = require('../models/jingle');

exports.feature_create = function(req, res, next) {
    var episode = req.query.episode;
    var members
    Member.find().exec(function (err, list_members) {
        members = list_members;
        res.render('feature_create', { title: 'Add feature', members: members})

    })
};