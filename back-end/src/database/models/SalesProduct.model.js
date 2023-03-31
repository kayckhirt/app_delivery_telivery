module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define( 
    'SalesProduct', 
    { saleId: { type: DataTypes.INTEGER, primaryKey: true },
      productId: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: DataTypes.INTEGER,
   }, 
{ timestamps: false, underscored: true },
);
SalesProduct.associate = ({ Product, Sale }) => {
  Sale.belongsToMany(
    Product, 
    { as: 'Product', through: SalesProduct, foreignKey: 'productId', otherKey: 'saleId' },
);
  Product.belongsToMany(
    Sale, 
    { as: 'Sale', through: SalesProduct, foreignKey: 'saleId', otherKey: 'productId' },
    );
}; return SalesProduct;
};
