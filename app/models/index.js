'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../../config/config.js')[env];
var db        = {};

//if (process.env.NODE_ENV === "production") {
  var sequelize = new Sequelize("postgres://tyrylxupygcsfg:KZ3gIWVqRjCAVmCeW4eN5LDEST@ec2-54-83-52-144.compute-1.amazonaws.com:5432/d1iu9k6m0fhqr7", {
    dialectOptions: {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      ssl: true,
      logging: true
    }
  });
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
