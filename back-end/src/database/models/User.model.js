module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
'User',
     {
     id: { type: DataTypes.INTEGER, primaryKey: true },
     name: DataTypes.STRING,
     email: DataTypes.STRING,
     password: DataTypes.STRING,
     role: DataTypes.STRING,
   }, 
   {
     timestamps: false,
     underscored: true,
   },
);
 
  //  User.associate = ({ BlogPost }) => {
  //    User.hasMany(BlogPost, { as: 'BlogPost' });
  //  };
 
   return User;
 };
