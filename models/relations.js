import carModel from './carModel.js';
import brandModel from './brandModel.js';

export const setRelations = () => {
    carModel.belongsTo(brandModel, { foreignKey: 'brand_id', as: 'brandDetails' });
    brandModel.hasMany(carModel, { foreignKey: 'brand_id', as: 'cars' });
};