// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));

// body parser config
app.use(bodyParser.urlencoded({
    extended: true
}));

// DATA //

// pre-seeded food data
var foods = [{
    id: 0,
    name: "Sushiritto",
    yumminess: "quite"
}, {
    id: 1,
    name: "Green Eggs & Ham",
    yumminess: "sure"
}, {
    id: 2,
    name: "Crayfish",
    yumminess: "depending"
}, {
    id: 3,
    name: "Foie Gras",
    yumminess: "omg"
}, {
    id: 4,
    name: "Kale",
    yumminess: "meh"
}];

// ROUTES //

// root path
app.get("/", function(req, res) {
    // render index.html
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// foods index path
app.get("/foods", function(req, res) {
    // render foods index as JSON
    res.send(JSON.stringify(foods));
});

app.post("/foods", function(req, res) {
    // food#create
    // console.log("food#create route is being hit");
    // console.log(req.body);
    var newFood = req.body;
    newFood.id = foods[foods.length - 1].id + 1;
    foods.push(newFood);
    res.send(newFood);
});

app.delete("/foods/:id", function(req, res) {
    // food#delete
    // console.log(foods[req.params.id]);
    // console.log(req.params.id);
    pos = foods.map(function(e) {
      // console.log(e.id);
        return e.id;
    }).indexOf(parseInt(req.params.id));
    // console.log(id_arr);
    // console.log(typeof req.params.id);
    // pos = id_arr.indexOf(parseInt(req.params.id));
    // console.log(pos);
    // foods.splice(pos, 1);
    res.send(foods.splice(pos, 1));
});

// listen on port 3000
app.listen(3000, function() {
    console.log("listening on port 3000");
});
