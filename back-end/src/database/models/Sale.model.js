module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define( 
    'Sale', 
    { id: { type: DataTypes.INTEGER, primaryKey: true },
     userId: DataTypes.INTEGER,
     sellerId: DataTypes.INTEGER,
     totalPrice: DataTypes.DECIMAL,
     deliveryAddress: DataTypes.STRING,
     deliveryNumber: DataTypes.STRING,
     saleDate: DataTypes.DATE,
     status: DataTypes.STRING,
   }, 
   { timestamps: false, underscored: true },
);
  Sale.associate = ({ User }) => {
    User.hasMany(Sale, { as: 'buyer', foreignKey: 'userId' });
    User.hasMany(Sale, { as: 'seller', foreignKey: 'sellerId' });
   };
   return Sale;
 };
