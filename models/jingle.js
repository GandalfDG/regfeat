var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JingleSchema = new Schema(
    {
        title: {type: String, required: true},
        episode: [{type: Schema.ObjectId, ref: 'episode'}]
    }
);

JingleSchema.virtual('url').get(function() {
    return '/jingles/' + this._id;
});

module.exports = mongoose.model('Jingle', JingleSchema);