var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EpisodeSchema = new Schema(
    {
        title: {type: String, required: true},
        number: {type: Number, required: true, unique: true},
        date: {type: Date, required: true},
        description: {type: String},
        member: [{type: Schema.ObjectId, ref: 'Member'}],
        feature: [{type: Schema.ObjectId, ref: 'Feature'}],
        jingle: [{type: Schema.ObjectId, ref: 'Jingle'}],
        type: {type: String},
        tags: [{type: String}],
        link: {type: String}
    }
);

EpisodeSchema.virtual('fullTitle').get(function() {
    return this.number ? this.number + ": " + this.title : this.title;
});

EpisodeSchema.virtual('fullTitle').set(function(title) {
    var parts = title.split(':');
    if(parts[1]) {
        this.title = parts[1].trim();
        this.number = parts[0];
    }
    else {
        this.title = parts[0].trim();
    }
})

EpisodeSchema.virtual('rss').set(function(episode_rss) {
    this.fullTitle = episode_rss.title;
    this.date = episode_rss.isoDate;
    this.description = episode_rss.content;
    this.link = episode_rss.link;
})

module.exports = mongoose.model('Episode', EpisodeSchema);