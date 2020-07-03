var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;

app.get("/" , function(req, res){
    res.sendFile("tracker.html");
})




app.listen(PORT, process.env.IP, function () {
    console.log("server is running");
})