var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeatureSchema = new Schema(
    {
        member: [{type: Schema.ObjectId, ref: 'member', required: true}],
        type: [{type: String}],
        topic: [{type: String}],
        tag: [{type: String}],
        episode: {type: Schema.ObjectId, ref: 'episode'}
    }
);

module.exports = mongoose.model('Feature', FeatureSchema);