# Microservices Project

This project is a demonstration of a microservices architecture using Node.js, GraphQL, and gRPC.

## Description

The project consists of several microservices that communicate with each other using different protocols: RESTful API, GraphQL, and gRPC. Each microservice focuses on a specific domain, such as products and users.

The main components of the project are:

- **Product Microservice**: Implements CRUD operations for managing products. It exposes a RESTful API and a gRPC API for interacting with products.

- **User Microservice**: Handles user-related operations, such as retrieving user details and searching for users. It provides a gRPC API for user-related functionalities.

- **API Gateway**: Serves as the entry point for client applications. It acts as a reverse proxy, routing requests to the appropriate microservices based on the requested operation and protocol.

## Features

- Create, retrieve, update, and delete products through RESTful API.
- Retrieve product details and search for products using GraphQL.
- Retrieve user details and search for users using gRPC.
- Efficient communication between microservices using gRPC.
- Centralized API gateway for handling requests and routing them to the appropriate microservices.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/microservices-project.git
