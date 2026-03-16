const swaggerAutogen = require("swagger-autogen")

const docs = {
  info: {
    title: "Contact API",
    description: "Contact API",
    },
    host: "localhost:3000",
    // host: "https://contactapi-g17e.onrender.com",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json"
const endpointFile = ["./routes/index.js"]

swaggerAutogen(outputFile, endpointFile, docs)