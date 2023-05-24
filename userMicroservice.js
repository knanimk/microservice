const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the user proto file
const userProtoPath = 'user.proto';
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

const userService = {
  getUser: (call, callback) => {
    const user = {
      id: call.request.user_id,
      username: 'example_user',
      email: 'user@example.com',
      role: 'user',
    };
    callback(null, { user });
  },
  searchUsers: (call, callback) => {
    const { query } = call.request;
    const users = [
      {
        id: '1',
        username: 'example_user1',
        email: 'user1@example.com',
        role: 'user',
      },
      {
        id: '2',
        username: 'example_user2',
        email: 'user2@example.com',
        role: 'admin',
      },
    ];
    callback(null, { users });
  },
};

// Create and start the gRPC server
const server = new grpc.Server();
server.addService(userProto.UserService.service, userService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  server.start();
});

console.log(`User microservice is running on port ${port}`);
