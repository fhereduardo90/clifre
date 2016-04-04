require('dotenv').load();

var express         = require('express');
var app             = module.exports = express();
var bodyParser      = require('body-parser');
var port            = process.env.PORT;
var router          = express.Router();
var jwt             = require('jsonwebtoken');

// Controllers
var UserController      = require('./app/controllers/users');
var CompanyController   = require('./app/controllers/companies');
var CardController      = require('./app/controllers/cards');
var SessionController   = require('./app/controllers/sessions');

// Middlewares
var authenticator       = require('./app/middlewares/authenticator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.set('jwtKey', process.env.AUTH0_CLIENT_SECRET); // secret variable

router.get('/', function(req, res){
  res.json({ message: 'CLIFRE API :)' });
});

app.use(router);
app.use(UserController);
app.use(CompanyController);
app.use(CardController);
app.use(SessionController);

app.listen(port);
