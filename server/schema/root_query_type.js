const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ArtistType = require('./artist_type');
const InfoType = require('./info_type');
const Info = mongoose.model('info');
const Artist = mongoose.model('artist');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    artists: {
      type: new GraphQLList(ArtistType),
      resolve() {
        return Artist.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Artist.findById(id);
      }
    },
    info: {
      type: InfoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Info.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
