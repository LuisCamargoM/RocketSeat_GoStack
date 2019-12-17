/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  /* Creating User */
  async store(req, res) {
    // Define the JSON body parameters
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Error Input Validation!',
      });
    }

    const {
      email,
    } = req.body;
    const userExists = await Student.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        error: 'Student already registered!',
      });
    }

    // Desestruct info from the user created
    const student = await Student.create(req.body);

    // Respond the request
    return res.json({
      student,
    });
  }

  /* Updating User Information */
  async update(req, res) {
    const {
      nome,
      email,
      idade,
      peso,
      altura,
    } = req.body;

    const student = await Student.findOne({
      where: {
        email,
      },
    });
    if (!student) {
      return res.status(400).json({
        error: 'Student not registered!',
      });
    }

    if ((nome === student.nome) && (idade === student.idade) && (peso === student.peso) && (altura === student.altura)) {
      res.status(400).json({
        error: 'Nothing to change',
      });
    }
    const newStudent = await student.update(req.body);
    return res.json({
      newStudent,
    });
  }
}
export default new StudentController();
