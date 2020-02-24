import User from '../schemas/User';

class UserController {
  async update(req, res) {
    // TODO: validate

    const { email, oldPassword } = req.body;

    // authenticated user
    const user = await User.findById(req.user._id);

    // user can't change the email to an registered one
    if (email && email !== req.user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // old password should match
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password doesn't match." });
    }

    try {
      await user.updateOne(req.body);

      return res.json({
        _id: req.user._id,
        name: req.user.name,
        email,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
