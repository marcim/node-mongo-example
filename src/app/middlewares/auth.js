import passport from 'passport';

import '../services/passport/jwt';

export const auth = (req, res, next) =>
  passport.authenticate('jwt', { session: false });
