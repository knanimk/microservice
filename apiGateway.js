const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const productProtoPath = 'product.proto'; 
const resolvers = require('./resolvers');
const typeDefs = require('./schema'); 
// Create a new Express application
const app = express();

const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProtoPath = 'user.proto';
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;
const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

// Create an instance of ApolloServer with the imported schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the ApolloServer middleware to the Express application
server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
});

app.get('/products', (req, res) => { //products
  const client = new productProto.ProductService(
    'localhost:50055', // Update the gRPC server address and port
    grpc.credentials.createInsecure()
  );

  client.searchProducts({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.products);
    }
  });
});

app.get('/products/:id', (req, res) => { // Change /movies/:id to /products/:id
  const client = new productProto.ProductService(
    'localhost:50055', // Update the gRPC server address and port
    grpc.credentials.createInsecure()
  );
  
  const id = req.params.id;
  client.getProduct({ product_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.product);
    }
  });
});

app.get('/users', (req, res) => {
  const client = new userProto.UserService(
    'localhost:50051', // Update the gRPC server address and port
    grpc.credentials.createInsecure()
  );

  client.searchUsers({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.users);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const client = new userProto.UserService(
    'localhost:50051', // Update the gRPC server address and port
    grpc.credentials.createInsecure()
  );
  
  const id = req.params.id;
  client.getUser({ id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.user);
    }
  });
});

// Start the Express application
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
