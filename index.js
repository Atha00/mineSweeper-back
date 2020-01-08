const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/mine-sweeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//import des modèles
const Beginner = require("./models/beginner");
const Intermediate = require("./models/intermediate");
const Expert = require("./models/expert");

//import des routes
const beginnerRoutes = require("./routes/beginner");
const intermediateRoutes = require("./routes/intermediate");
const expertRoutes = require("./routes/expert");

const port = 3001;

app.use(beginnerRoutes);

app.use(intermediateRoutes);

app.use(expertRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server started`);
});
