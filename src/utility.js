export const getTotal = (cart) => {
  let totalAmount = 0;
  let totalPrice = 0;

  cart.forEach(({ amount, price }) => {
    totalAmount += amount;
    totalPrice += amount * price;
  });

  return { totalAmount, totalPrice };
};
