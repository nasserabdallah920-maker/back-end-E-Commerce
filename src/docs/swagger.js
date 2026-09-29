const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "REST API Documentation",
    },

    servers: [
      {
        url: "https://back-end-e-commerce.vercel.app",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },

        refreshCookie: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
    },
  },

  apis: [path.join(__dirname, "*.js")],
};

module.exports = swaggerJsDoc(options);