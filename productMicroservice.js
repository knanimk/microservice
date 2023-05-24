const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the product proto file
const productProtoPath = 'product.proto';
const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

// Implement the product service
const productService = {
  getProduct: (call, callback) => {
    // Retrieve the product details from the database or any other data source
    const productId = call.request.product_id;

    // Simulating a product retrieval from a data source
    const product = {
      id: productId,
      name: 'Example Product',
      price: 99.99,
    };

    callback(null, { product });
  },

  searchProducts: (call, callback) => {
    // Search for products based on the query in the database or any other data source
    const query = call.request.query;

    // Simulating a product search from a data source
    const products = [
      {
        id: '1',
        name: 'Example Product 1',
        price: 49.99,
      },
      {
        id: '2',
        name: 'Example Product 2',
        price: 79.99,
      },
    ];

    callback(null, { products });
  },

  createProduct: (call, callback) => {
    // Create a new product and store it in the database or any other data source
    const name = call.request.name;
    const price = call.request.price;

    // Simulating product creation and generating a unique ID
    const productId = generateProductId();

    // Simulating saving the product to a data source
    const createdProduct = {
      id: productId,
      name: name,
      price: price,
    };

    callback(null, { product: createdProduct });
  },
};

// Create and start the gRPC server
const server = new grpc.Server();
server.addService(productProto.ProductService.service, productService);
const port = 50055;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  server.start();
});


