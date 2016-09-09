const User = require('./userModel');

//Create an object called userController to put methods on
//se we can export it below(really just doing this to use methods in userModel)
const userController = {};


userController.createUser = (request, response, next) => {
  // if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
  console.log('hit create user route here is body:', request.body)
  console.log('headers ', request.headers)
  //create new user using our USER model that we exported

  //then save it to the database
  // if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
  const user = new User(request.body);
  User.create(user, (err) => {
      console.log('error')
  });

  next()
  
  // }
    // const user = new User(request.body);
//   User.create(user)
//   .then(() => next())
//   .catch(() => console.log('you errored out when creating a new user'));
};
//

module.exports = userController;