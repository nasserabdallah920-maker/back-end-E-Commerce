const checkDate = (date) => {
  return new Date(date)<=Date.now()
};

module.exports = checkDate;
