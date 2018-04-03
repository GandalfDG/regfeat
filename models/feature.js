var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeatureSchema = new Schema(
    {
        member: [{type: Schema.ObjectId, ref: 'member', required: true}],
        title: {type: String},
        type: [{type: String}],
        topic: [{type: String}],
        tag: [{type: String}],
        episode: {type: Schema.ObjectId, ref: 'episode'},
        timestamp: {type: String}
    }
);

FeatureSchema.virtual('url').get(function() {
    return '/features/' + this._id;
});
// FeatureSchema.virtual('timestampFormat').set(function() {

// })

module.exports = mongoose.model('Feature', FeatureSchema);