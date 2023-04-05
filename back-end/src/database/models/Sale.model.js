module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define( 
    'Sale', 
    { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
     userId: DataTypes.INTEGER,
     sellerId: DataTypes.INTEGER,
     totalPrice: DataTypes.DECIMAL(9,2),
     deliveryAddress: DataTypes.STRING,
     deliveryNumber: DataTypes.STRING,
     saleDate: DataTypes.DATEONLY,
     status: DataTypes.STRING,
   }, 
   { timestamps: false, underscored: true },
);
  Sale.associate = ({ User }) => {
    User.hasMany(Sale, { as: 'buyer', foreignKey: 'user_id' });
    User.hasMany(Sale, { as: 'seller', foreignKey: 'seller_id' });
   };
   return Sale;
 };
