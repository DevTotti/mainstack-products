# **Mainstack Products API**

## **Project Overview**

Mainstack Products API is a Node.js RESTful API built with TypeScript and MongoDB. The API allows users to manage products, providing endpoints for creating, retrieving, updating, and deleting product data. This application is containerized using Docker for easy deployment and development.

## **Project Structure**

The project is organized as follows:
```bash
mainstack-products/
├── src/
│   ├── components/
│   │   └── products/
│   │       ├── controller.ts         # Handles HTTP requests
│   │       ├── service.ts            # Business logic for products
│   │       ├── route.ts              # Product API routes
│   ├── models/
│   │   └── Product.ts                # Mongoose Product model
│   ├── middleware/
│   │   └── auth.ts                   # Authentication middleware
│   ├── utils/
│   │   └── fetchpage.ts              # Utility functions
├── __api__/
│   └── MainStack Products Challenge.postman_collection.json # Postman API collection
├── test/
│   ├── unit/                         # Unit tests
│   │   ├── product.test.ts           # Product service unit tests
│   │   └── user.test.ts              # User service unit tests
│   └──  setup.ts                     # Test setup
├── Dockerfile                        # Docker configuration
├── docker-compose.yml                # Docker Compose for multi-container setup
├── jest.config.js                    # Jest configuration for testing
├── package.json                      # Project dependencies and scripts
└── tsconfig.json                     # TypeScript configuration

```

## **Features**
- **Authentication**: Secure routes using middleware for authentication.
- **Product Management**: Create, update, delete, and retrieve product information.
- **Pagination**: Handle large sets of product data efficiently.

## **Prerequisites**

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14+)
- [Docker](https://www.docker.com/get-started) (for running the application in a container)
- [MongoDB](https://www.mongodb.com/)

## **Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DevTotti/mainstack-products.git
   cd mainstack-products

2. **Install dependencies**:
    ```bash
    npm install
3. **Environment Variables**:
    ```bash
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/mainstack-products
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRES_IN=1h

# **Running the Application**
## **Locally**
- To start the application locally, run:
    ```bash
    npm run dev
The server will start on http://localhost:3000

## **With Docker**
- To run the application using Docker, use the following commands
1. Build the Docker Image:
    ```bash
    docker-compose build
2. Start the docker containers
    ```bash
    docker-compose up

This will start the application and MongoDB as containers. The application will be available at http://localhost:3000

# **Running Tests**
- **Unit Tests**

    Unit tests are located in the test/unit folder. To run the tests, use the following command:
    ```bash
    npm run test
    ```

Postman Documentation
[Postman Documentation](https://www.postman.com/blue-water-623532/workspace/mainstack-product/collection/8510289-1e226a25-efbd-4ec2-bfe9-b55fe7131016?action=share&source=copy-link&creator=8510289&active-environment=8058fdcd-f3d2-45a1-8c2a-cef275c90b34)

Live Api Link
The initial Live API submitted in the google form was shut down by the service provider so I had to move it somewhere else
[LIVE API](https://mainstack-prooduct.koyeb.app/)