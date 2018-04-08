var Episode = require('../models/episode');

//list all episodes ordered by date in descending order
exports.episode_list = function(req, res) {
    var promise = Episode.find().sort([['date', 'descending']]).exec(function (err, list_episodes) {
        if(err) { return next(err); }
        res.render('episode_list', {title: 'All Episodes', episode_list: list_episodes});
    });
};