const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require('express-session');

function initialize(app) {
  const GOOGLE_CLIENT_ID = "126004100710-9clo0vp0e5sng64bkvsuc4kdel3qv8md.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";

  app.use(session({
    secret: "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",
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);

      return done(null, profile);
  
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

module.exports = {
  initialize,
  checkAuthenticated
};
