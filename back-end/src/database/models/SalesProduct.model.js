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
    { as: 'Product', through: SalesProduct, foreignKey: 'product_id', otherKey: 'sale_id' },
);
  Product.belongsToMany(
    Sale, 
    { as: 'Sale', through: SalesProduct, foreignKey: 'sale_id', otherKey: 'product_id' },
    );
}; return SalesProduct;
};
