/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  /* Creating User */
  async store(req, res) {
    // Define the JSON body parameters
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      userpassword: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Error Input Validation!',
      });
    }

    const {
      email,
    } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        error: 'Email already registered!',
      });
    }

    // Desestruct info from the user created
    const user = await User.create(req.body);

    // Respond the request
    return res.json({
      user,
    });
  }
}
export default new UserController();
