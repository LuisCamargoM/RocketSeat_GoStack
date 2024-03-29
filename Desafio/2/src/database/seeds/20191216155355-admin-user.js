const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) => QueryInterface.bulkInsert(
    'users', [{
      nome: 'Administrador',
      email: 'admin@gympoint.com',
      password: bcrypt.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {},
  ),

  down: () => {},
};
