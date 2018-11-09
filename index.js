const app = require('./server/server');

let server = app.listen(4000, () => {
  console.log(`Listening to port ${server.address().port}`);
  console.log(`GraphQL address ${server.address().port}/graphql`);
});
