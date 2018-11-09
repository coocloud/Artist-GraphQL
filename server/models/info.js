const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'artist'
    },
    likes: { type: Number, default: 0 },
    content: { type: String }
});

InfoSchema.statics.like = function(id) {
    const Info = mongoose.model('info');

    return Info.findById(id)
        .then(info => {
            ++info.likes;
            return info.save();
        })
}

mongoose.model('info', InfoSchema);
