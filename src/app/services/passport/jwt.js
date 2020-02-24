import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../../schemas/User';
import jwtConfig from '../../../config/jwt';

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.key,
      jsonWebTokenOptions: { expiresIn: jwtConfig.duration },
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ id: jwtPayload.sub });

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
