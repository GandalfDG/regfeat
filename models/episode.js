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
        type: {type: string},
        tags: [{type: String}],
        link: {type: String}
    }
);

EpisodeSchema.virtual('fullTitle').get(function() {
    return this.number + ": " + this.title;
});

module.exports = mongoose.model('Episode', EpisodeSchema);