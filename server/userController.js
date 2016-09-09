const User = require('./userModel');

//Create an object called userController to put methods on
//se we can export it below(really just doing this to use methods in userModel)
const userController = {};


userController.createUser = (request, response, next) => {
  // if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
  console.log(request.body)

  //create new user using our USER model that we exported
  const user = new User(request.body);

  //then save it to the database
  User.create(user)
  .then(() => next())
  .catch(() => console.log('you errored out when creating a new user'));
};
//

module.exports = userController;