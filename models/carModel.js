import { Sequelize, DataTypes, Model } from 'sequelize';
import dbConfig from '../config/dbConfig.js';
import { brandModel } from './brandModel.js';

export class carModel extends Model {}

carModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  brand_id: { // Use brand_id to avoid collision
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: brandModel,
      key: 'id'
    }
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  interiør_farve: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  body_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seats: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doors: {
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
  modelName: 'car',
  underscored: true, // Ensure this is set to true
  freezeTableName: true,
  timestamps: true
});

export default carModel;