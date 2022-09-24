import { Model, DataTypes, Sequelize } from 'sequelize';
import databaseConfig from '../../config/database';
const sequelize = new Sequelize(databaseConfig);

class Curso extends Model {}

Curso.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'curso'
})

export default Curso;
