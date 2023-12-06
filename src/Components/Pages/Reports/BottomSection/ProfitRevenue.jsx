import { useState, useEffect } from 'react'
import Card from '../../../UI/Card';
import styles from './ProfitRevenue.module.scss'
import InventoryItem from './BesSellingProduct';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileExport} from '@fortawesome/free-solid-svg-icons';
const ProfitRevenue = () => {
  const [stock, setStock] = useState([])
  const [totalquantity, setquantity] = useState(0)
  const [totalcost, settotalcost] = useState(0)
  const [isExportClicked, setIsExportClicked] = useState(false);
  //const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  useEffect(() => {
    fetch("https://inventorymanagement-7i2p.onrender.com/stock/")
      .then((response) => response.json())
      .then((data) => {
        setStock(data);

        let totalq = 0;
        let totalc = 0;
        data.map((item) => {
          totalq += item.totalquantity
          totalc += item.totalcost
        })
        setquantity(totalq)
        settotalcost(totalc)

      });
  }, []);


  const exportToExcel = () => {
    const wsData = [
      ['Product ID', 'Product Name', 'Total Quantity', 'Total Cost'],
    ];
  
    let totalQuantity = 0;
    let totalCost = 0;
  
    // Iterate over each product in the data
    stock.forEach((product) => {
      wsData.push([
        product.productID,
        product.productname,
        product.totalquantity,
        product.totalcost,
      ]);
  
      // Update totals
      totalQuantity += product.totalquantity;
      totalCost += product.totalcost;
    });
  
    // Add totals to the bottom
    wsData.push(['', 'Total', totalQuantity, totalCost]);
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
  
    // Create an array buffer
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Convert array buffer to Blob
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Specify the filename (replace 'yourFileName' with your desired filename)
    const fileName = 'yourFileName';
  
    // Use FileSaver.js to trigger the file download
    saveAs(blob, `${fileName}.xlsx`);
    setIsExportClicked(true);
  };

  const exportClassName = isExportClicked ? styles.ExportClicked : styles.Export;
  return (
    <Card className={styles.Profit}>
      <div className={styles.Top}>
        <div className={styles.filter}>Monthly inventory report download</div>
          <span onClick={exportToExcel} className={exportClassName}><FontAwesomeIcon icon={faFileExport} /> Export to excel</span>
      </div>
      <div className={styles.Table}>
        <table>
          <thead>
            <tr>
              <th>ProductId</th>
              <th>ProductName</th>
              <th>Product Quantity</th>
              <th>Products Cost</th></tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <InventoryItem
                key={item.productID}
                item={item}

              />
            ))}
          </tbody>
          
        </table>
        <tfoot>
            <tr>
              <th id="total" colSpan="5">Total Quantity:</th>
              <td>{totalquantity}</td>
              <th id="total" colSpan="3">Total Cost:</th>
              <td>{totalcost}</td>
            </tr>
          </tfoot>
      </div>
    </Card>
  )
}

export default ProfitRevenue