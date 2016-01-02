var userController      = require('express').Router();
var User                = require('../models/user');
var CreateUserService   = require('../services/users/create_user');

userController.route('/users')
  .get(function(req, res){
    User.findAll({attributes: ['id', 'name', 'email', 'identifier', 'birthdate']})
      .then(function(users){
        res.json(users);
      })
      .catch(function(err){
        res.status(422).json({error: err.message});
      })
  })

  .post(function(req, res){
    var userParams = {
      name:         req.body.name,
      email:        req.body.email,
      identifier:   req.body.identifier,
      birthdate:    req.body.birthdate
    };

    CreateUserService.call(userParams, function(response){
      if(response.success){
        res.json(response.result);
      }else{
        res.status(422).json({error: response.errors});
      }
    })
  });

userController.get('/users/:id', function(req, res){
    User.findById(req.params.id)
      .then(function(user){
        if(user){
          res.json(user);
        }else{
          res.status(404).json({message: 'User not found.'});
        }
      })
      .catch(function(err){
        res.status(422).json({error: err.message});
      })
  });

module.exports = userController;
