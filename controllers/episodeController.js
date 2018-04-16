var Episode = require('../models/episode');
var Member = require('../models/member');
var Feature = require('../models/feature');
var Jingle = require('../models/jingle');

//render all episodes ordered by date in descending order
exports.episode_list = function (req, res) {
    Episode.find().sort([['date', 'descending']]).exec(function (err, list_episodes) {
        if (err) { return next(err); }
        res.render('episode_list', { title: 'All Episodes', episode_list: list_episodes });
    });
};

//find the episode by the id in the URL and render all relevant information
exports.episode_detail = function (req, res) {
    Episode.find({ _id: req.params.id }).populate('member').populate('feature').populate('jingle').exec(function (err, episode) {
        if (err) { return next(err); }
        let singleEpisode = episode[0];
        res.render('episode_detail', { title: singleEpisode.fullTitle + ' - details', episode: singleEpisode, updateURL: '/episodes/edit/' + req.params.id });
    });
}

exports.episode_update = function (req, res) {
    Episode.find({ _id: req.params.id }).populate('member').populate('feature').populate('jingle').exec(function (err, episode) {
        if (err) { return next(err); }
        let singleEpisode = episode[0];
        res.render('episode_update', { title: singleEpisode.fullTitle + ' - edit', episode: singleEpisode });
    });
}

exports.episode_validate = function (req, res) {
    res.next();
};