const loginRedirect = (history, role) => {
  let endPoint;
  switch (role) {
  case 'administrator':
    endPoint = '/admin/manage';
    break;
  case 'seller':
    endPoint = '/seller/orders';
    break;
  default:
    endPoint = '/customer/products';
    break;
  }
  history.push(endPoint);
};

export default loginRedirect;
