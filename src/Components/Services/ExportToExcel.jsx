
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const exportToExcel = (orders) => {
    const wsData = [
      ['Order ID', 'Customer Name', 'Date Ordered', 'Product ID', 'Product Name', 'Quantity'],
    ];
  
    // Iterate over each order in the data
    orders.forEach((order) => {
      const { _id, customername, dateordered, products } = order;
  
      // Iterate over each product in the order
      products.forEach((product) => {
        wsData.push([
            _id,
          customername,
          dateordered.toString(),
          product.productId,
          product.productname,
          product.quantity,
        ]);
      });
    });
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
  
    // Specify the filename (replace 'yourFileName' with your desired filename)
    const fileName = 'orderData';
  
    // Create an array buffer
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Convert array buffer to Blob
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Use FileSaver.js to trigger the file download
    saveAs(blob, `${fileName}.xlsx`);
  };

export default exportToExcel;
