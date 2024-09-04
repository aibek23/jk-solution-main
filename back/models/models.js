const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  ean: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  characteristics: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  isPopular:  { type: DataTypes.BOOLEAN, defaultValue: false },
  image: { type: DataTypes.STRING, allowNull: false },
  CompanyId: { type: DataTypes.INTEGER, allowNull: false },
});

const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const Application = sequelize.define('Application', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  processed: { type: DataTypes.BOOLEAN, defaultValue: false },
  approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  ProductId: { type: DataTypes.INTEGER, allowNull: false },
});

Company.hasMany(Product, { as: 'Company', foreignKey: 'CompanyId' });
Product.belongsTo(Company, { as: 'Company', foreignKey: 'CompanyId'});

Product.hasMany(Application, { as: 'Product', foreignKey: 'ProductId' });
Application.belongsTo(Product, { as: 'Product', foreignKey: 'ProductId'});

module.exports = {
  User, Application, Company, Product
};





