export const getTotal = (cart) => {
  let totalAmount = 0;
  let totalPrice = 0;

  for (const { amount, price } of cart.values()) {
    //iterate each object
    totalAmount += amount;
    totalPrice += amount * price;
  }

  return { totalAmount, totalPrice };
};
