import jwt from 'jsonwebtoken';

import User from '../../schemas/User';
import jwtConfig from '../../../config/jwt';

class SignInController {
  async store(req, res) {
    // TODO: Validate

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id }, jwtConfig.key, {
      expiresIn: jwtConfig.duration,
    });

    return res.json({ _id: user._id, name: user.name, email, token });
  }
}

export default new SignInController();
