var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        name: { type: String, required: true },
        feature: [{ type: Schema.ObjectId, ref: 'feature' }],
        episode: [{ type: Schema.ObjectId, ref: 'episode' }],
        jingle: [{ type: Schema.ObjectId, ref: 'jingle' }]
    }
);

MemberSchema.virtual('url').get(function () {
    return '/members/' + this._id;
});

module.exports = mongoose.model('Member', MemberSchema);