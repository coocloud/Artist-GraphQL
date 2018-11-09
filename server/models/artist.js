const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    info: [{
        type: Schema.Types.ObjectId,
        ref: 'info'
    }]
});

ArtistSchema.statics.addInfo = function(id, content) {
    const Info = mongoose.model('info');

    return this.findById(id)
        .then(artist => {
            const info = new Info({ content, artist })
            artist.info.push(info)
            return Promise.all([info.save(), artist.save()])
                .then(([info, artist]) => artist);
        });
}

ArtistSchema.statics.findInfo = function(id) {
    return this.findById(id)
        .populate('info')
        .then(artist => artist.info);
}

mongoose.model('artist', ArtistSchema);
