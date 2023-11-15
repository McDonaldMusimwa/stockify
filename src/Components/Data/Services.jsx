

const Services = {
  /* This method will add a new row */
  addNewRow: (productrange, func, css,input) => {
    
    


    const newRow = {
      productid: (
        <select name='productid' onChange={(event) => input(event, 'productid') }>
          <option value="" selected disabled hidden>Choose here</option>
          {productrange.map((productId) => {
            return (
              <option key={productId} value={productId}>
                {productId}
              </option>
            );
          })}
        </select>
      ),

      productname: (
        <input type="text" name="productname" placeholder="productname" onChange={(event) => input(event, 'productname')}/>
      ),
      quantityreceived: (
        <input
          type="text"
          name="quantityreceived"
          placeholder="quantity received"
          onChange={(event) => input(event, 'quantityreceived')}
        />
      ),
      cost: <input type="text" name="cost" placeholder="cost per unit" onChange={(event) => input(event, 'cost')}/>,
      totalcost: (
        <input type="text" name="totalcost" placeholder="total invoice cost" onChange={(event) => input(event, 'totalcost')}/>
      ),
      expirydate: (
        <input type="date" name="expirydate" placeholder="expiry date" onChange={(event) => input(event, 'expirydate')}/>
      ),
      action: <button className={css}>delete</button>,
    };

    // Update the state with the new row
    func((prevRows) => [...prevRows, newRow]);
  },

  
  /* This method will delete a row */
  removeLastRow: (func) => {
  func((prevRows) => {
    // Check if there are rows to remove
    if (prevRows.length > 0) {
      // Use pop() to remove the last row
      const updatedRows = [...prevRows];
      updatedRows.pop();
      return updatedRows;
    } else {
      return prevRows;
    }
  });
}
};

export default Services;
