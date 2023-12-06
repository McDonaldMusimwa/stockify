
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
//import shipments from '../Pages/Shipments/shipments';




const exportToExcel = (receipts) => {
  console.log(receipts)
  const wsData = [
    ['Invoice Number', 'Date Received', 'Supplier Name', 'Shipment Description', 'Total Received', 'Total Cost', 'Product ID', 'Product Name', 'Quantity Received', 'Cost', 'Total Product Cost', 'Expiry Date'],
  ];

  // Iterate over each receipt in the data
  receipts.forEach((receipt) => {
    const {
      
      invoicenumber,
      datereceived,
      suppliername,
      shipmentdescription,
      totalreceived,
      totalcost,
      shipments:products,
    } = receipt;

    // Iterate over each product in the receipt
    products.forEach((product) => {
      wsData.push([
        invoicenumber,
        datereceived.toString(),
        suppliername,
        shipmentdescription,
        totalreceived,
        totalcost,
        product.productid,
        product.productname,
        product.quantityreceived,
        product.cost,
        product.totalcost,
        product.expirydate.toString(),
      ]);
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Receipts');

  // Specify the filename (replace 'yourFileName' with your desired filename)
  const fileName = 'receiptData';

  // Create an array buffer
  const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Convert array buffer to Blob
  const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Use FileSaver.js to trigger the file download
  saveAs(blob, `${fileName}.xlsx`);
};
export default exportToExcel;
