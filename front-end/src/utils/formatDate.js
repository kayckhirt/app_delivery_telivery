const formatDate = (date) => {
  const splitDate = date.split('-');
  const day = splitDate[2].split('T')[0];
  const brDate = [day, splitDate[1], splitDate[0]].join('/');
  return brDate;
};

export default formatDate;
