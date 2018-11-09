const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const InfoType = require('./info_type');
const Artist = mongoose.model('artist');

const ArtistType = new GraphQLObjectType({
    name:  'ArtistType',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        info: {
            type: new GraphQLList(InfoType),
            resolve(parentValue) {
                return Artist.findInfo(parentValue.id);
            }
        }
    })
});

module.exports = ArtistType;
