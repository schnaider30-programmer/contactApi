const router = require("express").Router()
const swaggerRoute = require("./swagger");
const contactRoute = require("./contacts");

router.use("/contacts", contactRoute);

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/", swaggerRoute);

module.exports = router
