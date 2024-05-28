var express = require('express');
var router = express.Router();

const {User} = require('../models');
const {findSessionByUserId, deleteSessionById} = require('../controllers/user');


router.get('/register', (req, res, next) => {
  if(req.session && req.session.userId){
    return res.redirect('/users');
  }
  res.render('register');
});


router.post('/register', async(req, res, next) => {
  try {
    let createdUser = await User.create({username: req.body.email,
      password: req.body.password
    })

    if (!createdUser) {
      throw new Error(`Unable to register user!`);
    }

    console.log(`Registered user: ${createdUser.username}`);
    res.status(200).json(`Successfully registered using ${createdUser.username}, Please login using the creds!`);
  } catch (err) {
    res.status(401).json(err);
  }
}
  )


router.get('/login', (req, res, next) => {
  if(req.session && req.session.userId){
    return res.redirect('/users');
  }
  res.render('login');
});


router.post("/login", async(req, res) => {
  let userData = req.body;

  if(!userData || !userData.email || !userData.password){
    res.status(404).json(`Please enter valid email and password!!!`);
  }

  try {
    let authenticatedUser = await User.findOne({username: userData.email, password: userData.password});

    if (!authenticatedUser) {
      res.redirect('/error', 401, {message: `User not registered!!!`});
      return;
    } 

    let _, previousSession = await findSessionByUserId(authenticatedUser._id);

    if(previousSession) {
      await deleteSessionById(authenticatedUser._id);
    }

    req.session.userId = authenticatedUser._id;
    res.set('Set-Cookie', `sessionId=${req.session.id}`);
    res.status(200).redirect('/users');
  } catch (err) {
    console.log(`Error while authenticating user: ${err}`);
    res.redirect('/error', 500,  {message: `Error while authenticating!!!`, error: err});
  } 
});

router.get('/logout', (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error logging out');
    } else {
        res.send('Logged out');
    }
});
})

module.exports = router;
