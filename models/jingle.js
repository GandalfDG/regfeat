var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JingleSchema = new Schema(
    {
        title: {type: String, required: true},
        episode: [{type: Schema.ObjectId, ref: 'episode'}]
    }
);

module.exports = mongoose.model('Episode', JingleSchema);