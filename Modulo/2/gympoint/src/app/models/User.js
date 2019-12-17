/* USER MODEL FILE */
import Sequelize, {
  Model,
} from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      userpassword: Sequelize.VIRTUAL,
      password: Sequelize.STRING,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.userpassword) {
        // eslint-disable-next-line no-param-reassign
        user.password = await bcrypt.hash(user.userpassword, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
