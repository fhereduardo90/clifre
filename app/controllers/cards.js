var cardController      = require('express').Router();
var sequelize           = require('../models');

// Services
var FindCardService     = require('../services/cards/find_card');
var CreateCardService   = require('../services/cards/create_card');
var FindAllCardService  = require('../services/cards/find_all_card');
var UpdateCardService   = require('../services/cards/update_card');

cardController.route('/companies/:company_id/cards')
  .get(function(req, res) {
    FindAllCardService.call(req.params.company_id, function(response){
      if(response.success){
        res.status(response.status).json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  })

  .post(function(req, res) {
    var cardParams = {
      title:          req.body.title,
      seals:          req.body.seals,
      description:    req.body.description,
      color:          req.body.color,
      company_id:     req.params.company_id
    };

    CreateCardService.call(cardParams, function(response){
      if(response.success){
        res.json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  });

cardController.route('/companies/:company_id/cards/:id')
  .get(function(req, res){
    FindCardService.call(req.params.company_id, req.params.id, function(response){
      if(response.success){
        res.json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  })

  .put(function(req, res){
    var cardParams = {
      title:          req.body.title,
      seals:          req.body.seals,
      description:    req.body.description,
      color:          req.body.color,
      company_id:     req.params.company_id,
      id:             req.params.id
    };

    UpdateCardService.call(cardParams, function(response){
      if(response.success){
        res.json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  });

module.exports = cardController;
