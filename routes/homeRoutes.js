const router = require('express').Router();
const User = require('../models/userModel');

const verify = require('./verifyToken');

router.get('/', verify, async (req, res) => {
  const findUser = await User.findById(req.user._id)
    .select('firstName')
    .select('lastName')
    .select('email');

  res.json({
    status: 'success',
    data: {
      user: findUser,
    },
  });
});

module.exports = router;
