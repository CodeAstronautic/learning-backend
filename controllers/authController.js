const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { registerValidation, loginValidation } = require('../validation');


exports.registerAuth = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
      });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists',
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      confirmPassword: hashPassword,
    });

    const savedUser = await user.save();
    res.json({
      status: 'success',
      data: {
        user: user._id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.loginAuth = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email or password is wrong',
      });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.json({ status: 'success', message: 'Logged In!' });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


