const express = require("express");
const app = express();
const mongoDb = require("./data/database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", require("./routes"))



mongoDb.initDb((err, mongoClient) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log("Database connection established and running on port:", port);
    });
  }
});
