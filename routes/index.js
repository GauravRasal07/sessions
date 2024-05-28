var express = require('express');
var router = express.Router();

var usersRouter = require("./users");
var loginRouter = require("./auth");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/login');
});


router.get('/error', (req, res) => {
  res.render('error');
})


router.use("/", loginRouter);
router.use("/users", usersRouter);

module.exports = router;
