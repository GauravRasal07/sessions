var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Successfully logged in!!!');
});


router.get('/list', async(req, res) => {
  console.log(req)
  if(req.session) {
    console.log(`Session found: ${req.session.id}`);
  } else {
    console.log(`No session found`);
  }

  res.send(`You got it right!!!`);

})

module.exports = router;
