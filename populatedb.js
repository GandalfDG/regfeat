console.log('fetching data from regular features RSS feed')

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var rss_parser = require('rss-parser')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Episode = require('./models/episode')

var episodes = []

function episodeCreate(episode_rss) {
    var episode = new Episode({ rss: episode_rss });
    episode.update(function (err, episode) {
        if (err) {
            console.log('error saving episode: ', err);
            console.log('episode: ' + JSON.stringify(episode));
        }
        console.log('episode saved: ' + episode.fullTitle);
    });
    episodes.push(episode);
}

//rss parser setup
let rss = new rss_parser();
rss.parseURL('http://feeds.soundcloud.com/users/soundcloud:users:39773595/sounds.rss', function (err, feed) {
    console.log(feed.title);
    episodeCreate(feed.items[1]);
    async.forEach(feed.items, function (item, callback) {
        episodeCreate(item);
        callback();
    }, function (err) {
        if (err) {
            console.log('poop');
        }
        else {
            console.log('all done');
        }
    });
    // feed.items.forEach(function (item) {
    //     if (item.title) {
    //         episodeCreate(item);
    //     }
    // });
    // mongoose.connection.close();
});
