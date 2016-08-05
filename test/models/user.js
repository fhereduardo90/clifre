var assert = require('assert');
var sequelize = require('../../app/models');
var faker = require('faker');
var expect = require('chai').expect;
var errorParse = require('../../app/helpers/error_parse');

var User = sequelize.User;
var testUser;
var savedUser;
var newUser;
var params;
var transaction;

describe('User Model', function test() {

  before(function test(done) {
    params = {
      name: faker.name.findName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      birthdate: faker.date.past(),
      identifier: faker.random.uuid(),
      facebookId: faker.random.uuid()
    };

    savedUser = User.build(params);

    savedUser.save()
      .then(function success(user) {
        done();
      }).catch(function err(error) {
        done(error);
      });
  });

  beforeEach(function test() {
    testUser = User.build(params);
    newUser = User.build(params);
  });

  describe('Validations', function test() {

    it('name should not be blank', function test(done) {
      testUser.name = '';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('name cannot be blank');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('name should not be null', function test(done) {
      testUser.name = null;
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('name cannot be null');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('identifier should not be blank', function test(done) {
      testUser.identifier = '';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('identifier cannot be blank');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('identifier should not be null', function test(done) {
      testUser.identifier = null;
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('identifier cannot be null');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('identifier should be unique', function test(done) {
      newUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('identifier has been already taken');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('birthdate should be a date', function test(done) {
      testUser.birthdate = '20/20/20';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('birthdate must be a date');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('password should not be blank', function test(done) {
      testUser.password = '';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('password cannot be blank');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('password should not be null', function test(done) {
      testUser.password = null;
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('password cannot be null');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('password should be grater or equal than 8 characters', function test(done) {
      testUser.password = '1234567';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('password only accepts min 8 and max 25 characters');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('password should be less or equal than 20 characters', function test(done) {
      testUser.password = '12345678912345678912345678';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('password only accepts min 8 and max 25 characters');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('email should not be blank', function test(done) {
      testUser.email = '';
      testUser.facebookId = null;
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('email cannot be blank');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('email should have a correct format', function test(done) {
      testUser.email = 'test.mail.com';
      testUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('email format is not correct');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('email should be unique', function test(done) {
      newUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('email has been already taken');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('email can be blank if there is a facebookId assigned', function test(done) {
      testUser.email = null;
      testUser.facebookId = null;
      testUser.validate()
        .then(function success(result) {
          console.dir(errorParse(result));
          expect(errorParse(result)).to.not.contain('email cannot be blank');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

    it('facebookId should be unique', function test(done) {
      newUser.validate()
        .then(function success(result) {
          expect(errorParse(result)).to.contain('facebookId has been already taken');
          done();
        })
        .catch(function err(error) {
          done(error);
        });
    });

  });

  after(function test(done) {
    savedUser.destroy()
      .then(function success() {
        done();
      });
  });

});
