require('dotenv').config({ silent: true });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT;
const app = (module.exports = express());
const router = express.Router();

// Controllers
const UserController = require('./app/controllers/users');
const CompanyController = require('./app/controllers/companies');
const CardController = require('./app/controllers/cards');
const SessionController = require('./app/controllers/sessions');
const PasswordController = require('./app/controllers/passwords');
const FeaturedCompanyController = require('./app/controllers/featured_companies');
const CategoryController = require('./app/controllers/categories');

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.set('jwtKey', process.env.AUTH0_CLIENT_SECRET); // secret variable

router.get('/', (req, res) => {
  res.json({ message: 'CLIFRE API :)' });
});

app.use(router);
app.use(UserController);
app.use(CompanyController);
app.use(CardController);
app.use(SessionController);
app.use(PasswordController);
app.use(FeaturedCompanyController);
app.use(CategoryController);

app.listen(port);
