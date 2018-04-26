var Member = require('../models/member');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.member_list = function (req, res, next) {
    Member.find().sort([['name', 'ascending']]).exec(function (err, list_members) {
        if (err) { return next(err); }
        res.render('member_list', { title: 'All Members', member_list: list_members });
    });
}

exports.member_create_form = function (req, res, next) {
    res.render('member_add', { title: 'Add Member' });
}

exports.member_create = [

    // validate fields
    body('first_name').isLength({ min: 1 }).trim().withMessage("First name is required").isAlphanumeric().withMessage('First name contains illegal characters'),
    body('last_name').isLength({ min: 1 }).trim().withMessage("Last name is required").isAlphanumeric().withMessage('Last name contains illegal characters'),
    body('nickname').optional().trim().isAlphanumeric().withMessage('Nickname contains illegal characters'),

    // sanitize fields
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('last_name').trim().escape(),
    sanitizeBody('nickname').trim().escape(),

    // Process the request after sanitization
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('member_add', { title: 'Add Member', member: req.body, errors: errors.array() });
            return;
        }
        else {
            var member = new Member(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    nickname: req.body.nickname
                });
                member.save(function(err) {
                    if(err) {return next(err);}
                    res.redirect(member.url);
                })
        }
    }
];