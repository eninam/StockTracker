var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.get("/" , function(req, res){
    res.sendFile("tracker.html", {
        root: __dirname
    });
})




app.listen(PORT, process.env.IP, function () {
    console.log("server is running");
})