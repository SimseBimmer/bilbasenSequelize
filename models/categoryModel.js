import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

export class categoryModel extends Model {}

categoryModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbConfig,
  modelName: 'category',
  underscored: true,
  freezeTableName: true,
  createdAt: true,
  updatedAt: true
});

export default categoryModel;