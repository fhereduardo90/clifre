var companyController       = require('express').Router();
var sequelize               = require('../models');
var _                       = require('lodash');

// Services
var FindCompanyService      = require('../services/companies/find_company');
var CreateCompanyService    = require('../services/companies/create_company');
var UpdateCompanyService    = require('../services/companies/update_company');

companyController.route('/companies')
  .get(function(req, res){
    sequelize.Company.findAll(
      {attributes: ['id', 'name', 'email', 'about', 'address', 'phone', 'avatar_path']}
    ).then(function(companies){
      res.json(companies);
    }).catch(function(err){
      res.status(422).json({error: err.message});
    });
  })

  .post(function(req, res){
    var companyParams = _.pick(
      req.body, ['name', 'email', 'about', 'address', 'phone']
    );

    CreateCompanyService.call(companyParams, function(response){
      if(response.success){
        res.status(response.status).json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  });

companyController.route('/companies/:id')
  .get(function(req, res){
    FindCompanyService.call(req.params.id, function(response){
      if(response.success){
        res.status(response.status).json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  })

  .put(function(req, res){
    var companyParams = _.pick(
      req.body, ['name', 'email', 'about', 'address', 'phone']
    );

    companyParams.id = req.params.id;

    UpdateCompanyService.call(companyParams, function(response){
      if(response.success){
        res.status(response.status).json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  })

module.exports = companyController;
