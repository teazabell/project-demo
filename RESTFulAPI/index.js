var users = require('./users');
var app = require('express')();

var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST , DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});

app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

app.get('/users', function (req, res) {
    res.json(users.findAll());
});

app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

app.post('/newusers', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});
