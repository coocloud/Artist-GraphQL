const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Artist = mongoose.model('artist');
const Info = mongoose.model('info');
const ArtistType = require('./artist_type');
const InfoType = require('./info_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArtist: {
      type: ArtistType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Artist({ title })).save()
      }
    },
    addInfoToArtist: {
      type: ArtistType,
      args: {
        content: { type: GraphQLString },
        artistId: { type: GraphQLID }
      },
      resolve(parentValue, { content, artistId }) {
        return Artist.addInfo(artistId, content);
      }
    },
    likeInfo: {
      type: InfoType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Info.like(id);
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Artist.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
