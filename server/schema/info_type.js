const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Info = mongoose.model('info');

const InfoType = new GraphQLObjectType({
    name:  'InfoType',
    fields: () => ({
        id: { type: GraphQLID },
        likes: { type: GraphQLInt },
        content: { type: GraphQLString },
        artist: {
            type: require('./artist_type'),
            resolve(parentValue) {
                return Info.findById(parentValue).populate('artist')
                    .then(info => {
                        console.log(info)
                        return info.artist
                    });
            }
        }
    })
});

module.exports = InfoType;
