import jwt from 'jsonwebtoken';

import User from '../../schemas/User';
import jwtConfig from '../../../config/jwt';

class SignUpController {
  async store(req, res) {
    // TODO: Validate

    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }

      const user = await User.create({ name, email, password });

      const token = jwt.sign({ _id: user._id }, jwtConfig.key, {
        expiresIn: jwtConfig.duration,
      });

      return res.json({ _id: user._id, name, email, token });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default new SignUpController();
