
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('../config/keys')
module.exports = (app) => {


 //Cookie Session 
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieSessionKey],
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

// Google Login
app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google Login callback
app.get('/auth/google/callback',
  passport.authenticate('google'),
  function (req, res) {
    res.redirect('/api/home')
  });

// Google Logout
app.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
})
}