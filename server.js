const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); 

require("./controller/route.js")(app);   

const server = app.listen(8000, function(){     
  console.log("listening on port %s...", server.address().port);
});


