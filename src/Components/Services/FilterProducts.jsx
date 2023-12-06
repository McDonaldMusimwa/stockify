const FilterBestSellingProducts =(orders)=>{
const totalQuantityByProduct = {};
const previousTotalQuantityByProduct = {};

// Iterate through each order and update total quantity for each product
orders.forEach(order => {
  order.products.forEach(product => {
    const productName = product.productname;
    const quantity = product.quantity;

    // Update the total quantity for the product
    if (totalQuantityByProduct[productName]) {
      previousTotalQuantityByProduct[productName] = totalQuantityByProduct[productName];
      totalQuantityByProduct[productName] += quantity;
    } else {
      totalQuantityByProduct[productName] = quantity;
    }
  });
});

// Convert the total quantities into an array of objects with percentage increase
const productsPerformance = Object.keys(totalQuantityByProduct).map(productName => {
    const totalQuantity = totalQuantityByProduct[productName];
    const previousTotalQuantity = previousTotalQuantityByProduct[productName] || 0;
    const percentageIncrease = previousTotalQuantity !== 0
      ? ((totalQuantity - previousTotalQuantity) / previousTotalQuantity) * 100
      : 0;


  return {
    productName,
    totalQuantity,
    percentageIncrease: parseFloat(percentageIncrease.toFixed(1)),
  };
});

// Sort the array by percentage increase in descending order
productsPerformance.sort((a, b) => b.percentageIncrease - a.percentageIncrease);
const top3Products = productsPerformance.slice(0, 3);
return top3Products
// Now, productsPerformance array contains products sorted by percentage increase

}

export default FilterBestSellingProducts