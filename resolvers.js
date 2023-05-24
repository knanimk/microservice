// resolvers.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const productProtoPath = 'product.proto';
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

// Define the resolvers for GraphQL queries
const resolvers = {
  Query: {
    product: (_, { id }) => {
      // Make a gRPC call to the product microservice
      const client = new productProto.ProductService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.getProduct({ product_id: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.product);
          }
        });
      });
    },
    products: () => {
      // Make a gRPC call to the product microservice
      const client = new productProto.ProductService('localhost:50052', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.searchProducts({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.products);
          }
        });
      });
    },
    user: (_, { id }) => {
      // Make a gRPC call to the user microservice
      const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.getUser({ user_id: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.user);
          }
        });
      });
    },
    users: () => {
      // Make a gRPC call to the user microservice
      const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        client.searchUsers({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.users);
          }
        });
      });
    },
  },
};

module.exports = resolvers;
