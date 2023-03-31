"use strict";

const { DATE } = require("sequelize");
const { NOW } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sales",
      [
        {
          id: 1,
          user_id: 3,
          seller_id: 1,
          total_price: 11.11,
          delivery_address: "Rua da Esquina",
          delivery_number: "93",
          sale_date: "2023-03-31",
          status: "pendente",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sales", null, {});
  },
};
