var express = require("express");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Mount the API routes
app.use("/api", apiRoutes);

// Mount the HTML routes
app.use("/", htmlRoutes);

// The below code effectively "starts" our server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
