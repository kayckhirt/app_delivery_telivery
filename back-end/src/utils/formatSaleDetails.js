const formatProducts = (products, salesProducts) =>
  salesProducts.map((e) => {
    const { name } = products.find(({ id }) => id === e.productId);
    const { quantity } = e;
    const { price } = products.find(({ id }) => id === e.productId);
    const subTotal = (+price * +quantity).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return {
      name,
      quantity,
      price: (+price).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      subTotal,
    };
  });
const formatSaleDetails = (sale, products, seller, salesProducts) => {
  const formatedProducts = formatProducts(products, salesProducts);
  const saleDetails = {
    sellerId: sale.sellerId,
    saleDate: sale.saleDate,
    status: sale.status,
    totalPrice: (+sale.totalPrice).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    products: formatedProducts,
    seller,
  };
  return saleDetails;
};

module.exports = formatSaleDetails;
