const cardController = require('express').Router();
// Middlewares
const CompanyAuthenticator = require('../middlewares/company_authenticator');
// Helpers
const ApiResponse = require('../helpers/api_response');
// Services
const FindCardService = require('../services/cards/find_card');
const CreateCardService = require('../services/cards/create_card');
const AllCardsService = require('../services/cards/all_cards');
const UpdateCardService = require('../services/cards/update_card');
const UserCardsService = require('../services/cards/user_cards');
const CreateUserCardService = require('../services/cards/create_user_card');
const FindUserCard = require('../services/cards/find_user_card');
const AddStampService = require('../services/cards/add_stamp');
const RemoveStampService = require('../services/cards/remove_stamp');
const RedeemCardService = require('../services/cards/redeem_card');
const DeleteUserCardService = require('../services/cards/delete_user_card');

cardController.route('/companies/me/cards')
  .get(CompanyAuthenticator, (req, res) => {
    AllCardsService.call(req.company)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .post(CompanyAuthenticator, (req, res) => {
    const cardParams = {
      title: req.body.title,
      stamps: req.body.stamps,
      description: req.body.description,
      color: req.body.color,
    };

    return CreateCardService.call(req.company, cardParams)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

cardController.route('/companies/me/cards/:id')
  .get(CompanyAuthenticator, (req, res) => {
    FindCardService.call(req.company, parseInt(req.params.id, 10))
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .put(CompanyAuthenticator, (req, res) => {
    const cardParams = {
      title: req.body.title,
      stamps: req.body.stamps,
      description: req.body.description,
      color: req.body.color,
    };

    return UpdateCardService.call(req.company, parseInt(req.params.id, 10), cardParams)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

cardController.route('/users/:identifier/cards')
  .get(CompanyAuthenticator, (req, res) => {
    UserCardsService.call(req.company, req.params.identifier)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .post(CompanyAuthenticator, (req, res) => {
    const identifier = req.params.identifier;
    const cardId = parseInt(req.body.cardId, 10);
    CreateUserCardService.call(req.company, identifier, cardId)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  });

cardController.route('/users/:identifier/cards/:id')
  .get(CompanyAuthenticator, (req, res) => {
    const identifier = req.params.identifier;
    const id = parseInt(req.params.id, 10);

    FindUserCard.call(req.company, identifier, id)
      .then(response => ApiResponse.success(res, response))
      .catch(err => ApiResponse.error(res, err));
  })

  .delete(CompanyAuthenticator, (req, res) => {
    const identifier = req.params.identifier;
    const id = parseInt(req.params.id, 10);

    DeleteUserCardService.call(req.company, identifier, id)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

  //This will be deleted in the future.
cardController.route('/users/:identifier/cards/add-stamp')
  .patch(CompanyAuthenticator, (req, res) => {
    AddStampService.call(req.company, req.params.identifier, null)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

  //This is for new version. Assign stamp to a specific card.
cardController.route("/users/:identifier/cards/:companycardid/add-stamp")
  .patch(CompanyAuthenticator, (req, res) => {
    AddStampService.call(req.company, req.params.identifier, req.params.companycardid)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

cardController.route('/users/:identifier/cards/remove-stamp')
  .patch(CompanyAuthenticator, (req, res) => {
    RemoveStampService.call(req.company, req.params.identifier)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

cardController.route('/users/:identifier/cards/redeem')
  .patch(CompanyAuthenticator, (req, res) => {
    RedeemCardService.call(req.company, req.params.identifier)
      .then(() => ApiResponse.ok(res))
      .catch(err => ApiResponse.error(res, err));
  });

module.exports = cardController;