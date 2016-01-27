var cardController      = require('express').Router();
var sequelize           = require('../models');

// Services
var FindCardService     = require('../services/cards/find_card');
var CreateCardService   = require('../services/cards/create_card');

cardController.route('/companies/:companyId/cards')
  .get(function(req, res) {
    FindCardService.call(req.params.companyId, function(response){
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
      company_id:     req.params.companyId
    };

    CreateCardService.call(cardParams, function(response){
      if(response.success){
        res.json(response.result);
      }else{
        res.status(response.status).json({error: response.errors, message: response.message});
      }
    });
  });

// userController.route('/users/:id')
//   .get(function(req, res){
//     sequelize.User.findById(req.params.id)
//       .then(function(user){
//         if(user){
//           res.json(user);
//         }else{
//           res.status(404).json({message: 'User not found.'});
//         }
//       })
//       .catch(function(err){
//         res.status(422).json({error: err.message, message: 'User not found.'});
//       });
//   })
//
//   .put(function(req, res){
//     var userParams = {
//       name:         req.body.name,
//       email:        req.body.email,
//       birthdate:    req.body.birthdate,
//       id:           req.params.id
//     };
//
//     UpdateUserService.call(userParams, function(response){
//       if(response.success){
//         res.json(response.result);
//       }else{
//         res.status(response.status).json({error: response.errors, message: response.message});
//       }
//     });
//   });

module.exports = cardController;
