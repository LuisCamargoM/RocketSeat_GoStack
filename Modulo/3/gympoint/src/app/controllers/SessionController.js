/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import auth from '../../config/auth';

class SessionController {
  /* Initiate a Session */
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      userpassword: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Error Input Validation!',
      });
    }

    // Get email e senha of request
    const {
      email,
    } = req.body;

    const {
      userpassword,
    } = req.body;
    // Find a User with this email
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Check if already exist this user
    if (!(user)) {
      res.status(401).json({
        error: 'User not registered!',
      });
    }

    // Check if userpassword matches with database
    if (!(await user.checkPassword(userpassword))) {
      res.status(400).json({
        error: 'Wrong Password!',
      });
    }

    // Return id and token as response
    const {
      id,
    } = user;

    return res.json({
      user: {
        id,
      },
      token: jwt.sign({
        id,
      }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}
export default new SessionController();
