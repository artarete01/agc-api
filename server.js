const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
  //type: 'application/json'
};
app.use(bodyParser.raw(options));

// Endpoint
const Endpointlotto = require("./routers/api.routers");
app.use("/api", Endpointlotto);

// Help Check
app.get("/helpcheck", function(req, res) {
  res.send({
    "dbname" : process.env.DB_NAME,
    "version" : process.env.VERSION_APP
  })
});

// Connected Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Connected Port : " + PORT)
});

module.exports = app;
