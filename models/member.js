var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, require: true },
        nickname: {type: String},
        feature: [{ type: Schema.ObjectId, ref: 'feature' }],
        episode: [{ type: Schema.ObjectId, ref: 'episode' }],
        jingle: [{ type: Schema.ObjectId, ref: 'jingle' }]
    }
);

MemberSchema.virtual('url').get(function () {
    return '/members/' + this._id;
});

MemberSchema.virtual('full_name').get(function() {
    return this.first_name + this.nickname ? ' "' + this.nickname + '" ' : ' ' +  this.last_name;
});

module.exports = mongoose.model('Member', MemberSchema);