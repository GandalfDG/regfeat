var Episode = require('../models/episode');
var Member = require('../models/member');
var Feature = require('../models/feature');
var Jingle = require('../models/jingle');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.feature_create = function (req, res, next) {
    let members = {};

    Member.find().exec(function (err, members_list) {
        members = members_list;
        res.render('feature_create', { title: "Add Feature", members: members });
    });

};

exports.feature_save = [
    // body('feature_title').isLength({ min: 1 }).trim().withMessage("Feature title is required").isAlphanumeric().withMessage('Feature title contains illegal characters'),
    // body('feature_summary').optional({ checkFalsy: true }).trim(),

    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('feature_create', { title: 'Add Feature', selectedMember: req.body.member, errors: errors.array() });
            return;
        }
        else {
            var feature = new Feature(
                {
                    member: req.body.member,
                    title: req.body.feature_title,
                    summary: req.body.feature_summary,
                    episode: req.query.episode
                }
            );
            //add the feature to the episode
            if (req.query.episode) {
                Episode.findByIdAndUpdate(req.query.episode, { $push: { feature: feature } }, function (err, episode) {
                    if (err) { return next(err); }
                });
            }
            if (req.body.member) {
                if (req.body.member.constructor === Array) {
                    req.body.member.forEach(element => {
                        Member.findByIdAndUpdate(element.member, { $push: { feature: feature } }, function (err, member) {
                            if (err) { return next(err); }
                        });
                    });
                }
                else {
                    Member.findByIdAndUpdate(req.body.member, { $push: { feature: feature } }, function (err, member) {
                        if (err) { return next(err); }
                    });
                }
            }
            feature.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/episodes/' + req.query.episode);
            });

        };
    }
];