var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(`SessionID: ${req.session.id}`);
  res.send('Successfully logged in!!!');
});


router.get('/list', async(req, res) => {
  try {
    if(req.session && req.session.userId) {
      console.log(`Session found with user id as ${req.session.userId}`);
      let err, user = await userController.findUserById(req.session.userId);

      if (err ) throw err;

      res.render('index', {user: user});
      return;
    }

    console.log(`no session found!!!`);
    res.redirect('/login');
    return;
  } catch(err) {
    console.log(`Error caught in listing users`);
    console.log(err);
    return res.redirect('/error');
  }
})

router.get('/test', (req, res) => {
  res.render('index');
})

module.exports = router;
