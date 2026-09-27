const swaggerJsDoc = require("swagger-jsdoc");

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
        url: "http://localhost:5000",
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

  apis: ["./src/docs/*.js"],
};
module.exports = swaggerJsDoc(options);
