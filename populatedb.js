console.log('fetching data from regular features RSS feed')

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var rss_parser = require('rss-parser')
var Episode = require('./models/episode')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var episodes = []

function episodeCreate(episode_rss) {
    var episode = new Episode({ rss: episode_rss });
    episode.save(function (err) {  
    });
    console.log('New Episode: ' + episode.fullTitle);
    episodes.push(episode);
}

//rss parser setup
let rss = new rss_parser();
(async function() {
  let feed = await rss.parseURL('http://feeds.soundcloud.com/users/soundcloud:users:39773595/sounds.rss');
  console.log(feed.title);

  feed.items.forEach(function(item) {
    episodeCreate(item);
  });
  mongoose.connection.close();
})();
