import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConfig from '../config/dbConfig.js';

export class brandModel extends Model {}

brandModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: { // Use snake_case
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updated_at: { // Use snake_case
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize: dbConfig,
  modelName: 'brand',
  underscored: true, // Ensure this is set to true
  freezeTableName: true,
  timestamps: true
});

export default brandModel;