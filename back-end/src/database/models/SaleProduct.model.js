module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define( 
    'SaleProduct', 
    { saleId: { type: DataTypes.INTEGER, primaryKey: true },
      productId: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: DataTypes.INTEGER,
   }, 
{ timestamps: false, underscored: true },
);
SaleProduct.associate = ({ Product, Sale }) => {
  Sale.belongsToMany(
    Product, 
    { as: 'Product', through: SaleProduct, foreignKey: 'productId', otherKey: 'saleId' },
);
  Product.belongsToMany(
    Sale, 
    { as: 'Sale', through: SaleProduct, foreignKey: 'saleId', otherKey: 'productId' },
    );
}; return SaleProduct;
};
