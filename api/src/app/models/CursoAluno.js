import { Model, DataTypes, Sequelize } from 'sequelize';
import databaseConfig from '../../config/database';
const sequelize = new Sequelize(databaseConfig);

class CursoAluno extends Model {}

CursoAluno.init({
  id_pessoa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'curso_pessoa'
})

export default CursoAluno;
