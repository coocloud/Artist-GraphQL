const app = require('./server/server');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 4000

let server = app.listen(PORT, () => {
  console.log(`Listening to port ${server.address().port}`);
  console.log(`GraphQL address ${server.address().port}/graphql`);
});
