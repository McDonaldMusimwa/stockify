import { useState, useEffect } from 'react';
import styles from './OrderReport.module.scss';
import Card from '../../../UI/Card';
import { useNavigate } from 'react-router-dom';
import exportToExcel from '../../../Services/ExportToExcel';
//import stock from '../../../Data/Data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
//import AddOrderModal from '../../../UI/AddOrderModal';
import ViewOrderModal from '../../../UI/ViewOrderModal';
import OrderItem from './Orderitem';

const OrderReport = () => {
  const [filteredmonth, setfilteredmonth] = useState('');
  const navigate = useNavigate();

  const [itemModal, setitemModal] = useState(false);
  //const [selectedItem, setSelectedItem] = useState(null); // To track the selected item
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const openModalHandler = {

    viewProducthistoryModal: () => setitemModal(true),
  };

  const closeModalHandler = {

    closeProductHistory: () => setitemModal(false),
  };
  useEffect((

  ) => {
    fetch('https://inventorymanagement-7i2p.onrender.com/order/')
      .then((response) => response.json())
      .then((data) => {


        setOrders(data)

      })
  }, [])

  const fetchSelectedItem = async (item) => {
    console.log("we selected" + item)
    try {

      const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/order/getorder/${item}`)

      if (!response.ok) {
        throw new Error('Failed to fetch data from the database');
      }
      const data = await response.json();
      const products = data.map((item) => item.products).flat();

      setProducts(products);


    } catch (error) {
      console.error('Error:', error);
    }

  }

  const selectItemHandler = (orderId) => {

    console.log('Selected Order ID:', orderId);
    openModalHandler.viewProducthistoryModal();
  };

  const handleButtonClick = () => {
    // Navigate to the "/another-component" route
    navigate('/add-order');
  };

  const months = [
    { month: "January", value: 1 },
    { month: "February", value: 2 },
    { month: "March", value: 3 },
    { month: "April", value: 4 },
    { month: "May", value: 5 },
    { month: "June", value: 6 },
    { month: "July", value: 7 },
    { month: "August", value: 8 },
    { month: "September", value: 9 },
    { month: "October", value: 10 },
    { month: "November", value: 11 },
    { month: "December", value: 12 },
  ];

  const changeMonthHandler = (event) => {
    const selectedMonth = parseInt(event.target.value);
    setfilteredmonth(selectedMonth === '' ? null : selectedMonth);
  };
  const filteredOrders = orders.filter((shipment) => {


    if (!filteredmonth) {
      return true; // No month selected, include all shipments
    }

    const dateOrdered = new Date(shipment.dateordered);

    if (isNaN(dateOrdered.getTime())) {
      return false; // Invalid date, exclude the shipment
    }

    const shipmentMonth = dateOrdered.getMonth() + 1;

    return shipmentMonth === parseInt(filteredmonth, 10);
  });

  const onExportButton = () => {
    exportToExcel(filteredOrders)
  }
  return (
    <>
      <div className={styles.Hometop}> <button className={styles.addbutton} onClick={handleButtonClick}>+ Add Order </button>

        <div className={styles.filter}>
          <label>Filter by month</label>

          <select className={styles.Select} style={{ width: "150px" }} onChange={changeMonthHandler} value={filteredmonth || ''}>
            <option value="" disabled hidden>
              Choose month
            </option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.month}
              </option>
            ))}
          </select>

        </div>

        <button className={styles.addbutton} onClick={onExportButton}><FontAwesomeIcon icon={faFileExport} /> Export to Excel</button> </div>
      <Card >


        <div className={styles.Home}>

          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>CustomerName</th>
                <th>Date ordered</th>
                <th>Number of Products Ordered</th>

              </tr>
            </thead>




            <tbody>
              {filteredOrders.map((item) => (

                <OrderItem
                  key={item._id}
                  item={item}
                  onClick={() => {
                    selectItemHandler(item._id);
                    fetchSelectedItem(item._id);
                  }}

                />
              ))}
            </tbody>
            {itemModal && <ViewOrderModal products={products} onClose={closeModalHandler.closeProductHistory} />}
          </table>
        </div>

      </Card>
    </>
  );
};

export default OrderReport;


