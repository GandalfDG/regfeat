var Member = require('../models/member');

exports.member_list = function (req, res, next) {
    Member.find().sort([['name', 'ascending']]).exec(function (err, list_members) {
        if (err) { return next(err); }
        res.render('member_list', { title: 'All Members', member_list: list_members });
    });
}