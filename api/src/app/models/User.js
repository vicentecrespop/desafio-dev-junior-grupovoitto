import { Model, DataTypes, Sequelize } from 'sequelize';
import databaseConfig from '../../config/database';
const sequelize = new Sequelize(databaseConfig);

class Users extends Model {}

Users.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'users'
})

export default Users;
