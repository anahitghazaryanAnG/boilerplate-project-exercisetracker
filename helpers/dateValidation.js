const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  return !!dateString.match(regex);
};

export default isValidDate;
